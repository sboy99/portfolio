import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { AnchorHighlights } from "./anchor-highlights";

const LINES = ["Shipped [[250+]] daily users", "Moved to Postgres"];

describe("AnchorHighlights", () => {
	afterEach(() => {
		cleanup();
	});

	it("starts closed with the panel inert", () => {
		render(<AnchorHighlights highlights={LINES} seed={1} slug="kili" />);

		const toggle = screen.getByRole("button", { name: "highlights · 2" });
		expect(toggle).toHaveAttribute("aria-expanded", "false");
		expect(document.getElementById("highlights-kili")).toHaveAttribute("inert");
	});

	it("drops the anchor to open and reels it up to close", () => {
		const { container } = render(<AnchorHighlights highlights={LINES} seed={1} slug="kili" />);
		const toggle = screen.getByRole("button", { name: "highlights · 2" });

		fireEvent.click(toggle);
		expect(toggle).toHaveAttribute("aria-expanded", "true");
		expect(container.firstChild).toHaveClass("is-down");
		expect(document.getElementById("highlights-kili")).not.toHaveAttribute("inert");
		expect(screen.getByText("250+")).toBeInTheDocument();

		fireEvent.click(toggle);
		expect(toggle).toHaveAttribute("aria-expanded", "false");
		expect(container.firstChild).toHaveClass("is-up");
	});
});
