import { createContext } from "react";
import type { NeutralId, PrimaryId, ThemeMode, ThemePreference } from "@/schemas/theme";

export type ThemeContextValue = {
	theme: ThemePreference;
	setPrimary: (primary: PrimaryId) => void;
	setNeutral: (neutral: NeutralId) => void;
	setMode: (mode: ThemeMode) => void;
	toggleMode: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);
