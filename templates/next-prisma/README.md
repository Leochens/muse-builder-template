# Next.js Full Stack Starter Template

A premium starter template featuring Next.js 14+, Supabase, Prisma, and AI integration with a Linear-style aesthetic.

## Features

- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL) + Prisma ORM
- **Auth**: Supabase Auth (SSR)
- **AI**: Vercel AI SDK (OpenAI)
- **UI**: Tailwind CSS + Framer Motion (Linear Style)
- **I18n**: next-intl (English/Chinese)
- **Testing**: Vitest
- **Deployment**: Docker (Standalone)

## Getting Started

1. **Environment Setup**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Fill in your Supabase and OpenAI keys.

2. **Database Setup**
    Initialize Prisma:
   ```bash
   npx prisma generate
   # If you have the DB URL:
   npx prisma migrate dev --name init
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## Docker Deployment

Build and run with Docker:
```bash
docker build -t next-starter .
docker run -p 3000:3000 next-starter
```

## Project Structure

- `src/app`: App Router pages
- `src/components`: UI components
- `src/lib`: Utilities and clients (Supabase, AI)
- `src/services`: Business logic layer
- `messages`: I18n translation files

## License

MIT
