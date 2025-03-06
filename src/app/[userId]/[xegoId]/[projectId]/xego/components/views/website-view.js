import React, { useEffect, useState } from "react";
import * as esbuild from "esbuild-wasm";

export function WebsiteView({ projectId }) {
  const [iframeSrc, setIframeSrc] = useState("");

  useEffect(() => {
    const loadBundle = async () => {
      try {
        await esbuild.initialize({
          wasmURL: "/esbuild.wasm",
        });

        // Obtener los archivos desde la API
        const response = await fetch(`/api/bundle?projectID=${projectId}`, {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const files = await response.json();
        console.log("Files received from API:", files);

        const entryFile = "src/index.jsx"; 

        if (!(entryFile in files)) {
          throw new Error("No entry file found (src/index.jsx).");
        }

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

                // build.onLoad({ filter: /.*/, namespace: "shim" }, (args) => {
                //   if (args.path === "react") return { contents: `import * as React from "https://esm.sh/react@18"; export { React as default };`, loader: "js" };
                //   if (args.path === "react-dom") return { contents: `import * as ReactDOM from "https://esm.sh/react-dom@18"; export { ReactDOM as default };`, loader: "js" };
                //   if (args.path === "react-dom/client") return { contents: `import * as ReactDOMClient from "https://esm.sh/react-dom@18/client"; export { ReactDOMClient as default };`, loader: "js" };
                // });

                build.onLoad({ filter: /.*/, namespace: "shim" }, (args) => {
                  if (args.path === "react") return { contents: `import * as React from "https://esm.sh/react@18"; export * from "https://esm.sh/react@18"; export default React;`, loader: "js" };
                  if (args.path === "react-dom/client") return { contents: `import * as ReactDOMClient from "https://esm.sh/react-dom@18/client"; export * from "https://esm.sh/react-dom@18/client"; export default ReactDOMClient;`, loader: "js" };
                });

                build.onResolve({ filter: /^\.\.?\// }, (args) => {
                  let fullPath = args.resolveDir + "/" + args.path;
                
                  // Normalizar la ruta
                  fullPath = fullPath.replace(/\\/g, "/").replace("//", "/");
                
                  // Si el archivo existe en `files`, devolverlo correctamente
                  if (files[fullPath]) {
                    return { path: fullPath, namespace: "file-loader" };
                  }
                
                  // Prueba con la extensión JSX si no la tiene
                  if (!fullPath.endsWith(".js") && !fullPath.endsWith(".jsx")) {
                    if (files[fullPath + ".jsx"]) {
                      return { path: fullPath + ".jsx", namespace: "file-loader" };
                    }
                    if (files[fullPath + ".js"]) {
                      return { path: fullPath + ".js", namespace: "file-loader" };
                    }
                  }
                
                  return { external: true };
                });

                // Resolver archivos del usuario
                build.onResolve({ filter: /.*/ }, (args) => {
                  if (args.path in files) {
                    return { path: args.path, namespace: "file-loader" };
                  }
                  return { external: true };
                });

                build.onLoad({ filter: /.*/, namespace: "file-loader" }, (args) => {
                  if (files[args.path]) {
                    return { contents: files[args.path], loader: "jsx" };
                  }
                  throw new Error(`File not found: ${args.path}`);
                });
              },
            },
          ],
        });

        console.log("Compilation result:", result);

        const scriptBlob = new Blob([result.outputFiles[0].text], { type: "text/javascript" });
        const scriptURL = URL.createObjectURL(scriptBlob);

        const htmlContent = `
          <html>
            <head>
              <title>React App</title>
            </head>
            <body>
              <div id="root"></div>
              <script type="module" src="${scriptURL}"></script>
            </body>
          </html>
        `;

        const htmlBlob = new Blob([htmlContent], { type: "text/html" });
        const htmlURL = URL.createObjectURL(htmlBlob);
        console.log("HTML content:", htmlURL);
        setIframeSrc(htmlURL);
      } catch (error) {
        console.error("Error loading bundle:", error);
      }
    };

    loadBundle();
  }, [projectId]);

  return (
    <div className="website-view">
      <iframe src={iframeSrc || "about:blank"} style={{ width: "100%", height: "100vh" }} />
    </div>
  );
}