import { describe, expect, it } from "vitest";
import { parseHighlightedText } from "./parse-highlighted-text";

describe("parseHighlightedText", () => {
	it("returns plain text unchanged", () => {
		expect(parseHighlightedText("No metrics here.")).toEqual([
			{ type: "text", value: "No metrics here." },
		]);
	});

	it("parses a single metric mark", () => {
		expect(parseHighlightedText("used by [[50,000+]] creators")).toEqual([
			{ type: "text", value: "used by " },
			{ type: "metric", value: "50,000+" },
			{ type: "text", value: " creators" },
		]);
	});

	it("parses multiple metric marks", () => {
		expect(parseHighlightedText("[[50,000+]] and [[5x]]")).toEqual([
			{ type: "metric", value: "50,000+" },
			{ type: "text", value: " and " },
			{ type: "metric", value: "5x" },
		]);
	});

	it("detects delta metrics with 'to'", () => {
		expect(parseHighlightedText("from [[2% to 20%]] in 3 months")).toEqual([
			{ type: "text", value: "from " },
			{ type: "metric", value: "2% to 20%", delta: { from: "2%", to: "20%" } },
			{ type: "text", value: " in 3 months" },
		]);
	});

	it("detects delta metrics with arrow", () => {
		expect(parseHighlightedText("[[2% → 20%]]")).toEqual([
			{ type: "metric", value: "2% → 20%", delta: { from: "2%", to: "20%" } },
		]);
	});

	it("leaves unmatched opening brackets as text", () => {
		expect(parseHighlightedText("broken [[50,000+")).toEqual([
			{ type: "text", value: "broken [[50,000+" },
		]);
	});
});
