import { describe, expect, it } from "vitest";
import { THEME_STORAGE_KEY } from "@/config/theme";
import { themeInitScript } from "./theme-script";

describe("themeInitScript", () => {
	it("reads the storage key, falls back to the system setting and sets data-theme", () => {
		expect(themeInitScript).toContain(THEME_STORAGE_KEY);
		expect(themeInitScript).toContain("prefers-color-scheme: dark");
		expect(themeInitScript).toContain("data-theme");
		expect(themeInitScript).not.toContain("data-primary");
	});
});
