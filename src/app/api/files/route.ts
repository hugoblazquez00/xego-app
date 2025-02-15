import connect from "@/app/lib/db";
import File from "@/app/lib/modals/file";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const projectID = searchParams.get("projectID");
  try {
    await connect();

    // Obtener archivos del proyecto específico
    const files = await File.find({ idproject: projectID }).exec();
    console.log("Files from api/files:", files);
    return new NextResponse(JSON.stringify(files), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching files " + error.message, {
      status: 500,
    });
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();
    const newFile = new File({
      idproject: body.idproject, // Referencia al proyecto
      name: body.name,
      content: body.content,
      path: body.path,
      language: body.language,
      type: body.type,
    });
    await newFile.save();
    return new NextResponse(
      JSON.stringify({ message: "File is created", file: newFile }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in creating File " + error.message, {
      status: 500,
    });
  }
};

// Puedes agregar métodos PATCH y DELETE según sea necesario 