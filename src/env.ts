import zod from "zod";

const envSchema = zod.object({
    DATABASE_URL: zod.string().min(1),
    JWT_TOKEN: zod.string().min(1),
});

export const env = envSchema.parse(process.env);
