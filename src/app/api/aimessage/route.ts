import connect from "@/app/lib/db";
import AiMessage from "@/app/lib/modals/aiMessage";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();

    // Guardar mensaje del usuario con contexto
    const userMessage = new AiMessage({
      idproject: body.idproject,
      sender: 'user',
      content: body.content,
      model: 'gpt-4o-mini',
      tokensUsed: 0,
      context: body.context
    });
    await userMessage.save();
    // Obtener los últimos 5 mensajes del usuario
    const lastMessages = body.lastMessages.map(msg => msg.content);

    // Preparar el mensaje para OpenAI con contexto
    let contextFiles = "";
    for (const file of body.context) {
      contextFiles += `File: ${file.path}\nContent:\n${file.content}\n\n`;
    }

    const userQuestion = body.content;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert assistant in software development. Your role is to help the user solve issues, understand code, improve functionality, or fix bugs in their software project. Always analyze the provided context (files and previous messages) before answering. Be clear, direct, and specific. If information is missing, ask for what you need."
        },
        {
          role: "user",
          content: `The user is working on a software project and needs your help. Below is a summary of their recent questions, the current project context (attached files), and the current question.\n\n---\nRecent user messages:\n${lastMessages.map((msg, index) => `(${index + 1}) ${msg}`).join('\n')}\n\n---\nContext files:\n${contextFiles}---\nCurrent question:\n${userQuestion}`
        }
      ],
      max_tokens: 1000
    });

    const aiResponse = completion.choices[0]?.message?.content;

    if (aiResponse) {
      const assistantMessage = new AiMessage({
        idproject: body.idproject,
        sender: 'assistant',
        content: aiResponse,
        model: 'gpt-4o-mini',
        tokensUsed: completion.usage?.total_tokens || 0,
        context: body.context
      });
      await assistantMessage.save();
    }

    return new NextResponse(
      JSON.stringify({ 
        message: "Messages saved successfully",
        userMessage,
        aiResponse: aiResponse || null
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error processing message: " + error.message, {
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
      .sort({ createdAt: 1 })
      .exec();

    return new NextResponse(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    return new NextResponse("Error fetching AI messages: " + error.message, {
      status: 500,
    });
  }
};