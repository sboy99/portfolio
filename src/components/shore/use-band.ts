"use client";

import { type MouseEvent, type RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useClock } from "@/components/shore/motion";
import { useTheme } from "@/hooks/use-theme";
import {
	type BandLayout,
	bandLayout,
	DEFAULT_LAYOUT,
	MAX_RIPPLES,
	RIPPLE_LIFETIME,
	type Ripple,
	type ShoreMode,
	tapCell,
} from "@/lib/shore/engine";

type Band = {
	ref: RefObject<HTMLDivElement | null>;
	layout: BandLayout;
	mode: ShoreMode;
	ripples: Ripple[];
	rt: number;
	onTap: (event: MouseEvent<HTMLDivElement>) => void;
};

/**
 * Shared wiring for an ASCII band: measures its width into columns, follows
 * the theme, and turns taps into ripples. `padTop` is the band's top padding
 * in pixels; `minRow` keeps ripples in the water.
 */
export function useBand(padTop: number, minRow: number): Band {
	const ref = useRef<HTMLDivElement>(null);
	const [layout, setLayout] = useState(DEFAULT_LAYOUT);
	const [ripples, setRipples] = useState<Ripple[]>([]);
	const { mode } = useTheme();
	const { rt, wake } = useClock();

	useEffect(() => {
		const el = ref.current;
		if (el == null) return;
		const observer = new ResizeObserver(([entry]) => {
			const next = bandLayout(entry.contentRect.width);
			setLayout((prev) => (prev.cols === next.cols && prev.sunC === next.sunC ? prev : next));
		});
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	const onTap = useCallback(
		(event: MouseEvent<HTMLDivElement>) => {
			const rect = event.currentTarget.getBoundingClientRect();
			const cell = tapCell(event.clientX - rect.left, event.clientY - rect.top - padTop, minRow);
			setRipples((prev) =>
				[...prev.filter((q) => rt - q.t0 < RIPPLE_LIFETIME), { ...cell, t0: rt }].slice(
					-MAX_RIPPLES,
				),
			);
			wake();
		},
		[minRow, padTop, rt, wake],
	);

	return { ref, layout, mode: mode === "dark" ? "dusk" : "day", ripples, rt, onTap };
}
