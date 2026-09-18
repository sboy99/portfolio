import { DEFAULT_THEME, THEME_STORAGE_KEY } from "@/config/theme";
import {
	type NeutralId,
	type PrimaryId,
	type ThemeMode,
	type ThemePreference,
	themePreferenceSchema,
} from "@/schemas/theme";

export function parseStoredTheme(raw: string | null): ThemePreference {
	if (raw == null || raw === "") {
		return DEFAULT_THEME;
	}

	try {
		const parsed: unknown = JSON.parse(raw);
		const result = themePreferenceSchema.safeParse(parsed);

		if (!result.success) {
			return DEFAULT_THEME;
		}

		return result.data;
	} catch {
		return DEFAULT_THEME;
	}
}

export function themeAttributes(theme: ThemePreference): {
	"data-theme": ThemeMode;
	"data-primary": PrimaryId;
	"data-neutral": NeutralId;
} {
	return {
		"data-theme": theme.mode,
		"data-primary": theme.primary,
		"data-neutral": theme.neutral,
	};
}

export function withPrimary(theme: ThemePreference, primary: PrimaryId): ThemePreference {
	return { ...theme, primary };
}

export function withNeutral(theme: ThemePreference, neutral: NeutralId): ThemePreference {
	return { ...theme, neutral };
}

export function withMode(theme: ThemePreference, mode: ThemeMode): ThemePreference {
	return { ...theme, mode };
}

export function readStoredTheme(): ThemePreference {
	if (typeof window === "undefined") {
		return DEFAULT_THEME;
	}

	try {
		return parseStoredTheme(window.localStorage.getItem(THEME_STORAGE_KEY));
	} catch {
		return DEFAULT_THEME;
	}
}

export function writeStoredTheme(theme: ThemePreference): void {
	if (typeof window === "undefined") {
		return;
	}

	try {
		window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
	} catch {
		// localStorage can throw in private mode or when quota is exceeded.
	}
}

export function applyTheme(
	theme: ThemePreference,
	root: HTMLElement = document.documentElement,
): void {
	const attributes = themeAttributes(theme);

	root.setAttribute("data-theme", attributes["data-theme"]);
	root.setAttribute("data-primary", attributes["data-primary"]);
	root.setAttribute("data-neutral", attributes["data-neutral"]);
}

/** Vertical bias (px) below toggle center when revealing light mode. */
export const THEME_CLIP_Y_OFFSET_LIGHT = 16;
export const THEME_CLIP_Y_OFFSET = THEME_CLIP_Y_OFFSET_LIGHT;

export type ThemeClipOrigin = {
	x: number;
	y: number;
	radius: number;
};

export type ThemeClipRect = {
	left: number;
	top: number;
	width: number;
	height: number;
};

export type ThemeClipViewport = {
	width: number;
	height: number;
};

/**
 * Circle origin for the theme reveal. Light blooms from below the button
 * center; dark collapses into the button center (slightly above the bottom edge).
 */
export function themeClipOrigin(
	rect: ThemeClipRect,
	nextMode: ThemeMode,
	viewport: ThemeClipViewport,
): ThemeClipOrigin {
	const x = rect.left + rect.width / 2;
	const centerY = rect.top + rect.height / 2;
	const y = nextMode === "light" ? centerY + THEME_CLIP_Y_OFFSET_LIGHT : centerY;
	const radius = themeClipRadius(x, y, viewport);

	return { x, y, radius };
}

export function themeClipRadius(x: number, y: number, viewport: ThemeClipViewport): number {
	return Math.hypot(Math.max(x, viewport.width - x), Math.max(y, viewport.height - y));
}

export function canTransitionTheme(): boolean {
	if (typeof document === "undefined" || typeof window === "undefined") {
		return false;
	}

	if (!("startViewTransition" in document)) {
		return false;
	}

	return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function applyThemeClipVars(
	origin: ThemeClipOrigin,
	nextMode: ThemeMode,
	root: HTMLElement = document.documentElement,
): void {
	root.style.setProperty("--theme-clip-x", `${origin.x}px`);
	root.style.setProperty("--theme-clip-y", `${origin.y}px`);
	root.style.setProperty("--theme-clip-r", `${origin.radius}px`);
	root.setAttribute("data-theme-clip", nextMode);
}

export function clearThemeClipVars(root: HTMLElement = document.documentElement): void {
	root.style.removeProperty("--theme-clip-x");
	root.style.removeProperty("--theme-clip-y");
	root.style.removeProperty("--theme-clip-r");
	root.removeAttribute("data-theme-clip");
}
