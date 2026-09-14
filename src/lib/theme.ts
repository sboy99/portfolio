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
