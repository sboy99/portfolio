import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { OpenSource } from "@/features/profile/types";
import { OpenSourceList } from "./open-source-list";

const openSource: OpenSource[] = [
	{
		name: "Mintlify",
		description: "Open source React UI components for documentation sites.",
		href: "https://github.com/mintlify/components",
	},
];

describe("OpenSourceList", () => {
	afterEach(() => {
		cleanup();
	});

	it("renders the heading, name, and GitHub link", () => {
		render(<OpenSourceList openSource={openSource} />);

		expect(screen.getByRole("heading", { name: "Open Source" })).toBeInTheDocument();
		expect(screen.getByText("Mintlify")).toBeInTheDocument();
		expect(
			screen.getByText("Open source React UI components for documentation sites."),
		).toBeInTheDocument();

		const link = screen.getByRole("link", { name: "GitHub" });
		expect(link).toHaveAttribute("href", "https://github.com/mintlify/components");
		expect(link).toHaveAttribute("target", "_blank");
	});
});
