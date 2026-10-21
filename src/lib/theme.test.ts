import { afterEach, describe, expect, it, vi } from "vitest";
import {
	applyThemeClipVars,
	applyThemeMode,
	canTransitionTheme,
	clearThemeClipVars,
	parseStoredMode,
	readThemeMode,
	THEME_CLIP_Y_OFFSET_LIGHT,
	themeClipOrigin,
	themeClipRadius,
} from "./theme";

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
