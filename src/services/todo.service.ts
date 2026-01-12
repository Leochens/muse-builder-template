import prisma from '@/lib/prisma';
import { Todo } from '@prisma/client';

export class TodoService {
    static async getTodos(userId: string) {
        if (!prisma) return [];
        try {
            return await prisma.todo.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
            });
        } catch (error) {
            console.warn("Database connection failed", error);
            return [];
        }
    }

    static async createTodo(userId: string, title: string) {
        if (!prisma) throw new Error("Database not configured");
        return prisma.todo.create({
            data: {
                title,
                userId,
                completed: false,
            },
        });
    }

    static async updateTodo(id: string, userId: string, data: Partial<Todo>) {
        if (!prisma) throw new Error("Database not configured");
        return prisma.todo.update({
            where: { id, userId },
            data,
        });
    }

    static async deleteTodo(id: string, userId: string) {
        if (!prisma) throw new Error("Database not configured");
        return prisma.todo.delete({
            where: { id, userId },
        });
    }
}
