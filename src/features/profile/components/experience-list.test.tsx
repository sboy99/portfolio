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
		summary: "Shipping TypeScript products for [[50,000+]] users.",
		highlights: ["Led a migration that made the app [[20%]] faster."],
		skills: ["TypeScript", "Next.js"],
	},
];

describe("ExperienceList", () => {
	afterEach(() => {
		cleanup();
	});

	it("renders marked metrics without brackets", () => {
		render(<ExperienceList experience={experience} />);

		expect(screen.getByText("50,000+")).toBeInTheDocument();
		expect(screen.queryByText("[[50,000+]]")).not.toBeInTheDocument();
	});

	it("renders skills for an experience item", () => {
		render(<ExperienceList experience={experience} />);

		const skills = screen.getByRole("list", { name: "Skills at Independent" });
		expect(skills).toHaveTextContent("TypeScript");
		expect(skills).toHaveTextContent("Next.js");
	});

	it("omits the skills list when an item has none", () => {
		render(
			<ExperienceList experience={[{ ...experience[0], company: "Studio", skills: [] }]} />,
		);

		expect(screen.queryByRole("list", { name: "Skills at Studio" })).not.toBeInTheDocument();
	});

	it("renders experience highlights", () => {
		render(<ExperienceList experience={experience} />);

		const highlights = screen.getByRole("list", { name: "Highlights at Independent" });
		expect(highlights).toHaveTextContent("20%");
		expect(screen.queryByText("[[20%]]")).not.toBeInTheDocument();
	});

	it("omits highlights when an item has none", () => {
		render(
			<ExperienceList
				experience={[{ ...experience[0], company: "Studio", highlights: [] }]}
			/>,
		);

		expect(screen.queryByRole("list", { name: "Highlights at Studio" })).not.toBeInTheDocument();
	});
});
