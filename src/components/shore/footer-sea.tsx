"use client";

import { useMemo } from "react";
import { AsciiRows } from "@/components/shore/ascii-rows";
import { useMotion } from "@/components/shore/motion";
import { useBand } from "@/components/shore/use-band";
import { CHAR_W, ROW_H, seaFrame, seaVessels } from "@/lib/shore/engine";

/** The sea at the foot of every page, with the play/pause control for all motion. */
export function FooterSea() {
	const { tick, paused, togglePaused } = useMotion();
	const { ref, layout, mode, ripples, rt, onTap } = useBand(0, 5);

	const rows = useMemo(
		() => seaFrame({ layout, tick, mode, ripples, rt }),
		[layout, tick, mode, ripples, rt],
	);
	const vessels = useMemo(() => {
		const prev = new Map(seaVessels(layout, tick - 1).map((v) => [v.id, v.x]));
		return seaVessels(layout, tick).map((v) => ({
			...v,
			// A boat that just wrapped round jumps straight to its new side instead of gliding across.
			wrapped: Math.abs(v.x - (prev.get(v.id) ?? v.x)) > 3,
		}));
	}, [layout, tick]);
	const label = paused ? "Play waves" : "Pause waves";

	return (
		<footer className="mt-12">
			<div
				aria-hidden="true"
				className="ascii relative cursor-pointer select-none overflow-hidden"
				onClick={onTap}
				ref={ref}
				title="tap the water"
			>
				<AsciiRows rows={rows} />
				{vessels.map((v) => (
					<div
						className="pointer-events-none absolute top-0 left-0 origin-bottom will-change-transform"
						key={v.id}
						style={{
							transform: `translate(${v.x * CHAR_W}px, ${v.y * ROW_H}px) rotate(${v.tilt}deg)`,
							transition: v.wrapped || paused ? "none" : "transform 140ms linear",
						}}
					>
						<AsciiRows rows={v.rows} />
					</div>
				))}
			</div>
			<div className="type-meta mx-auto flex w-full max-w-[960px] flex-wrap items-center justify-between gap-4 px-5 pt-[18px] pb-[22px] text-muted lg:px-0">
				<span>© 2026 Sagar Bera · Bengaluru · set in Newsreader &amp; Geist Mono</span>
				<button
					aria-label={label}
					className="relative inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-line font-sans text-[12px] leading-none transition-colors duration-200 after:absolute after:-inset-1 hover:border-accent hover:text-accent"
					onClick={togglePaused}
					style={{ textIndent: paused ? 2 : 0 }}
					title={label}
					type="button"
				>
					{paused ? "▶" : "❚❚"}
				</button>
			</div>
		</footer>
	);
}
