import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { Experience } from "@/features/profile/types";
import { ExperienceList } from "./experience-list";

const experience: Experience[] = [
	{
		company: "Independent",
		role: "Software Engineer",
		startDate: "2023-01-01",
		endDate: null,
		summary: "Shipping TypeScript products.",
		skills: ["TypeScript", "Next.js"],
	},
];

describe("ExperienceList", () => {
	afterEach(() => {
		cleanup();
	});

	it("renders skills for an experience item", () => {
		render(<ExperienceList experience={experience} />);

		const skills = screen.getByRole("list", { name: "Skills at Independent" });
		expect(skills).toHaveTextContent("TypeScript");
		expect(skills).toHaveTextContent("Next.js");
	});

	it("omits the skills list when an item has none", () => {
		render(<ExperienceList experience={[{ ...experience[0], company: "Studio", skills: [] }]} />);

		expect(screen.queryByRole("list", { name: "Skills at Studio" })).not.toBeInTheDocument();
	});
});
