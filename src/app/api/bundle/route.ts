import connect from "@/app/lib/db";
import File from "@/app/lib/modals/file";
import { NextResponse } from "next/server";
import { transform } from "@babel/core";
import { build } from "esbuild";

export const POST = async (request: Request) => {

  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectID");

  try {
    await connect();
    console.log("files.json()\n\n\n\n\n\n\n\n")
    const files = await File.find({ idproject: projectId }).exec();
    
    console.log(files.json())
    // Transformar y agrupar archivos
    const transformedFiles = await Promise.all(files.map(async (file) => {
      const result = await transform(file.content, {
        presets: ["@babel/preset-react"],
      });
      return { name: file.name, content: result.code };
    }));

    // Usar esbuild para agrupar
    const bundleResult = await build({
      entryPoints: transformedFiles.map(file => ({ contents: file.content, loader: 'jsx' })),
      bundle: true,
      write: false,
    });

    return new NextResponse(bundleResult.outputFiles[0].text, { status: 200 });
  } catch (error) {
    return new NextResponse("Error bundling files " + error.message, { status: 500 });
  }
}; 