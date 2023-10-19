import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!openai.apiKey) {
      return new NextResponse("OpenAi API Key not configured", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are rrequired", { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });
    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log(`[CONVERSATION_ERROR]`, error);
    return new NextResponse("Internal error", { status: 500 });
  }
}