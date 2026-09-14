import { describe, expect, it } from "vitest";
import { projectSchema, projectsSchema } from "./project";

const validProject = {
	slug: "content-engine",
	title: "Content Engine",
	summary: "MDX publishing pipeline",
	description: "Typed MDX content with Zod frontmatter.",
	stack: ["TypeScript", "Next.js"],
	links: {
		github: "https://github.com/sboy99/content-engine",
		live: "https://sboy99.dev",
		demo: null,
	},
	featured: true,
	year: 2024,
	image: null,
};

describe("projectSchema", () => {
	it("accepts a valid project", () => {
		expect(projectSchema.parse(validProject).slug).toBe("content-engine");
	});

	it("rejects an invalid slug", () => {
		const result = projectSchema.safeParse({ ...validProject, slug: "Not a Slug" });
		expect(result.success).toBe(false);
	});
});

describe("projectsSchema", () => {
	it("accepts an array of projects", () => {
		expect(projectsSchema.parse([validProject])).toHaveLength(1);
	});
});
