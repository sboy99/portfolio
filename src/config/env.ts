import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
	SITE_URL: z.url().optional(),
});

const parsed = envSchema.safeParse({
	NODE_ENV: process.env.NODE_ENV,
	SITE_URL: process.env.SITE_URL,
});

if (!parsed.success) {
	throw new Error(`Invalid environment variables: ${parsed.error.message}`);
}

export const env = parsed.data;
