"use client";

import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { ThemeContext, type ThemeModeTransitionOrigin } from "@/components/common/theme-context";
import { THEME_STORAGE_KEY } from "@/config/theme";
import {
	applyThemeClipVars,
	applyThemeMode,
	canTransitionTheme,
	clearThemeClipVars,
	parseStoredMode,
	readThemeMode,
	writeStoredMode,
} from "@/lib/theme";
import type { ThemeMode } from "@/schemas/theme";

type ThemeProviderProps = {
	children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
	// The server renders day; the init script has already set the real mode on <html>.
	const [mode, setMode] = useState<ThemeMode>("light");
	const modeRef = useRef(mode);
	const transitionActiveRef = useRef(false);

	useEffect(() => {
		const current = readThemeMode();
		modeRef.current = current;
		setMode(current);

		function onStorage(event: StorageEvent) {
			if (event.key !== THEME_STORAGE_KEY) {
				return;
			}

			const next = parseStoredMode(event.newValue);
			if (next != null) {
				modeRef.current = next;
				applyThemeMode(next);
				setMode(next);
			}
		}

		window.addEventListener("storage", onStorage);

		return () => {
			window.removeEventListener("storage", onStorage);
		};
	}, []);

	const commit = useCallback((next: ThemeMode) => {
		modeRef.current = next;
		flushSync(() => {
			applyThemeMode(next);
			writeStoredMode(next);
			setMode(next);
		});
	}, []);

	const toggleMode = useCallback(
		(origin?: ThemeModeTransitionOrigin) => {
			if (transitionActiveRef.current) {
				return;
			}

			const next: ThemeMode = modeRef.current === "dark" ? "light" : "dark";

			if (origin == null || !canTransitionTheme()) {
				commit(next);
				return;
			}

			applyThemeClipVars(origin, next);
			transitionActiveRef.current = true;

			const transition = document.startViewTransition(() => {
				commit(next);
			});

			void transition.finished.finally(() => {
				clearThemeClipVars();
				transitionActiveRef.current = false;
			});
		},
		[commit],
	);

	const value = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode]);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
