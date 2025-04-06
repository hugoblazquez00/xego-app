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

    const userMessage = new AiMessage({
      idproject: body.idproject,
      sender: 'user',
      content: body.content,
      model: 'gpt-4o-mini',
      tokensUsed: 0,
    });
    await userMessage.save();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: body.content
        }
      ],
    });
    const aiResponse = completion.choices[0]?.message?.content;

    if (aiResponse) {
      const assistantMessage = new AiMessage({
        idproject: body.idproject,
        sender: 'assistant',
        content: aiResponse,
        model: 'gpt-4o-mini',
        tokensUsed: completion.usage?.total_tokens || 0,
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