import { describe, expect, it } from "vitest";
import { profileSchema } from "./profile";

const validProfile = {
	name: "Sagar Bera",
	handle: "@sboy99",
	title: "Software Engineer",
	headline: "Software engineer",
	bio: "Builds production web systems.",
	location: "India",
	email: "hello@sboy99.dev",
	socials: [{ label: "GitHub", href: "https://github.com/sboy99" }],
	skills: [{ category: "Languages", items: ["TypeScript"] }],
	languages: ["English", "Hindi", "Bengali"],
	experience: [
		{
			company: "Independent",
			role: "Software Engineer",
			startDate: "2023-01-01",
			endDate: null,
			summary: "Shipping TypeScript products.",
			skills: ["TypeScript", "Next.js"],
		},
	],
	education: [
		{
			school: "Self-directed",
			program: "Computer Science",
			startDate: "2019-01-01",
			endDate: "2023-01-01",
			result: "CGPA: 8.58",
		},
	],
	openSource: [
		{
			name: "Mintlify",
			description: "Open source React UI components for documentation sites.",
			href: "https://github.com/mintlify/components",
		},
	],
	achievements: [
		{
			title: "CSS Certification",
			issuer: "HackerRank",
			href: "https://www.hackerrank.com/certificates/ef1e384af0f3",
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

	it("accepts experience skills", () => {
		expect(profileSchema.parse(validProfile).experience[0]?.skills).toEqual([
			"TypeScript",
			"Next.js",
		]);
	});

	it("rejects an empty experience skill", () => {
		const result = profileSchema.safeParse({
			...validProfile,
			experience: [{ ...validProfile.experience[0], skills: [""] }],
		});
		expect(result.success).toBe(false);
	});

	it("defaults omitted experience skills to an empty list", () => {
		const result = profileSchema.parse({
			...validProfile,
			experience: [
				{
					company: "Independent",
					role: "Software Engineer",
					startDate: "2023-01-01",
					endDate: null,
					summary: "Shipping TypeScript products.",
				},
			],
		});
		expect(result.experience[0]?.skills).toEqual([]);
	});

	it("accepts spoken languages", () => {
		expect(profileSchema.parse(validProfile).languages).toEqual([
			"English",
			"Hindi",
			"Bengali",
		]);
	});

	it("rejects an empty language entry", () => {
		const result = profileSchema.safeParse({
			...validProfile,
			languages: ["English", ""],
		});
		expect(result.success).toBe(false);
	});
});
