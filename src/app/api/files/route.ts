import connect from "@/app/lib/db";
import File from "@/app/lib/modals/file";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const projectID = searchParams.get("projectID");
  const fileName = searchParams.get("fileName"); // Get the file name if provided

  try {
    await connect();

    // If a fileName is provided, fetch that specific file
    if (fileName) {
      const file = await File.findOne({ idproject: projectID, name: fileName }).exec();
      if (!file) {
        return new NextResponse("File not found", { status: 404 });
      }
      return new NextResponse(JSON.stringify(file), { status: 200 });
    }

    // Otherwise, fetch all files for the project
    const files = await File.find({ idproject: projectID }).exec();
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

    // Create a new file or folder based on the type
    const newFile = new File({
      idproject: body.idproject, // Reference to the project
      name: body.name,
      path: body.path,
      type: body.type,
      // Only set content and language if the type is 'file'
      ...(body.type === 'file' && {
        content: body.content,
        language: body.language,
      }),
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

export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    const { fileId, newContent } = body; 
    await connect();

    if (!fileId || !newContent) {
      return new NextResponse(
        JSON.stringify({ message: "File ID or new content not found" }),
        { status: 400 }
      );
    }

    if (!Types.ObjectId.isValid(fileId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid File ID" }), {
        status: 400,
      });
    }
    const updatedFile = await File.findByIdAndUpdate(
      fileId,
      { content: newContent },
      { new: true }
    );

    if (!updatedFile) {
      return new NextResponse(
        JSON.stringify({ message: "File not found in the database" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "File is updated", file: updatedFile }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in updating File " + error.message, {
      status: 500,
    });
  }
};

export const DELETE = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get("fileId");

  try {
    await connect();

    if (!fileId) {
      return new NextResponse("File ID is required", { status: 400 });
    }

    const deletedFile = await File.findByIdAndDelete(fileId);

    if (!deletedFile) {
      return new NextResponse("File not found", { status: 404 });
    }

    return new NextResponse(
      JSON.stringify({ message: "File deleted", file: deletedFile }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in deleting file " + error.message, {
      status: 500,
    });
  }
};