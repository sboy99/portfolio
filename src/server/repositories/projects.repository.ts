import type { Project } from "@/schemas/project";

export interface ProjectRepository {
	findAll(): Promise<Project[]>;
	findBySlug(slug: string): Promise<Project | null>;
	findFeatured(): Promise<Project[]>;
}
