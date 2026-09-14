import { cache } from "react";
import { profileSchema } from "@/schemas/profile";
import type { ProfileRepository } from "../profile.repository";
import { parseContent, readContentFile } from "./read-content";

const PROFILE_FILE = "profile.json";

const loadProfile = cache(async () => {
	const data = await readContentFile(PROFILE_FILE);
	return parseContent(PROFILE_FILE, profileSchema, data);
});

export class JsonProfileRepository implements ProfileRepository {
	async get() {
		return loadProfile();
	}
}
