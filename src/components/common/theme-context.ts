import { createContext } from "react";
import type { ThemeClipOrigin } from "@/lib/theme";
import type { ThemeMode } from "@/schemas/theme";

export type ThemeModeTransitionOrigin = ThemeClipOrigin;

export type ThemeContextValue = {
	mode: ThemeMode;
	toggleMode: (origin?: ThemeModeTransitionOrigin) => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);
