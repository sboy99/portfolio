import { cache } from "react";
import { projectsSchema } from "@/schemas/project";
import type { ProjectRepository } from "../projects.repository";
import { parseContent, readContentFile } from "./read-content";

const PROJECTS_FILE = "projects.json";

const loadProjects = cache(async () => {
	const data = await readContentFile(PROJECTS_FILE);
	return parseContent(PROJECTS_FILE, projectsSchema, data);
});

export class JsonProjectRepository implements ProjectRepository {
	async findAll() {
		return loadProjects();
	}

	async findBySlug(slug: string) {
		const projects = await loadProjects();
		return projects.find((project) => project.slug === slug) ?? null;
	}

	async findFeatured() {
		const projects = await loadProjects();
		return projects.filter((project) => project.featured);
	}
}
