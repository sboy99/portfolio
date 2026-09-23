import { z } from "zod";

export const projectLinksSchema = z.object({
	github: z.url().nullable(),
	live: z.url().nullable(),
	demo: z.url().nullable(),
	docker: z.url().nullable().default(null),
});

export const projectSchema = z.object({
	slug: z
		.string()
		.min(1)
		.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
	title: z.string().min(1),
	summary: z.string().min(1),
	highlights: z.array(z.string().min(1)).max(3).default([]),
	stack: z.array(z.string().min(1)).min(1),
	links: projectLinksSchema,
	featured: z.boolean(),
	year: z.number().int().min(2000).max(2100),
	origin: z.string().min(1),
	image: z.string().min(1).nullable(),
});

export const projectsSchema = z.array(projectSchema);

export type Project = z.infer<typeof projectSchema>;
export type ProjectLinks = z.infer<typeof projectLinksSchema>;
