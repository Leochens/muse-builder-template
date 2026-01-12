import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = await streamText({
        model: openai('gpt-4-turbo'),
        messages,
        system: "You are a helpful assistant embedded in a Todo app. You help users generate tasks or organize their day."
    });

    return result.toDataStreamResponse();
}
