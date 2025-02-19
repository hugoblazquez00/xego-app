import connect from "@/app/lib/db";
import XegoFile from "@/app/lib/modals/xegoFile";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const xegoId = searchParams.get("xegoID");
  const fileName = searchParams.get("fileName");

  try {
    await connect();

    if (fileName) {
      // Get single file
      const file = await XegoFile.findOne({ 
        idxego: xegoId,
        name: fileName 
      });

      if (!file) {
        return new NextResponse("File not found", { status: 404 });
      }

      return new NextResponse(JSON.stringify(file), { status: 200 });
    }

    // Get all files for xego
    const files = await XegoFile.find({ idxego: xegoId });
    return new NextResponse(JSON.stringify(files), { status: 200 });
  } catch (error) {
    console.error("Error fetching xego files:", error);
    return new NextResponse("Error in fetching xego files " + error.message, {
      status: 500,
    });
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();

    const newFile = new XegoFile({
      idxego: body.idxego,
      name: body.name,
      content: body.content,
      path: body.path,
      language: body.language,
      type: body.type,
    });

    await newFile.save();

    return new NextResponse(
      JSON.stringify({ message: "File created", file: newFile }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in creating file " + error.message, {
      status: 500,
    });
  }
};

export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();

    const updatedFile = await XegoFile.findByIdAndUpdate(
      body._id,
      { content: body.content, modtime: new Date() },
      { new: true }
    );

    if (!updatedFile) {
      return new NextResponse("File not found", { status: 404 });
    }

    return new NextResponse(
      JSON.stringify({ message: "File updated", file: updatedFile }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in updating file " + error.message, {
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

    const deletedFile = await XegoFile.findByIdAndDelete(fileId);

    if (!deletedFile) {
      return new NextResponse("XegoFile not found", { status: 404 });
    }

    return new NextResponse(
      JSON.stringify({ message: "XegoFile deleted", file: deletedFile }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in deleting XegoFile " + error.message, {
      status: 500,
    });
  }
}; 