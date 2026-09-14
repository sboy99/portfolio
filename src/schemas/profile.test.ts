import { describe, expect, it } from "vitest";
import { profileSchema } from "./profile";

const validProfile = {
	name: "Sagar Bera",
	headline: "Software engineer",
	bio: "Builds production web systems.",
	location: "India",
	email: "hello@sboy99.dev",
	socials: [{ label: "GitHub", href: "https://github.com/sboy99" }],
	skills: [{ category: "Languages", items: ["TypeScript"] }],
	experience: [
		{
			company: "Independent",
			role: "Software Engineer",
			startDate: "2023-01-01",
			endDate: null,
			summary: "Shipping TypeScript products.",
		},
	],
	education: [
		{
			school: "Self-directed",
			program: "Computer Science",
			startDate: "2019-01-01",
			endDate: "2023-01-01",
		},
	],
};

describe("profileSchema", () => {
	it("accepts a valid profile", () => {
		expect(profileSchema.parse(validProfile).email).toBe("hello@sboy99.dev");
	});

	it("rejects an invalid email", () => {
		const result = profileSchema.safeParse({ ...validProfile, email: "not-an-email" });
		expect(result.success).toBe(false);
	});
});
