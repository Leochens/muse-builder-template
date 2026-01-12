import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined
}

let prisma: PrismaClientSingleton | undefined;

try {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL not set");

    prisma = globalForPrisma.prisma ?? new PrismaClient({
        datasources: {
            db: {
                url: url
            }
        }
    })
} catch (e) {
    console.warn("Failed to initialize Prisma Client. Database might not be configured.", e);
}

export default prisma

if (process.env.NODE_ENV !== 'production' && prisma) globalForPrisma.prisma = prisma
