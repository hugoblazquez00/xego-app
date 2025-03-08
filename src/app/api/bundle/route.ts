import connect from "@/app/lib/db";
import File from "@/app/lib/modals/file";
import { NextResponse } from "next/server";
import * as esbuild from "esbuild";

export const POST = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const projectID = searchParams.get("projectID");

  if (!projectID) {
    return new NextResponse("Missing projectID parameter", { status: 400 });
  }

  try {
    await connect();
    const files = await File.find({ idproject: projectID }).exec();

    if (files.length === 0) {
      return new NextResponse("No files found for the project", { status: 404 });
    }

    // Mapa de archivos { ruta: contenido }
    const fileMap: { [key: string]: string } = {};
    files.forEach((file) => {
      let normalizedPath = file.path.replace(/^\/+/, ""); // Normalizar rutas
      fileMap[normalizedPath] = file.content;
    });

    const entryFile = "src/index.jsx";

    if (!(entryFile in fileMap)) {
      return new NextResponse("Entry file src/index.jsx not found", { status: 400 });
    }

    // Construcción del bundle con esbuild en el backend con los plugins adecuados
    const result = await esbuild.build({
      entryPoints: [entryFile],
      bundle: true,
      format: "esm",
      write: false,
      
      loader: {
        ".js": "jsx",
        ".jsx": "jsx",
      },
      plugins: [
        {
          name: "virtual-files",
          setup(build) {
            // Resolver React y ReactDOM
            build.onResolve({ filter: /^react$/ }, () => ({ path: "react", namespace: "shim" }));
            build.onResolve({ filter: /^react-dom$/ }, () => ({ path: "react-dom", namespace: "shim" }));
            build.onResolve({ filter: /^react-dom\/client$/ }, () => ({ path: "react-dom/client", namespace: "shim" }));

            build.onLoad({ filter: /.*/, namespace: "shim" }, (args) => {
              if (args.path === "react") return { contents: `import * as React from "https://esm.sh/react@19"; export * from "https://esm.sh/react@19"; export default React;`, loader: "js" };
              if (args.path === "react-dom/client") return { contents: `import * as ReactDOMClient from "https://esm.sh/react-dom@19/client"; export * from "https://esm.sh/react-dom@19/client"; export default ReactDOMClient;`, loader: "js" };
            });

            build.onResolve({ filter: /^\.\.?\// }, (args) => {
              let fullPath = args.resolveDir + "/" + args.path;

              // Normalizar la ruta
              fullPath = fullPath.replace(/\\/g, "/").replace("//", "/");

              // Si el archivo existe en `fileMap`, devolverlo correctamente
              if (fileMap[fullPath]) {
                return { path: fullPath, namespace: "file-loader" };
              }

              // Prueba con la extensión JSX si no la tiene
              if (!fullPath.endsWith(".js") && !fullPath.endsWith(".jsx")) {
                if (fileMap[fullPath + ".jsx"]) {
                  return { path: fullPath + ".jsx", namespace: "file-loader" };
                }
                if (fileMap[fullPath + ".js"]) {
                  return { path: fullPath + ".js", namespace: "file-loader" };
                }
              }

              return { external: true };
            });

            // Resolver archivos del usuario
            build.onResolve({ filter: /.*/ }, (args) => {
              if (args.path in fileMap) {
                return { path: args.path, namespace: "file-loader" };
              }
              return { external: true };
            });

            build.onLoad({ filter: /.*/, namespace: "file-loader" }, (args) => {
              if (fileMap[args.path]) {
                return { contents: fileMap[args.path], loader: "jsx" };
              }
              throw new Error(`File not found: ${args.path}`);
            });
          },
        },
      ],
    });

    // Devolver el código generado como respuesta
    return new NextResponse(result.outputFiles[0].text, { status: 200 });
  } catch (error) {
    return new NextResponse(`Error bundling files: ${error.message}`, { status: 500 });
  }
};