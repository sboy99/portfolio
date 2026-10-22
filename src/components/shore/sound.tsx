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
import { useMotion } from "@/components/shore/motion";
import { createPiano, type Piano } from "@/lib/shore/piano";
import { FAR_HORN, type HornVoice, loadHorn, NEAR_HORN, playDrop, playHorn } from "@/lib/shore/sfx";
import {
	createSurf,
	MUSIC_STORAGE_KEY,
	parseStoredSound,
	SOUND_STORAGE_KEY,
	type Surf,
} from "@/lib/shore/surf";

type SoundValue = {
	soundOn: boolean;
	musicOn: boolean;
	toggleSound: () => void;
	toggleMusic: () => void;
	/** A drop where the water was tapped; silent unless sound is on. */
	drop: () => void;
	/** The mini ship's two blasts; silent unless sound is on. */
	horn: () => void;
	/** The big ship's horn when tapped, at most once every five seconds; silent unless sound is on. */
	bigHorn: () => void;
};

/** How long the big ship waits before it will sound again. */
export const BIG_HORN_COOLDOWN_MS = 5000;

const SoundContext = createContext<SoundValue>({
	soundOn: false,
	musicOn: false,
	toggleSound: () => {},
	toggleMusic: () => {},
	drop: () => {},
	horn: () => {},
	bigHorn: () => {},
});

function readStored(key: string): boolean {
	try {
		return parseStoredSound(window.localStorage.getItem(key));
	} catch {
		return false;
	}
}

function writeStored(key: string, on: boolean): void {
	try {
		window.localStorage.setItem(key, on ? "on" : "off");
	} catch {
		// Private windows can refuse storage; the toggle still works for this visit.
	}
}

type Engine = {
	ctx: AudioContext;
	effects: GainNode;
	surf: Surf;
	piano: Piano;
	/** The foghorn recording, fetched the first time a ship sounds. */
	horn?: Promise<AudioBuffer>;
};

/**
 * The shore's sound and music, both off by default. Browsers let audio start
 * only from a tap or key press, so a visitor who left either on hears it again
 * from their first one. The surf falls quiet while the waves are paused.
 */
export function SoundProvider({ children }: { children: ReactNode }) {
	const { paused } = useMotion();
	const [soundOn, setSoundOn] = useState(false);
	const [musicOn, setMusicOn] = useState(false);
	const engineRef = useRef<Engine | null>(null);
	const soundOnRef = useRef(soundOn);

	useEffect(() => {
		soundOnRef.current = soundOn;
	}, [soundOn]);

	useEffect(() => {
		setSoundOn(readStored(SOUND_STORAGE_KEY));
		setMusicOn(readStored(MUSIC_STORAGE_KEY));
	}, []);

	const engine = useCallback((): Engine | null => {
		if (engineRef.current) return engineRef.current;
		if (typeof window.AudioContext !== "function") return null;
		const ctx = new AudioContext();
		const effects = ctx.createGain();
		effects.connect(ctx.destination);
		engineRef.current = { ctx, effects, surf: createSurf(ctx), piano: createPiano(ctx) };
		return engineRef.current;
	}, []);

	useEffect(() => {
		const surfPlaying = soundOn && !paused;
		const wanted = surfPlaying || musicOn;
		if (!wanted && !engineRef.current) return;

		const apply = () => {
			const e = engine();
			if (!e) return;
			void e.ctx.resume();
			e.surf.setPlaying(surfPlaying);
			e.piano.setPlaying(musicOn);
		};

		apply();
		if (!wanted || engineRef.current?.ctx.state === "running") return;

		const events = ["pointerdown", "touchend", "click", "keydown"] as const;
		const onGesture = () => {
			apply();
			for (const name of events) window.removeEventListener(name, onGesture);
		};
		for (const name of events) window.addEventListener(name, onGesture);
		return () => {
			for (const name of events) window.removeEventListener(name, onGesture);
		};
	}, [soundOn, musicOn, paused, engine]);

	useEffect(
		() => () => {
			const e = engineRef.current;
			if (!e) return;
			e.surf.close();
			e.piano.close();
			void e.ctx.close();
			engineRef.current = null;
		},
		[],
	);

	/** Wakes the audio inside the tap itself; iOS refuses a resume from a later effect. */
	const unlock = useCallback(() => {
		void engine()?.ctx.resume();
	}, [engine]);

	const toggleSound = useCallback(() => {
		unlock();
		setSoundOn((was) => {
			writeStored(SOUND_STORAGE_KEY, !was);
			return !was;
		});
	}, [unlock]);

	const toggleMusic = useCallback(() => {
		unlock();
		setMusicOn((was) => {
			writeStored(MUSIC_STORAGE_KEY, !was);
			return !was;
		});
	}, [unlock]);

	const play = useCallback(
		(effect: (ctx: AudioContext, out: AudioNode) => void) => {
			if (!soundOnRef.current) return;
			const e = engine();
			if (!e) return;
			// A tap can be the gesture that wakes the audio, so play once it is awake.
			if (e.ctx.state === "running") effect(e.ctx, e.effects);
			else void e.ctx.resume().then(() => effect(e.ctx, e.effects));
		},
		[engine],
	);

	const drop = useCallback(() => play(playDrop), [play]);
	const sound = useCallback(
		(voice: HornVoice) =>
			play((ctx, out) => {
				const e = engineRef.current;
				if (!e) return;
				e.horn ??= loadHorn(ctx);
				e.horn.then(
					(buffer) => playHorn(ctx, out, buffer, voice),
					() => {
						// A failed fetch stays silent, and the next ship tries again.
						e.horn = undefined;
					},
				);
			}),
		[play],
	);
	const horn = useCallback(() => sound(FAR_HORN), [sound]);
	const lastBigHornRef = useRef(0);
	const bigHorn = useCallback(() => {
		if (!soundOnRef.current) return;
		const now = Date.now();
		if (now - lastBigHornRef.current < BIG_HORN_COOLDOWN_MS) return;
		lastBigHornRef.current = now;
		sound(NEAR_HORN);
	}, [sound]);

	const value = useMemo(
		() => ({ soundOn, musicOn, toggleSound, toggleMusic, drop, horn, bigHorn }),
		[soundOn, musicOn, toggleSound, toggleMusic, drop, horn, bigHorn],
	);

	return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound(): SoundValue {
	return useContext(SoundContext);
}
