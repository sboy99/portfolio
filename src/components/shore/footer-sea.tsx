"use client";

import { useEffect, useMemo } from "react";
import { AsciiRows } from "@/components/shore/ascii-rows";
import { useMotion } from "@/components/shore/motion";
import { useSound } from "@/components/shore/sound";
import { useBand } from "@/components/shore/use-band";
import { CHAR_W, ROW_H, seaFrame, seaVessels, shipHornAt } from "@/lib/shore/engine";

const CONTROL =
	"relative inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-line font-sans text-[12px] leading-none transition-colors duration-200 after:absolute after:-inset-1 hover:border-accent hover:text-accent";

/** A small speaker, with sound waves when on and a cross when muted. */
function SpeakerIcon({ on }: { on: boolean }) {
	return (
		<svg aria-hidden="true" fill="none" height="14" viewBox="0 0 16 16" width="14">
			<path d="M2 6h2.5L8 3v10L4.5 10H2z" fill="currentColor" />
			{on ? (
				<path
					d="M10.5 5.5a3.5 3.5 0 0 1 0 5M12.5 3.5a6.3 6.3 0 0 1 0 9"
					stroke="currentColor"
					strokeLinecap="round"
					strokeWidth="1.3"
				/>
			) : (
				<path
					d="M10.5 6l4 4M14.5 6l-4 4"
					stroke="currentColor"
					strokeLinecap="round"
					strokeWidth="1.3"
				/>
			)}
		</svg>
	);
}

/** A musical note, struck through when the piano is off. */
function NoteIcon({ on }: { on: boolean }) {
	return (
		<svg aria-hidden="true" fill="none" height="14" viewBox="0 0 16 16" width="14">
			<path
				d="M6 12V3.5l7-1.5v8.5"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeWidth="1.3"
			/>
			<circle cx="4.5" cy="12" fill="currentColor" r="2" />
			<circle cx="11.5" cy="10.5" fill="currentColor" r="2" />
			{on ? null : (
				<path d="M2 2l12 12" stroke="currentColor" strokeLinecap="round" strokeWidth="1.3" />
			)}
		</svg>
	);
}

/** The sea at the foot of every page, with the play/pause control for all motion and the sound and music toggles. */
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
	const { soundOn, musicOn, toggleSound, toggleMusic, horn } = useSound();

	// The mini ship sounds its horn once on each crossing.
	useEffect(() => {
		if (!paused && shipHornAt(layout, tick)) horn();
	}, [layout, tick, paused, horn]);
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
						className="vessel pointer-events-none absolute top-0 left-0 origin-bottom will-change-transform"
						key={v.id}
						style={{
							transform: `translate(${v.x * CHAR_W}px, ${v.y * ROW_H}px) rotate(${v.tilt}deg) scale(${v.scale})`,
							transition: v.wrapped || paused ? "none" : "transform 140ms linear",
						}}
					>
						<AsciiRows rows={v.rows} />
					</div>
				))}
			</div>
			<div className="type-meta mx-auto flex w-full max-w-[960px] flex-wrap items-center justify-between gap-4 px-5 pt-[18px] pb-[22px] text-muted lg:px-0">
				<span>© 2026 Sagar Bera · Bengaluru · set in Newsreader &amp; Geist Mono</span>
				<div className="flex items-center gap-2">
					<button
						aria-label="Piano music"
						aria-pressed={musicOn}
						className={CONTROL}
						onClick={toggleMusic}
						title={musicOn ? "Stop the piano" : "Play gentle piano"}
						type="button"
					>
						<NoteIcon on={musicOn} />
					</button>
					<button
						aria-label="Shore sound"
						aria-pressed={soundOn}
						className={CONTROL}
						onClick={toggleSound}
						title={soundOn ? "Mute the shore" : "Hear the shore"}
						type="button"
					>
						<SpeakerIcon on={soundOn} />
					</button>
					<button
						aria-label={label}
						className={CONTROL}
						onClick={togglePaused}
						style={{ textIndent: paused ? 2 : 0 }}
						title={label}
						type="button"
					>
						{paused ? "▶" : "❚❚"}
					</button>
				</div>
			</div>
		</footer>
	);
}
