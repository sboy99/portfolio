import { describe, expect, it } from "vitest";
import { themePreferenceSchema } from "./theme";

const validTheme = {
	mode: "dark",
	primary: "emerald",
	neutral: "zinc",
};

describe("themePreferenceSchema", () => {
	it("accepts a valid preference", () => {
		expect(themePreferenceSchema.parse(validTheme)).toEqual(validTheme);
	});

	it("accepts light mode", () => {
		expect(themePreferenceSchema.parse({ ...validTheme, mode: "light" }).mode).toBe("light");
	});

	it("rejects an unknown mode", () => {
		const result = themePreferenceSchema.safeParse({ ...validTheme, mode: "system" });
		expect(result.success).toBe(false);
	});

	it("rejects an unknown primary", () => {
		const result = themePreferenceSchema.safeParse({ ...validTheme, primary: "gold" });
		expect(result.success).toBe(false);
	});

	it("rejects an unknown neutral", () => {
		const result = themePreferenceSchema.safeParse({ ...validTheme, neutral: "carbon" });
		expect(result.success).toBe(false);
	});
});
