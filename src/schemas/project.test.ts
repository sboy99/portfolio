import { describe, expect, it } from "vitest";
import { projectSchema, projectsSchema } from "./project";

const validProject = {
	slug: "content-engine",
	title: "Content Engine",
	summary: "MDX publishing pipeline",
	highlights: ["Typed MDX content with Zod frontmatter."],
	stack: ["TypeScript", "Next.js"],
	links: {
		github: "https://github.com/sboy99/content-engine",
		live: "https://sboy99.dev",
		demo: null,
		docker: null,
	},
	featured: true,
	year: 2024,
	origin: "Self",
	image: null,
};

describe("projectSchema", () => {
	it("accepts a valid project", () => {
		expect(projectSchema.parse(validProject).slug).toBe("content-engine");
	});

	it("accepts an optional docker link", () => {
		expect(
			projectSchema.parse({
				...validProject,
				links: {
					...validProject.links,
					docker: "https://hub.docker.com/repository/docker/sboy99/go-vault",
				},
			}).links.docker,
		).toBe("https://hub.docker.com/repository/docker/sboy99/go-vault");
	});

	it("defaults omitted docker links to null", () => {
		expect(
			projectSchema.parse({
				...validProject,
				links: {
					github: validProject.links.github,
					live: validProject.links.live,
					demo: null,
				},
			}).links.docker,
		).toBeNull();
	});

	it("defaults omitted highlights to an empty list", () => {
		const { highlights: _highlights, ...withoutHighlights } = validProject;
		expect(projectSchema.parse(withoutHighlights).highlights).toEqual([]);
	});

	it("rejects more than three highlights", () => {
		const result = projectSchema.safeParse({
			...validProject,
			highlights: ["one", "two", "three", "four"],
		});
		expect(result.success).toBe(false);
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
