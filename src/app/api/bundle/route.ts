import connect from "@/app/lib/db";
import File from "@/app/lib/modals/file";
import { NextResponse } from "next/server";

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

    // Normalizar rutas y construir el mapa de archivos
    const fileMap: { [key: string]: string } = {};
    files.forEach((file) => {
      let normalizedPath = file.path.replace(/^\/+/, ""); // Quitar `/` inicial si existe
      fileMap[normalizedPath] = file.content;
    });

    return NextResponse.json(fileMap);
  } catch (error) {
    return new NextResponse(`Error fetching files: ${error.message}`, {
      status: 500,
    });
  }
};