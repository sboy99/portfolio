import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { HighlightedText } from "./highlighted-text";

describe("HighlightedText", () => {
	afterEach(() => {
		cleanup();
	});

	it("renders plain text", () => {
		render(<HighlightedText text="Plain summary." />);

		expect(screen.getByText("Plain summary.")).toBeInTheDocument();
	});

	it("renders marked metrics without brackets", () => {
		render(<HighlightedText text="used by [[50,000+]] creators" />);

		expect(screen.getByText("50,000+")).toBeInTheDocument();
		expect(screen.queryByText("[[50,000+]]")).not.toBeInTheDocument();
	});
});
