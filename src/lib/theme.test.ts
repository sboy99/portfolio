import { describe, expect, it, vi } from "vitest";
import { DEFAULT_THEME } from "@/config/theme";
import {
	applyTheme,
	parseStoredTheme,
	themeAttributes,
	withMode,
	withNeutral,
	withPrimary,
} from "./theme";

const stored = {
	mode: "light",
	primary: "rose",
	neutral: "stone",
} as const;

describe("parseStoredTheme", () => {
	it("returns the default theme for null", () => {
		expect(parseStoredTheme(null)).toEqual(DEFAULT_THEME);
	});

	it("returns the default theme for invalid JSON", () => {
		expect(parseStoredTheme("{")).toEqual(DEFAULT_THEME);
	});

	it("returns the default theme for an unknown primary", () => {
		expect(parseStoredTheme(JSON.stringify({ ...stored, primary: "gold" }))).toEqual(DEFAULT_THEME);
	});

	it("parses a valid stored preference", () => {
		expect(parseStoredTheme(JSON.stringify(stored))).toEqual(stored);
	});
});

describe("themeAttributes", () => {
	it("maps preference fields onto data attributes", () => {
		expect(themeAttributes(stored)).toEqual({
			"data-theme": "light",
			"data-primary": "rose",
			"data-neutral": "stone",
		});
	});
});

describe("immutable updaters", () => {
	it("returns a new object with the next primary", () => {
		const next = withPrimary(DEFAULT_THEME, "rose");

		expect(next).toEqual({ ...DEFAULT_THEME, primary: "rose" });
		expect(next).not.toBe(DEFAULT_THEME);
		expect(DEFAULT_THEME.primary).toBe("emerald");
	});

	it("returns a new object with the next neutral", () => {
		const next = withNeutral(DEFAULT_THEME, "slate");

		expect(next.neutral).toBe("slate");
		expect(next).not.toBe(DEFAULT_THEME);
	});

	it("returns a new object with the next mode", () => {
		const next = withMode(DEFAULT_THEME, "light");

		expect(next.mode).toBe("light");
		expect(next).not.toBe(DEFAULT_THEME);
	});
});

describe("applyTheme", () => {
	it("writes data attributes onto the given root", () => {
		const root = { setAttribute: vi.fn() } as unknown as HTMLElement;

		applyTheme(stored, root);

		expect(root.setAttribute).toHaveBeenCalledWith("data-theme", "light");
		expect(root.setAttribute).toHaveBeenCalledWith("data-primary", "rose");
		expect(root.setAttribute).toHaveBeenCalledWith("data-neutral", "stone");
	});
});
