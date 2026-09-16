import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ResumeDownload } from "./resume-download";

describe("ResumeDownload", () => {
	afterEach(() => {
		cleanup();
	});

	it("renders a download link with the configured path and filename", () => {
		render(<ResumeDownload />);

		const link = screen.getByRole("link", { name: /download pdf/i });
		expect(link).toHaveAttribute("href", "/sagar-bera-resume.pdf");
		expect(link).toHaveAttribute("download", "Sagar_Bera_Resume.pdf");
	});
});
