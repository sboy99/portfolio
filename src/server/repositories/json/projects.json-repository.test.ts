import { describe, expect, it } from "vitest";
import { JsonProjectRepository } from "./projects.json-repository";

describe("JsonProjectRepository", () => {
	const repository = new JsonProjectRepository();

	it("returns every project from content/projects.json", async () => {
		const projects = await repository.findAll();
		expect(projects.length).toBeGreaterThan(0);
		expect(projects.every((project) => project.slug.length > 0)).toBe(true);
	});

	it("finds a project by slug", async () => {
		const project = await repository.findBySlug("content-engine");
		expect(project?.title).toBe("Content Engine");
	});

	it("returns null for an unknown slug", async () => {
		await expect(repository.findBySlug("missing")).resolves.toBeNull();
	});

	it("returns only featured projects", async () => {
		const featured = await repository.findFeatured();
		expect(featured.length).toBeGreaterThan(0);
		expect(featured.every((project) => project.featured)).toBe(true);
	});
});
