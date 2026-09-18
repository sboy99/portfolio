import { createContext } from "react";
import type { ThemeClipOrigin } from "@/lib/theme";
import type { NeutralId, PrimaryId, ThemeMode, ThemePreference } from "@/schemas/theme";

export type ThemeModeTransitionOrigin = ThemeClipOrigin;

export type ThemeContextValue = {
	theme: ThemePreference;
	setPrimary: (primary: PrimaryId) => void;
	setNeutral: (neutral: NeutralId) => void;
	setMode: (mode: ThemeMode) => void;
	toggleMode: (origin?: ThemeModeTransitionOrigin) => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);
