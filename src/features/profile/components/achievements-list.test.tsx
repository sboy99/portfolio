import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { Achievement } from "@/features/profile/types";
import { AchievementsList } from "./achievements-list";

const achievements: Achievement[] = [
	{
		title: "CSS Certification",
		issuer: "HackerRank",
		href: "https://www.hackerrank.com/certificates/ef1e384af0f3",
	},
];

describe("AchievementsList", () => {
	afterEach(() => {
		cleanup();
	});

	it("renders the heading, title, issuer, and credential link", () => {
		render(<AchievementsList achievements={achievements} />);

		expect(screen.getByRole("heading", { name: "Achievements" })).toBeInTheDocument();
		expect(screen.getByText("CSS Certification")).toBeInTheDocument();
		expect(screen.getByText("HackerRank")).toBeInTheDocument();

		const link = screen.getByRole("link", {
			name: "View CSS Certification credential (opens in a new tab)",
		});
		expect(link).toHaveAttribute("href", "https://www.hackerrank.com/certificates/ef1e384af0f3");
		expect(link).toHaveAttribute("target", "_blank");
	});
});
