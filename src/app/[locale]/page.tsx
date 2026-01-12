import TodoApp from '@/components/TodoApp';
import { getTodos } from '@/app/actions';
import { AlertCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

function SetupWarning() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-muted/20">
            <div className="max-w-md w-full bg-card border border-destructive/20 rounded-lg p-6 shadow-lg space-y-4">
                <div className="flex items-center gap-3 text-destructive">
                    <AlertCircle className="w-6 h-6" />
                    <h2 className="text-xl font-semibold">Database Not Configured</h2>
                </div>
                <p className="text-muted-foreground">
                    It looks like your database connection is missing or invalid.
                </p>
                <div className="bg-muted p-4 rounded text-sm font-mono overflow-x-auto">
                    cp .env.example .env<br />
                    # Then edit .env with your Supabase URL
                </div>
                <p className="text-sm text-muted-foreground">
                    Check the README.md for full setup instructions.
                </p>
            </div>
        </div>
    );
}

export default async function Home() {
    // Basic check if DATABASE_URL is set and not default placeholder
    const isDbConfigured = process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('[ref]');

    if (!isDbConfigured) {
        return <SetupWarning />;
    }

    // Fetch initial data on server
    const todos = await getTodos();

    return (
        <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 via-background to-background dark:from-slate-900 dark:via-background dark:to-background p-4 md:p-24">
            <TodoApp initialTodos={todos} />
        </main>
    );
}
