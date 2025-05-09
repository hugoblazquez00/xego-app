import connect from "@/app/lib/db";
import User from "@/app/lib/modals/user";
import { NextResponse } from "next/server";
import { compare } from "bcrypt";

export const POST = async (request: Request) => {
  try {
    const { username, password } = await request.json();
    await connect();
    const user = await User.findOne({ username });

    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), { status: 401 });
    }

    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return new NextResponse(JSON.stringify({ error: "Invalid password" }), { status: 401 });
    }

    // Puedes devolver solo el id y username, nunca la contraseña
    return new NextResponse(JSON.stringify({ id: user._id, username: user.username, email: user.email }), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
};