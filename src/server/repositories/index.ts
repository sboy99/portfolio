import { JsonProfileRepository } from "./json/profile.json-repository";
import { JsonProjectRepository } from "./json/projects.json-repository";
import type { ProfileRepository } from "./profile.repository";
import type { ProjectRepository } from "./projects.repository";

const projectRepository: ProjectRepository = new JsonProjectRepository();
const profileRepository: ProfileRepository = new JsonProfileRepository();

export function getProjectRepository(): ProjectRepository {
	return projectRepository;
}

export function getProfileRepository(): ProfileRepository {
	return profileRepository;
}
