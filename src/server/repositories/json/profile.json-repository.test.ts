import { describe, expect, it } from "vitest";
import { JsonProfileRepository } from "./profile.json-repository";

describe("JsonProfileRepository", () => {
	it("returns the profile from content/profile.json", async () => {
		const profile = await new JsonProfileRepository().get();
		expect(profile.name).toBe("Sagar Bera");
		expect(profile.handle).toBe("sagar/sboy99");
		expect(profile.email).toContain("@");
	});
});
