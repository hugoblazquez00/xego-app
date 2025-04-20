import connect from "@/app/lib/db";
import Xego from "@/app/lib/modals/xego";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

const  ObjectId = require('mongoose').Types.ObjectId;


export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const idXego = searchParams.get("xegoID");

  try {
    await connect();
    if (idXego){
      const xego = await Xego.findOne({ _id: idXego });
      if (!xego) {
        return new NextResponse("Xego not found", { status: 404 });
      }
  
      return new NextResponse(JSON.stringify(xego), { status: 200 });
    }
    else{
      return new NextResponse("idXego false", { status: 404 });
    }
   
  } catch (error) {
    console.error("Error fetching Xego:", error);
    return new NextResponse("Error in fetching Xego " + error.message, {
      status: 500,
    });
  }
};
export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();
    const newXego = new Xego(body);
    await newXego.save();
    return new NextResponse(
      JSON.stringify({ message: "Xego is created", xego: newXego }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in creating Xego " + error.message, 
      {
        status: 500,
      }
    );
  }
}

export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    const { xegoId, newTitle } = body;
    await connect();
    if (!xegoId || !newTitle) {
      return new NextResponse(
        JSON.stringify({ message: "ID or new title not found" }),
        { status: 400 }
      );
    }
    if (!Types.ObjectId.isValid(xegoId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid Xego id" }), {
        status: 400,
      });
    }
    const updatedXego = await Xego.findOneAndUpdate(
      { _id: new ObjectId(xegoId) },
      { title: newTitle },
      { new: true }
    );
    if (!updatedXego) {
      return new NextResponse(
        JSON.stringify({ message: "Xego not found in the database" }),
        { status: 400 }
      );
    }
    return new NextResponse(
      JSON.stringify({ message: "Xego is updated", xego: updatedXego }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in updating Xego " + error.message, {
      status: 500,
    });
  }
}
