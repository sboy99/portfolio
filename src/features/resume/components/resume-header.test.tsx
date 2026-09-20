import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { Profile } from "@/features/resume/types";
import { ResumeHeader } from "./resume-header";

const profile: Profile = {
	name: "Sagar Bera",
	handle: "@sboy99",
	title: "Backend & DevOps Engineer",
	headline: "Backend and DevOps engineer.",
	bio: "Builds production TypeScript systems.",
	location: "Bengaluru, India",
	email: "hello@sboy99.dev",
	socials: [{ label: "GitHub", href: "https://github.com/sboy99" }],
	skills: [{ category: "Languages", items: ["TypeScript"] }],
	languages: ["English", "Hindi", "Bengali"],
	experience: [],
	education: [],
	openSource: [],
	achievements: [],
};

describe("ResumeHeader", () => {
	afterEach(() => {
		cleanup();
	});

	it("renders the title and email link", () => {
		render(<ResumeHeader profile={profile} />);

		expect(screen.getByRole("heading", { level: 1, name: "Sagar Bera" })).toBeInTheDocument();
		expect(screen.getByText("Backend & DevOps Engineer")).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "hello@sboy99.dev" })).toHaveAttribute(
			"href",
			"mailto:hello@sboy99.dev",
		);
	});

	it("omits phone when it is absent", () => {
		render(<ResumeHeader profile={profile} />);

		expect(screen.queryByText("+91")).not.toBeInTheDocument();
	});
});
