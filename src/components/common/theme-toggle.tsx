"use client";

import { useRef } from "react";
import { MoonIcon, SunIcon } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { themeClipOrigin } from "@/lib/theme";

export function ThemeToggle() {
	const { theme, toggleMode } = useTheme();
	const buttonRef = useRef<HTMLButtonElement>(null);
	const nextMode = theme.mode === "dark" ? "light" : "dark";

	function handleClick() {
		const button = buttonRef.current;

		if (button == null) {
			toggleMode();
			return;
		}

		const rect = button.getBoundingClientRect();
		const origin = themeClipOrigin(
			{ left: rect.left, top: rect.top, width: rect.width, height: rect.height },
			nextMode,
			{ width: window.innerWidth, height: window.innerHeight },
		);

		toggleMode(origin);
	}

	return (
		<Button
			ref={buttonRef}
			className="theme-toggle size-8 px-0"
			onClick={handleClick}
			variant="ghost"
		>
			{theme.mode === "dark" ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
			<span className="sr-only">Switch to {nextMode} mode</span>
		</Button>
	);
}
