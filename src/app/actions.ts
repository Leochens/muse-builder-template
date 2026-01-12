'use server';

import { TodoService } from '@/services/todo.service';
import { revalidatePath } from 'next/cache';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

// Mock user ID for starter template (since we might not have full auth flow working perfectly without real keys)
// In production, we get this from Supabase session.
const TEMP_USER_ID = 'user-demo-123';

export async function getTodos() {
    // In real app: const { data: { user } } = await supabase.auth.getUser();
    // const userId = user?.id;
    const userId = TEMP_USER_ID;
    return await TodoService.getTodos(userId);
}

export async function addTodo(formData: FormData) {
    const title = formData.get('title') as string;
    const userId = TEMP_USER_ID;

    if (!title) return;

    await TodoService.createTodo(userId, title);
    revalidatePath('/');
}

export async function toggleTodo(id: string, completed: boolean) {
    const userId = TEMP_USER_ID;
    await TodoService.updateTodo(id, userId, { completed });
    revalidatePath('/');
}

export async function deleteTodo(id: string) {
    const userId = TEMP_USER_ID;
    await TodoService.deleteTodo(id, userId);
    revalidatePath('/');
}

export async function generateAiTodo(context: string) {
    const { text } = await generateText({
        model: openai('gpt-4-turbo'),
        prompt: `Based on the following context, suggest 3 concise actionable todo items formatted as a bulleted list. Context: ${context}`,
    });

    return text;
}
