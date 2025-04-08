import connect from "@/app/lib/db";
import Instruction from "@/app/lib/modals/instruction";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const xegoId = searchParams.get("xegoId");

  if (!xegoId) {
    return new NextResponse("xegoId is required", { status: 400 });
  }

  try {
    await connect();

    const instructions = await Instruction.find({ xegoId }).sort({ step: 1 }).exec();

    return new NextResponse(JSON.stringify(instructions), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error fetching instructions: " + error.message, {
      status: 500,
    });
  }
};