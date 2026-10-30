import { z } from "zod";

const slugSchema = z
	.string()
	.min(1)
	.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

/** The YAML block at the top of every post in content/writings. */
export const writingFrontmatterSchema = z.object({
	title: z.string().min(1),
	/** The italic line under the title, the list summary and the meta description. */
	description: z.string().min(1),
	date: z.iso.date(),
	updated: z.iso.date().optional(),
	/** Free-form; the list builds its topic chips from whatever posts use. */
	topic: z.string().min(1),
	tags: z.array(z.string().min(1)).default([]),
	/** Ids from content/authors.json. Posts are Sagar's by default, so he is never listed. */
	coauthors: z.array(slugSchema).default([]),
	/** Share image for this post; the site image otherwise. */
	cover: z.string().min(1).optional(),
	/** For cross-posts: where the post first appeared. */
	canonical: z.url().optional(),
	/** Hidden in production, visible while writing. */
	draft: z.boolean().default(false),
	/** Listed under Featured writing on the home page. */
	featured: z.boolean().default(false),
});

export const authorSchema = z.object({
	name: z.string().min(1),
	role: z.string().min(1).optional(),
	bio: z.string().min(1).optional(),
	avatar: z.string().min(1).optional(),
	links: z.record(z.string().min(1), z.url()).default({}),
});

export const authorsSchema = z.record(slugSchema, authorSchema);

export type WritingFrontmatter = z.infer<typeof writingFrontmatterSchema>;
export type Author = z.infer<typeof authorSchema>;
