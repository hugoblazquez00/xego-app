import connect from "@/app/lib/db";
import Project from "@/app/lib/modals/project";
import { NextResponse } from "next/server";
import { createProjectSchema } from './supabaseOperations';
import { createBaseFiles } from './fileOperations';

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

    // Create new project
    const newProject = new Project({
      iduser: body.iduser,
      idxego: body.idxego,
      name: body.name,
      description: body.description,
      files: [],
    });

    // Save project to get the ID
    const savedProject = await newProject.save();

    // Create Supabase schema for the project
    try {
      await createProjectSchema(savedProject._id.toString());
    } catch (error) {
      // If schema creation fails, delete the project and throw error
      await Project.findByIdAndDelete(savedProject._id);
      return new NextResponse(
        JSON.stringify({ 
          success: false, 
          error: `Failed to create Supabase schema: ${error.message}` 
        }), 
        { status: 500 }
      );
    }

    // Create base files
    const savedFiles = await createBaseFiles(savedProject._id);

    // Update project with files IDs
    savedProject.files = savedFiles;
    await savedProject.save();

    return new NextResponse(
      JSON.stringify({ 
        success: true,
        message: "Project created", 
        project: savedProject 
      }), 
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ 
        success: false, 
        error: `Error in creating Project: ${error.message}` 
      }), 
      { status: 500 }
    );
  }
};

export const PATCH = async (request: Request) => {
  try {
    await connect();
    const { projectId, action } = await request.json();

    if (!projectId || !["next", "prev"].includes(action)) {
      return new NextResponse("Missing or invalid parameters", { status: 400 });
    }

    const projects = await Project.find({ _id: projectId }).exec();
    const project = projects[0];
    if (!project) {
      return new NextResponse("Project not found", { status: 404 });
    }

    const newStep = action === "next"
      ? project.currentXegoStep + 1
      : Math.max(0, project.currentXegoStep - 1);

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { currentXegoStep: newStep },
      { new: true }
    );

    return new NextResponse(JSON.stringify(updatedProject), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error updating project: " + error.message, { status: 500 });
  }
};
