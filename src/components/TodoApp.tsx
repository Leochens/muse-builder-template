'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { addTodo, toggleTodo, deleteTodo, generateAiTodo } from '@/app/actions';
import { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trash2, CheckCircle, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

export default function TodoApp({ initialTodos }: { initialTodos: Todo[] }) {
    const t = useTranslations('Todo');
    const [isPending, startTransition] = useTransition();
    const [aiPrompt, setAiPrompt] = useState('');

    // Optimistic UI could be implemented here, but we'll stick to revalidatePath for simplicity in starter

    async function handleAdd(formData: FormData) {
        startTransition(async () => {
            await addTodo(formData);
        });
    }

    async function handleAiGenerate() {
        if (!aiPrompt) return;
        // This is just a demo. In real app we might parse the result and auto-add.
        // For now, we alert the suggestion.
        const suggestion = await generateAiTodo(aiPrompt);
        alert(suggestion);
    }

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-8">
            <div className="space-y-2 text-center">
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
                    {t('title')}
                </h1>
                <p className="text-muted-foreground">Minimalist Task Manager</p>
            </div>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl">
                <CardHeader>
                    <CardTitle className="text-lg font-medium">{t('add')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form action={handleAdd} className="flex gap-2">
                        <Input
                            name="title"
                            placeholder={t('placeholder')}
                            className="bg-background/50"
                            required
                        />
                        <Button type="submit" disabled={isPending}>
                            {isPending ? '...' : '+'}
                        </Button>
                    </form>

                    <div className="flex gap-2 items-center">
                        <Input
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            placeholder="AI Context (e.g. 'Plan a focused morning')"
                            className="text-xs h-8 bg-purple-500/5 border-purple-500/10 focus-visible:ring-purple-500/20"
                        />
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={handleAiGenerate}
                            className="text-xs h-8 gap-2 border-purple-500/20 hover:bg-purple-500/10"
                        >
                            <Sparkles className="w-3 h-3 text-purple-500" />
                            {t('generate_ai')}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-2">
                <AnimatePresence>
                    {initialTodos.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center text-muted-foreground py-10"
                        >
                            {t('empty')}
                        </motion.div>
                    )}

                    {initialTodos.map((todo) => (
                        <motion.div
                            key={todo.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            className="group flex items-center justify-between p-4 rounded-lg border border-border/40 bg-card/40 hover:bg-card/60 transition-all hover:shadow-sm hover:border-border/80"
                        >
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => startTransition(() => toggleTodo(todo.id, !todo.completed))}
                                    disabled={isPending}
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {todo.completed ?
                                        <CheckCircle className="w-5 h-5 text-green-500" /> :
                                        <Circle className="w-5 h-5" />
                                    }
                                </button>
                                <span className={cn(todo.completed && "line-through text-muted-foreground")}>
                                    {todo.title}
                                </span>
                            </div>

                            <button
                                onClick={() => startTransition(() => deleteTodo(todo.id))}
                                disabled={isPending}
                                className="opacity-0 group-hover:opacity-100 text-destructive/50 hover:text-destructive transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
