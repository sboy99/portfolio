"use client";

import { MoonIcon, SunIcon } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
	const { theme, toggleMode } = useTheme();
	const nextMode = theme.mode === "dark" ? "light" : "dark";

	return (
		<Button className="size-8 px-0" onClick={toggleMode} variant="ghost">
			{theme.mode === "dark" ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
			<span className="sr-only">Switch to {nextMode} mode</span>
		</Button>
	);
}
