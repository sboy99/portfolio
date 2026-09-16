import type { Experience } from "@/schemas/profile";
import type { Project } from "@/schemas/project";

export function sortExperienceDesc(experience: Experience[]): Experience[] {
	return [...experience].sort((a, b) => b.startDate.localeCompare(a.startDate));
}

export function sortProjectsByYearDesc(projects: Project[]): Project[] {
	return [...projects].sort((a, b) => b.year - a.year);
}
