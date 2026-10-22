"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createSurf, parseStoredSound, SOUND_STORAGE_KEY, type Surf } from "@/lib/shore/surf";

function readStored(): boolean {
	try {
		return parseStoredSound(window.localStorage.getItem(SOUND_STORAGE_KEY));
	} catch {
		return false;
	}
}

function writeStored(on: boolean): void {
	try {
		window.localStorage.setItem(SOUND_STORAGE_KEY, on ? "on" : "off");
	} catch {
		// Private windows can refuse storage; the toggle still works for this visit.
	}
}

/**
 * The shore sound. Off by default; browsers only let audio start from a tap or
 * key press, so a visitor who left it on hears it again from their first one.
 * It falls quiet while the waves are paused.
 */
export function useShoreSound(paused: boolean) {
	const [on, setOn] = useState(false);
	const surfRef = useRef<Surf | null>(null);
	const ctxRef = useRef<AudioContext | null>(null);

	const ensure = useCallback((): Surf | null => {
		if (surfRef.current) return surfRef.current;
		if (typeof window.AudioContext !== "function") return null;
		const ctx = new AudioContext();
		ctxRef.current = ctx;
		surfRef.current = createSurf(ctx);
		return surfRef.current;
	}, []);

	useEffect(() => {
		if (!readStored()) return;
		setOn(true);
	}, []);

	// Start or fade on every change; resume needs a gesture, which the toggle or first tap gives.
	useEffect(() => {
		const playing = on && !paused;
		if (!playing && !surfRef.current) return;

		const start = () => {
			const surf = ensure();
			if (!surf) return;
			void ctxRef.current?.resume();
			surf.setPlaying(playing);
		};

		start();
		if (!playing || ctxRef.current?.state === "running") return;

		const events = ["pointerdown", "keydown"] as const;
		const onGesture = () => {
			start();
			for (const e of events) window.removeEventListener(e, onGesture);
		};
		for (const e of events) window.addEventListener(e, onGesture);
		return () => {
			for (const e of events) window.removeEventListener(e, onGesture);
		};
	}, [on, paused, ensure]);

	useEffect(
		() => () => {
			surfRef.current?.close();
			surfRef.current = null;
		},
		[],
	);

	const toggle = useCallback(() => {
		setOn((was) => {
			writeStored(!was);
			return !was;
		});
	}, []);

	return { soundOn: on, toggleSound: toggle };
}
