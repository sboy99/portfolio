"use client";

import { useMotion } from "@/components/shore/motion";
import { cn } from "@/lib/cn";
import { wakeLine } from "@/lib/shore/engine";

type WaveRuleProps = {
	/** One line per seed; each seed gives its line its own phase. */
	seeds?: readonly number[];
	length?: number;
	className?: string;
};

/** A moving wave used wherever the design would otherwise draw a rule. */
export function WaveRule({ seeds = [4], length = 110, className }: WaveRuleProps) {
	const { tick } = useMotion();

	return (
		<div aria-hidden="true" className={cn("wave", className)}>
			{seeds.map((seed) => (
				<div key={seed}>{wakeLine(seed, length, tick)}</div>
			))}
		</div>
	);
}
