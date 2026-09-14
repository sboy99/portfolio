import { describe, expect, it } from "vitest";
import { DEFAULT_THEME, THEME_STORAGE_KEY } from "@/config/theme";
import { themeInitScript } from "./theme-script";

describe("themeInitScript", () => {
	it("reads the storage key and writes the three data attributes", () => {
		expect(themeInitScript).toContain(THEME_STORAGE_KEY);
		expect(themeInitScript).toContain(`data-theme`);
		expect(themeInitScript).toContain(`data-primary`);
		expect(themeInitScript).toContain(`data-neutral`);
		expect(themeInitScript).toContain(DEFAULT_THEME.mode);
		expect(themeInitScript).toContain(DEFAULT_THEME.primary);
		expect(themeInitScript).toContain(DEFAULT_THEME.neutral);
	});
});
