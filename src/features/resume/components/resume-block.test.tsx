import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ResumeBlock } from "./resume-block";

describe("ResumeBlock", () => {
	afterEach(() => {
		cleanup();
	});

	it("renders the label and wires aria-labelledby", () => {
		render(
			<ResumeBlock id="resume-summary" label="Summary">
				<p>Summary content</p>
			</ResumeBlock>,
		);

		const section = screen.getByRole("region", { name: "Summary" });
		expect(section).toBeInTheDocument();
		expect(screen.getByText("Summary content")).toBeInTheDocument();
	});
});
