import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { LanguagesList } from "./languages-list";

describe("LanguagesList", () => {
	afterEach(() => {
		cleanup();
	});

	it("renders the heading and language badges", () => {
		render(<LanguagesList languages={["English", "Hindi", "Bengali"]} />);

		expect(screen.getByRole("heading", { name: "Languages" })).toBeInTheDocument();
		expect(screen.getByText("English")).toBeInTheDocument();
		expect(screen.getByText("Hindi")).toBeInTheDocument();
		expect(screen.getByText("Bengali")).toBeInTheDocument();
	});
});
