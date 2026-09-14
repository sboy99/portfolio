import type { Profile } from "@/schemas/profile";

export interface ProfileRepository {
	get(): Promise<Profile>;
}
