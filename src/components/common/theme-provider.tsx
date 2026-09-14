"use client";

import { type ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "@/components/common/theme-context";
import { DEFAULT_THEME, THEME_STORAGE_KEY } from "@/config/theme";
import {
	applyTheme,
	readStoredTheme,
	withMode,
	withNeutral,
	withPrimary,
	writeStoredTheme,
} from "@/lib/theme";
import type { NeutralId, PrimaryId, ThemeMode, ThemePreference } from "@/schemas/theme";

type ThemeProviderProps = {
	children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
	const [theme, setTheme] = useState<ThemePreference>(DEFAULT_THEME);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const stored = readStoredTheme();
		setTheme(stored);
		applyTheme(stored);
		setReady(true);
	}, []);

	useEffect(() => {
		if (!ready) {
			return;
		}

		applyTheme(theme);
		writeStoredTheme(theme);
	}, [ready, theme]);

	useEffect(() => {
		function onStorage(event: StorageEvent) {
			if (event.key !== THEME_STORAGE_KEY) {
				return;
			}

			const next = readStoredTheme();
			setTheme(next);
			applyTheme(next);
		}

		window.addEventListener("storage", onStorage);

		return () => {
			window.removeEventListener("storage", onStorage);
		};
	}, []);

	const setPrimary = useCallback((primary: PrimaryId) => {
		setTheme((current) => withPrimary(current, primary));
	}, []);

	const setNeutral = useCallback((neutral: NeutralId) => {
		setTheme((current) => withNeutral(current, neutral));
	}, []);

	const setMode = useCallback((mode: ThemeMode) => {
		setTheme((current) => withMode(current, mode));
	}, []);

	const toggleMode = useCallback(() => {
		setTheme((current) => withMode(current, current.mode === "dark" ? "light" : "dark"));
	}, []);

	const value = useMemo(
		() => ({
			theme,
			setPrimary,
			setNeutral,
			setMode,
			toggleMode,
		}),
		[setMode, setNeutral, setPrimary, theme, toggleMode],
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
