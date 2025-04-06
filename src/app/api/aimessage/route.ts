import connect from "@/app/lib/db";
import AiMessage from "@/app/lib/modals/aiMessage";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();

    const newMessage = new AiMessage({
      idproject: body.idproject,
      sender: 'user', // Por ahora solo guardamos mensajes del usuario
      content: body.content,
      model: 'gpt-4', // Podemos hacer esto configurable más adelante
      tokensUsed: 0, // Esto lo actualizaremos cuando implementemos la respuesta de GPT
    });

    await newMessage.save();
    return new NextResponse(
      JSON.stringify({ message: "Message saved", aiMessage: newMessage }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error creating AI message: " + error.message, {
      status: 500,
    });
  }
};

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId");

  try {
    await connect();

    if (!projectId) {
      return new NextResponse("Project ID is required", { status: 400 });
    }

    const messages = await AiMessage.find({ idproject: projectId })
      .sort({ createdAt: 1 }) // 1 para orden ascendente (más antiguo a más nuevo)
      .exec();

    return new NextResponse(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    return new NextResponse("Error fetching AI messages: " + error.message, {
      status: 500,
    });
  }
}; 