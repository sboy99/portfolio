"use client";

import { type MouseEvent, useMemo } from "react";
import { AsciiRows } from "@/components/shore/ascii-rows";
import { useMotion } from "@/components/shore/motion";
import { useBand } from "@/components/shore/use-band";
import { useTheme } from "@/hooks/use-theme";
import { CHAR_W, HORIZON_ROW, horizonFrame, shipMotion, shipRows } from "@/lib/shore/engine";
import { themeClipOrigin } from "@/lib/theme";

const PAD_TOP = 20;
const SHIP = shipRows();

/** The sky, sun and sea across the top of every page. The sun switches day and dusk. */
export function HorizonBand() {
	const { tick } = useMotion();
	const { toggleMode } = useTheme();
	const { ref, layout, mode, ripples, rt, onTap } = useBand(PAD_TOP, HORIZON_ROW + 1);

	const rows = useMemo(
		() => horizonFrame({ layout, tick, mode, ripples, rt }),
		[layout, tick, mode, ripples, rt],
	);
	const ship = shipMotion(tick);
	const nextLabel = mode === "day" ? "Switch to dusk (dark theme)" : "Switch to day (light theme)";

	function onSun(event: MouseEvent<HTMLButtonElement>) {
		const rect = event.currentTarget.getBoundingClientRect();
		toggleMode(
			themeClipOrigin(rect, mode === "day" ? "dark" : "light", {
				width: window.innerWidth,
				height: window.innerHeight,
			}),
		);
	}

	return (
		<div className="relative">
			<div
				aria-hidden="true"
				className="ascii relative cursor-pointer select-none"
				onClick={onTap}
				ref={ref}
				style={{ paddingTop: PAD_TOP }}
				title="tap the water"
			>
				<div
					className="pointer-events-none absolute"
					style={{
						top: PAD_TOP,
						left: layout.shipC * CHAR_W,
						transform: `translateY(${ship.y}px) rotate(${ship.tilt}deg)`,
						transformOrigin: "50% 90%",
						transition: "transform 160ms linear",
					}}
				>
					<AsciiRows rows={SHIP} />
				</div>
				<AsciiRows rows={rows} />
			</div>
			<button
				aria-label={nextLabel}
				className="absolute h-[84px] w-[136px] cursor-pointer rounded-full"
				onClick={onSun}
				style={{ top: PAD_TOP, left: (layout.sunC - 8.7) * CHAR_W }}
				title={nextLabel}
				type="button"
			/>
		</div>
	);
}
