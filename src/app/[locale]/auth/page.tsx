'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
    const t = useTranslations('Auth');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                alert(error.message);
            } else {
                router.refresh();
                router.push('/');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSignUp = async () => {
        setLoading(true);
        // Demo signup
        const { error } = await supabase.auth.signUp({
            email,
            password
        });
        if (error) alert(error.message);
        else alert('Check your email!');
        setLoading(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
            <Card className="w-full max-w-sm linear-border bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">{t('login')}</CardTitle>
                    <CardDescription>Enter your email below to login to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="grid gap-4">
                        <div className="grid gap-2">
                            <label htmlFor="email">{t('email')}</label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="password">{t('password')}</label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? '...' : t('login')}
                        </Button>
                        <Button type="button" variant="outline" className="w-full" onClick={handleSignUp} disabled={loading}>
                            Sign Up
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
