"use client";

import { useMotion } from "@/components/shore/motion";
import { WaveRule } from "@/components/shore/wave-rule";
import { cn } from "@/lib/cn";

const BOAT = [" |\\", "_|_\\", "\\__/"];

/** A double wave with a small boat bobbing on it, drifting a little back and forth. */
export function BoatWave({ seeds, className }: { seeds: readonly number[]; className?: string }) {
	const { tick } = useMotion();
	const drift = 62 + 6 * Math.sin(tick * 0.015);
	const bob = 1.5 * Math.sin(tick * 0.22);
	const tilt = 3 * Math.sin(tick * 0.17);

	return (
		<div aria-hidden="true" className={cn("relative pt-[28px]", className)}>
			<WaveRule seeds={seeds} />
			<div
				className="wave absolute top-0 bg-bg px-[2px]"
				style={{
					left: `${drift}%`,
					color: "var(--boat)",
					transform: `translateY(${bob}px) rotate(${tilt}deg)`,
					transformOrigin: "50% 100%",
					transition: "transform 140ms linear, left 140ms linear",
				}}
			>
				{BOAT.map((line) => (
					<div key={line}>{line}</div>
				))}
			</div>
		</div>
	);
}
