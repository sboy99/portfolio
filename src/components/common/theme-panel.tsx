"use client";

import { PaletteIcon } from "@/components/common/icons";
import { SwatchGrid } from "@/components/common/swatch-grid";
import { Button } from "@/components/ui/button";
import { NEUTRAL_OPTIONS, PRIMARY_OPTIONS } from "@/config/theme";
import { useTheme } from "@/hooks/use-theme";

const PANEL_ID = "theme-panel";

export function ThemePanel() {
	const { theme, setPrimary, setNeutral } = useTheme();

	return (
		<>
			<Button
				aria-haspopup="dialog"
				className="size-8 px-0"
				popoverTarget={PANEL_ID}
				popoverTargetAction="toggle"
				variant="ghost"
			>
				<PaletteIcon className="size-4" />
				<span className="sr-only">Customize theme</span>
			</Button>
			<div
				className="m-0 w-72 rounded-md border border-border bg-card p-3 text-foreground shadow-none"
				id={PANEL_ID}
				popover="auto"
				style={{ inset: "auto", position: "fixed", right: "1rem", top: "3.25rem" }}
			>
				<div className="space-y-4">
					<SwatchGrid
						label="Primary"
						onChange={setPrimary}
						options={PRIMARY_OPTIONS}
						value={theme.primary}
					/>
					<SwatchGrid
						label="Neutral"
						onChange={setNeutral}
						options={NEUTRAL_OPTIONS}
						value={theme.neutral}
					/>
				</div>
			</div>
		</>
	);
}
