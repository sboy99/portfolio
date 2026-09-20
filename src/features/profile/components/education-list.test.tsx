import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { Education } from "@/features/profile/types";
import { EducationList } from "./education-list";

const education: Education[] = [
	{
		school: "Panskura Banamali College (Autonomous)",
		program: "B.Sc. in Computer Science",
		startDate: "2018-01-01",
		endDate: "2021-01-01",
		result: "CGPA: 8.58",
	},
	{
		school: "Panskura Banamali College (Autonomous)",
		program: "M.Sc. in Computer Science",
		startDate: "2021-01-01",
		endDate: "2023-01-01",
	},
];

describe("EducationList", () => {
	afterEach(() => {
		cleanup();
	});

	it("renders the heading, programs, schools, and optional result", () => {
		render(<EducationList education={education} />);

		expect(screen.getByRole("heading", { name: "Education" })).toBeInTheDocument();
		expect(screen.getByText("B.Sc. in Computer Science")).toBeInTheDocument();
		expect(screen.getByText("M.Sc. in Computer Science")).toBeInTheDocument();
		expect(screen.getAllByText("Panskura Banamali College (Autonomous)")).toHaveLength(2);
		expect(screen.getByText("CGPA: 8.58")).toBeInTheDocument();
	});
});
