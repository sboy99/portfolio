import { describe, expect, it } from "vitest";
import type { Experience } from "@/schemas/profile";
import type { Project } from "@/schemas/project";
import { sortExperienceDesc, sortProjectsByYearDesc } from "./resume-order";

const experience: Experience[] = [
	{
		company: "Older Co",
		role: "Junior",
		startDate: "2020-01-01",
		endDate: "2022-01-01",
		summary: "First role.",
		skills: [],
	},
	{
		company: "Newer Co",
		role: "Senior",
		startDate: "2024-01-01",
		endDate: null,
		summary: "Current role.",
		skills: [],
	},
];

const projects: Project[] = [
	{
		slug: "older",
		title: "Older",
		summary: "Older project.",
		description: "Older project description.",
		stack: ["TypeScript"],
		links: { github: null, live: null, demo: null, docker: null },
		featured: true,
		year: 2023,
		origin: "Self",
		image: null,
	},
	{
		slug: "newer",
		title: "Newer",
		summary: "Newer project.",
		description: "Newer project description.",
		stack: ["TypeScript"],
		links: { github: null, live: null, demo: null, docker: null },
		featured: true,
		year: 2026,
		origin: "Self",
		image: null,
	},
];

describe("sortExperienceDesc", () => {
	it("returns experience newest-first", () => {
		const sorted = sortExperienceDesc(experience);
		expect(sorted[0]?.company).toBe("Newer Co");
		expect(sorted[1]?.company).toBe("Older Co");
	});

	it("does not mutate the input array", () => {
		const copy = [...experience];
		sortExperienceDesc(experience);
		expect(experience).toEqual(copy);
	});
});

describe("sortProjectsByYearDesc", () => {
	it("returns projects newest-first", () => {
		const sorted = sortProjectsByYearDesc(projects);
		expect(sorted[0]?.slug).toBe("newer");
		expect(sorted[1]?.slug).toBe("older");
	});

	it("does not mutate the input array", () => {
		const copy = [...projects];
		sortProjectsByYearDesc(projects);
		expect(projects).toEqual(copy);
	});
});
