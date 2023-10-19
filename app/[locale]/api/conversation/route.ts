import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-jbtwliZQhyAExeWboY03gd7t",
  apikey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(Configuration);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!configuration.apikey) {
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
