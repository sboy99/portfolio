import { describe, expect, it } from "vitest";
import { formatDate, formatYearRange } from "./format-date";

describe("formatDate", () => {
	it("formats an ISO date as month and year", () => {
		expect(formatDate("2024-06-01")).toBe("Jun 2024");
	});
});

describe("formatYearRange", () => {
	it("labels a missing end date as present", () => {
		expect(formatYearRange("2023-01-01", null)).toBe("2023 — Present");
	});

	it("collapses a single-year range", () => {
		expect(formatYearRange("2024-01-01", "2024-12-01")).toBe("2024");
	});

	it("formats a multi-year range", () => {
		expect(formatYearRange("2019-01-01", "2023-01-01")).toBe("2019 — 2023");
	});
});
