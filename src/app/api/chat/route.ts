// src/app/api/chat/route.ts
import { streamText, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';

export async function POST(req: Request) {
  const { messages: uiMessages } = await req.json();

  const modelMessages = convertToModelMessages(uiMessages);

  const result =await streamText({
    model: google('gemini-1.5-flash'),
    messages: modelMessages,
  });

  return result.toUIMessageStreamResponse();
}
