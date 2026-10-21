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
