"use client";

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { RIPPLE_LIFETIME } from "@/lib/shore/engine";

/** One clock for the whole page: every band and wave moves on this beat. */
export const TICK_MS = 140;

type MotionValue = {
	/** Advances only while playing; drives waves, clouds, boats. */
	tick: number;
	paused: boolean;
	togglePaused: () => void;
};

type ClockValue = {
	/** Always advances while a ripple is alive, even when paused. */
	rt: number;
	/** Keeps the clock running long enough for a new ripple to finish. */
	wake: () => void;
};

const MotionContext = createContext<MotionValue>({ tick: 0, paused: true, togglePaused: () => {} });
const ClockContext = createContext<ClockValue>({ rt: 0, wake: () => {} });

export function MotionProvider({ children }: { children: ReactNode }) {
	const [clock, setClock] = useState({ tick: 0, rt: 0 });
	const [paused, setPaused] = useState(false);
	const pausedRef = useRef(paused);
	const aliveUntilRef = useRef(0);
	const rtRef = useRef(0);

	useEffect(() => {
		pausedRef.current = paused;
	}, [paused]);

	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			pausedRef.current = true;
			setPaused(true);
		}
	}, []);

	useEffect(() => {
		let timer: number | undefined;

		const step = () => {
			const playing = !pausedRef.current;
			if (!playing && rtRef.current >= aliveUntilRef.current) {
				return;
			}
			rtRef.current += 1;
			setClock((c) => ({ tick: playing ? c.tick + 1 : c.tick, rt: c.rt + 1 }));
		};

		const start = () => {
			if (timer == null) timer = window.setInterval(step, TICK_MS);
		};
		const stop = () => {
			if (timer != null) window.clearInterval(timer);
			timer = undefined;
		};
		const onVisibility = () => (document.hidden ? stop() : start());

		start();
		document.addEventListener("visibilitychange", onVisibility);

		return () => {
			stop();
			document.removeEventListener("visibilitychange", onVisibility);
		};
	}, []);

	const togglePaused = useCallback(() => setPaused((p) => !p), []);
	const wake = useCallback(() => {
		aliveUntilRef.current = rtRef.current + RIPPLE_LIFETIME;
	}, []);

	const motion = useMemo(
		() => ({ tick: clock.tick, paused, togglePaused }),
		[clock.tick, paused, togglePaused],
	);
	const clockValue = useMemo(() => ({ rt: clock.rt, wake }), [clock.rt, wake]);

	return (
		<MotionContext.Provider value={motion}>
			<ClockContext.Provider value={clockValue}>{children}</ClockContext.Provider>
		</MotionContext.Provider>
	);
}

export function useMotion(): MotionValue {
	return useContext(MotionContext);
}

export function useClock(): ClockValue {
	return useContext(ClockContext);
}
