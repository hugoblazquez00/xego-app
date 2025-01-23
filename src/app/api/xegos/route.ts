import connect from "@/app/lib/db";
import Xego from "@/app/lib/modals/xego";
import { NextResponse } from "next/server";

export const GET = async() => {
  try {
    await connect();
    const xegos = await Xego.find();
    return new NextResponse(JSON. stringify(xegos), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching users " + error.message, 
      {
        status: 500,
      }
    );
  }
};

