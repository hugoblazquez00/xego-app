import connect from "@/app/lib/db";
import Project from "@/app/lib/modals/project";
import Xego from "@/app/lib/modals/xego";
import File from "@/app/lib/modals/file";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userID");
  const projectId = searchParams.get("projectID");

  try {
    await connect();

    if (projectId) {
      // Get single project
      const project = await Project.find({ _id: projectId }).exec();
      if (!project) {
        return new NextResponse("Project not found", { status: 404 });
      }
      return new NextResponse(JSON.stringify(project), { status: 200 });
    }

    // Get all projects for user
    const projects = await Project.find({ iduser: userId }).exec();
    console.log("Projects from api/projects for user ",userId,":", projects);
    return new NextResponse(JSON.stringify(projects), { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return new NextResponse("Error in fetching projects " + error.message, {
      status: 500,
    });
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();

    // Crear el nuevo proyecto
    const newProject = new Project({
      iduser: body.iduser,
      idxego: body.idxego,
      name: body.name,
      description: body.description,
      files: [],
    });

    // Guardar el proyecto para obtener su ID
    const savedProject = await newProject.save();

    // Crear archivos asociados
    const filePromises = body.files.map(async (file) => {
      const newFile = new File({
        idproject: savedProject._id,
        name: file.name,
        content: file.content,
        path: file.path,
        language: file.language,
        type: file.type,
      });

      // Guardar el archivo
      const savedFile = await newFile.save();
      return savedFile._id;
    });

    // Esperar a que todos los archivos se guarden
    const savedFiles = await Promise.all(filePromises);

    // Actualizar el proyecto con los IDs de los archivos
    savedProject.files = savedFiles;
    await savedProject.save();

    return new NextResponse(
      JSON.stringify({ message: "Project created", project: savedProject }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in creating Project " + error.message, {
      status: 500,
    });
  }
};

// Puedes agregar métodos PATCH y DELETE según sea necesario 