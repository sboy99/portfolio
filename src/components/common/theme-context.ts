import { createContext } from "react";
import type { ThemeMode } from "@/schemas/theme";

export type ThemeContextValue = {
	mode: ThemeMode;
	toggleMode: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);
