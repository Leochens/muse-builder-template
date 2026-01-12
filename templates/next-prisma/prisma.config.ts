import { defineConfig } from '@prisma/config';
export default defineConfig({
    // Defaulting to postgresql, can be changed here or overridden
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});
