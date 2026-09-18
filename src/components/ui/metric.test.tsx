import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Metric } from "./metric";

describe("Metric", () => {
	afterEach(() => {
		cleanup();
	});

	it("renders a single value", () => {
		render(<Metric value="50,000+" />);

		expect(screen.getByText("50,000+")).toBeInTheDocument();
		expect(screen.queryByText("→")).not.toBeInTheDocument();
	});

	it("renders a delta pair", () => {
		render(<Metric delta={{ from: "2%", to: "20%" }} value="2% to 20%" />);

		expect(screen.getByText("2% → 20%")).toBeInTheDocument();
	});
});
