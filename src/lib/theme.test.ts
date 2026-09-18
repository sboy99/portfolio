import { afterEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_THEME } from "@/config/theme";
import {
	applyTheme,
	applyThemeClipVars,
	canTransitionTheme,
	clearThemeClipVars,
	parseStoredTheme,
	THEME_CLIP_Y_OFFSET_LIGHT,
	themeAttributes,
	themeClipOrigin,
	themeClipRadius,
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

describe("themeClipOrigin", () => {
	const rect = { left: 100, top: 40, width: 32, height: 32 };
	const viewport = { width: 1280, height: 800 };

	it("offsets the origin below the button for light mode (sunrise)", () => {
		const origin = themeClipOrigin(rect, "light", viewport);

		expect(origin.x).toBe(116);
		expect(origin.y).toBe(40 + 16 + THEME_CLIP_Y_OFFSET_LIGHT);
		expect(origin.radius).toBe(themeClipRadius(origin.x, origin.y, viewport));
	});

	it("anchors the origin at the toggle center for dark mode (nightfall)", () => {
		const origin = themeClipOrigin(rect, "dark", viewport);

		expect(origin.x).toBe(116);
		expect(origin.y).toBe(40 + 16);
		expect(origin.radius).toBe(themeClipRadius(origin.x, origin.y, viewport));
	});
});

describe("themeClipRadius", () => {
	it("covers the farthest viewport corner from the origin", () => {
		expect(themeClipRadius(100, 50, { width: 1000, height: 800 })).toBe(Math.hypot(900, 750));
	});
});

describe("canTransitionTheme", () => {
	afterEach(() => {
		vi.unstubAllGlobals();
		vi.restoreAllMocks();
	});

	it("returns false when startViewTransition is missing", () => {
		vi.stubGlobal("document", {});
		vi.stubGlobal("window", {
			matchMedia: () => ({ matches: false }),
		});

		expect(canTransitionTheme()).toBe(false);
	});

	it("returns false when reduced motion is preferred", () => {
		vi.stubGlobal("document", { startViewTransition: vi.fn() });
		vi.stubGlobal("window", {
			matchMedia: () => ({ matches: true }),
		});

		expect(canTransitionTheme()).toBe(false);
	});

	it("returns true when View Transitions are available and motion is allowed", () => {
		vi.stubGlobal("document", { startViewTransition: vi.fn() });
		vi.stubGlobal("window", {
			matchMedia: () => ({ matches: false }),
		});

		expect(canTransitionTheme()).toBe(true);
	});
});

describe("applyThemeClipVars", () => {
	it("writes clip CSS variables and data-theme-clip onto the root", () => {
		const setProperty = vi.fn();
		const setAttribute = vi.fn();
		const root = { style: { setProperty }, setAttribute } as unknown as HTMLElement;

		applyThemeClipVars({ x: 10, y: 20, radius: 900 }, "light", root);

		expect(setProperty).toHaveBeenCalledWith("--theme-clip-x", "10px");
		expect(setProperty).toHaveBeenCalledWith("--theme-clip-y", "20px");
		expect(setProperty).toHaveBeenCalledWith("--theme-clip-r", "900px");
		expect(setAttribute).toHaveBeenCalledWith("data-theme-clip", "light");
	});
});

describe("clearThemeClipVars", () => {
	it("removes clip CSS variables and data-theme-clip from the root", () => {
		const removeProperty = vi.fn();
		const removeAttribute = vi.fn();
		const root = {
			style: { removeProperty },
			removeAttribute,
		} as unknown as HTMLElement;

		clearThemeClipVars(root);

		expect(removeProperty).toHaveBeenCalledWith("--theme-clip-x");
		expect(removeProperty).toHaveBeenCalledWith("--theme-clip-y");
		expect(removeProperty).toHaveBeenCalledWith("--theme-clip-r");
		expect(removeAttribute).toHaveBeenCalledWith("data-theme-clip");
	});
});
