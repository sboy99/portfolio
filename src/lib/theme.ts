import { THEME_STORAGE_KEY } from "@/config/theme";
import { type ThemeMode, themeModeSchema } from "@/schemas/theme";

/**
 * Reads a stored mode. Accepts the plain "light"/"dark" string and the older
 * JSON preference object, so returning visitors keep their choice.
 */
export function parseStoredMode(raw: string | null): ThemeMode | null {
	if (raw == null || raw === "") {
		return null;
	}

	const direct = themeModeSchema.safeParse(raw);
	if (direct.success) {
		return direct.data;
	}

	try {
		const parsed: unknown = JSON.parse(raw);
		const mode = themeModeSchema.safeParse(
			parsed != null && typeof parsed === "object" && "mode" in parsed ? parsed.mode : null,
		);
		return mode.success ? mode.data : null;
	} catch {
		return null;
	}
}

export function readThemeMode(root: HTMLElement = document.documentElement): ThemeMode {
	return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

export function writeStoredMode(mode: ThemeMode): void {
	try {
		window.localStorage.setItem(THEME_STORAGE_KEY, mode);
	} catch {
		// localStorage can throw in private mode or when quota is exceeded.
	}
}

export function applyThemeMode(
	mode: ThemeMode,
	root: HTMLElement = document.documentElement,
): void {
	root.setAttribute("data-theme", mode);
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
