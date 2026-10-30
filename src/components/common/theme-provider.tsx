"use client";

import { type ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "@/components/common/theme-context";
import { THEME_STORAGE_KEY } from "@/config/theme";
import { applyThemeMode, parseStoredMode, readThemeMode, writeStoredMode } from "@/lib/theme";
import type { ThemeMode } from "@/schemas/theme";

type ThemeProviderProps = {
	children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
	// The server renders day; the init script has already set the real mode on <html>.
	const [mode, setMode] = useState<ThemeMode>("light");

	useEffect(() => {
		setMode(readThemeMode());

		function onStorage(event: StorageEvent) {
			if (event.key !== THEME_STORAGE_KEY) {
				return;
			}

			const next = parseStoredMode(event.newValue);
			if (next != null) {
				applyThemeMode(next);
				setMode(next);
			}
		}

		window.addEventListener("storage", onStorage);

		return () => {
			window.removeEventListener("storage", onStorage);
		};
	}, []);

	const toggleMode = useCallback(() => {
		const next: ThemeMode = readThemeMode() === "dark" ? "light" : "dark";
		applyThemeMode(next);
		writeStoredMode(next);
		setMode(next);
	}, []);

	const value = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode]);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
