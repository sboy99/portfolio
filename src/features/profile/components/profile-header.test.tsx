import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { Profile } from "@/features/profile/types";
import { ProfileHeader } from "./profile-header";

const profile: Profile = {
	name: "Sagar Bera",
	handle: "sagar/sboy99",
	title: "Backend & DevOps Engineer",
	headline: "Backend and DevOps engineer.",
	bio: "Products used by [[50,000+]] creators with growth from [[2% to 20%]] in 3 months.",
	location: "Bengaluru, India",
	email: "contact.sagarbera@gmail.com",
	socials: [{ label: "GitHub", href: "https://github.com/sboy99" }],
	skills: [{ category: "Languages", items: ["TypeScript"] }],
	languages: ["English", "Hindi", "Bengali"],
	experience: [],
	education: [],
	openSource: [],
	achievements: [],
};

describe("ProfileHeader", () => {
	afterEach(() => {
		cleanup();
	});

	it("renders highlighted metrics without brackets", () => {
		render(<ProfileHeader profile={profile} />);

		const bio = screen.getByText(/Products used by/i).closest("p");
		expect(bio).toHaveTextContent("50,000+");
		expect(bio).toHaveTextContent("2%");
		expect(bio).toHaveTextContent("20%");
		expect(screen.queryByRole("list", { name: "Key results" })).not.toBeInTheDocument();
		expect(screen.queryByText("[[50,000+]]")).not.toBeInTheDocument();
	});
});
