import { describe, expect, it } from "vitest";
import { applyThemeMode, parseStoredMode, readThemeMode } from "./theme";

describe("parseStoredMode", () => {
	it("returns null for nothing stored or garbage", () => {
		expect(parseStoredMode(null)).toBeNull();
		expect(parseStoredMode("")).toBeNull();
		expect(parseStoredMode("{")).toBeNull();
		expect(parseStoredMode("system")).toBeNull();
	});

	it("reads a plain mode", () => {
		expect(parseStoredMode("dark")).toBe("dark");
		expect(parseStoredMode("light")).toBe("light");
	});

	it("reads the mode out of the older preference object", () => {
		expect(
			parseStoredMode(JSON.stringify({ mode: "light", primary: "rose", neutral: "stone" })),
		).toBe("light");
	});
});

describe("applyThemeMode and readThemeMode", () => {
	it("writes and reads data-theme on the root", () => {
		const attrs = new Map<string, string>();
		const root = {
			setAttribute: (k: string, v: string) => attrs.set(k, v),
			getAttribute: (k: string) => attrs.get(k) ?? null,
		} as unknown as HTMLElement;

		applyThemeMode("dark", root);
		expect(readThemeMode(root)).toBe("dark");
		applyThemeMode("light", root);
		expect(readThemeMode(root)).toBe("light");
	});
});
