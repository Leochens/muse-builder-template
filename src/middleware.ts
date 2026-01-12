import { type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { updateSession } from '@/lib/supabase/middleware';

const i18nMiddleware = createMiddleware({
    locales: ['en', 'zh'],
    defaultLocale: 'en'
});

export async function middleware(request: NextRequest) {
    // 1. Run Supabase middleware to refresh session
    const supabaseResponse = await updateSession(request);

    // 2. Run i18n middleware
    const response = i18nMiddleware(request);

    // 3. Copy cookies from Supabase response to i18n response
    // This ensures that if Supabase refreshed the token, we pass that back to the browser
    supabaseResponse.cookies.getAll().forEach((cookie) => {
        response.cookies.set(cookie.name, cookie.value, cookie);
    });

    return response;
}

export const config = {
    matcher: [
        '/',
        '/(zh|en)/:path*',
        '/((?!_next|_vercel|.*\\..*).*)'
    ]
};
