"use client";

import { useContext } from "react";
import { ThemeContext, type ThemeContextValue } from "@/components/common/theme-context";

export function useTheme(): ThemeContextValue {
	const context = useContext(ThemeContext);

	if (context == null) {
		throw new Error("useTheme must be used within ThemeProvider");
	}

	return context;
}
