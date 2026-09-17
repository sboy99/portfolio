"use client";

import { type CSSProperties, useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export const START_DELAY_MS = 700;

const BASE_LEFTS = [
	// dense cluster (left)
	"10%",
	"12%",
	"14%",
	"16%",
	// sparse mid (current-like open spacing)
	"32%",
	"48%",
	"64%",
	// dense cluster (right)
	"82%",
	"84%",
	"86%",
] as const;

type Beam = {
	left: string;
	delay: string;
	duration: string;
	wide: boolean;
};

function formatSeconds(value: number): string {
	return `${value.toFixed(2)}s`;
}

export function createBeams(): Beam[] {
	return BASE_LEFTS.map((left, index) => ({
		left,
		delay: formatSeconds(0.2 + Math.random() * 2.6),
		duration: formatSeconds(2.4 + Math.random() * 2.2),
		wide: index % 2 === 1,
	}));
}

export function HeroBeam() {
	const [beams, setBeams] = useState<Beam[] | null>(null);

	useEffect(() => {
		const timer = window.setTimeout(() => {
			setBeams(createBeams());
		}, START_DELAY_MS);

		return () => {
			window.clearTimeout(timer);
		};
	}, []);

	return (
		<div
			aria-hidden
			className={cn(
				"pointer-events-none absolute inset-x-0 -top-6 -z-10 overflow-hidden",
				"beam-grid mask-b-from-20% h-40 [--beam-grid-gap:0.5rem] [--beam-travel:100%]",
				"sm:h-52",
			)}
		>
			{beams?.map((beam) => (
				<span
					key={beam.left}
					className={cn(
						"absolute inset-y-0 w-px",
						"left-[round(down,var(--beam-left),var(--beam-grid-gap))]",
						beam.wide && "hidden sm:block",
					)}
					style={{ "--beam-left": beam.left } as CSSProperties}
				>
					<span
						className={cn(
							"animate-beam-fall absolute inset-x-0 top-0 h-full origin-center scale-x-50",
							"bg-linear-to-b from-transparent via-accent/40 to-transparent",
							"motion-reduce:hidden",
						)}
						style={{
							animationDelay: beam.delay,
							animationDuration: beam.duration,
						}}
					/>
				</span>
			))}
		</div>
	);
}
