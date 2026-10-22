/**
 * Gentle generative piano: slow broken chords over a falling progression,
 * each note a soft struck tone that fades, with a little room around it.
 * Nothing repeats exactly, and nothing is downloaded.
 */

/** Loudness when playing. */
export const PIANO_VOLUME = 0.16;
const FADE = 2;
/** Seconds per beat (about 64 bpm) and beats per chord. */
const BEAT = 0.94;
const BEATS_PER_CHORD = 8;

/** Bass note and chord tones, as MIDI numbers: Fmaj7, Em7, Dm7, Cmaj7. */
export const PROGRESSION: { bass: number; tones: number[] }[] = [
	{ bass: 41, tones: [65, 69, 72, 76] },
	{ bass: 40, tones: [64, 67, 71, 74] },
	{ bass: 38, tones: [62, 65, 69, 72] },
	{ bass: 36, tones: [60, 64, 67, 71] },
];

export function midiToHz(midi: number): number {
	return 440 * 2 ** ((midi - 69) / 12);
}

function strike(
	ctx: AudioContext,
	out: AudioNode,
	midi: number,
	at: number,
	velocity: number,
): void {
	const hz = midiToHz(midi);
	const decay = midi < 50 ? 5 : 3.2;

	const env = ctx.createGain();
	env.gain.setValueAtTime(0.0001, at);
	env.gain.exponentialRampToValueAtTime(velocity, at + 0.008);
	env.gain.exponentialRampToValueAtTime(velocity * 0.35, at + 0.4);
	env.gain.exponentialRampToValueAtTime(0.0001, at + decay);

	const tone = ctx.createBiquadFilter();
	tone.type = "lowpass";
	tone.frequency.setValueAtTime(Math.min(hz * 6, 4000), at);
	tone.frequency.exponentialRampToValueAtTime(Math.max(hz * 1.5, 300), at + decay);
	env.connect(tone).connect(out);

	// A fundamental with a quieter octave and twelfth gives a soft piano colour.
	for (const [mult, level, type] of [
		[1, 1, "triangle"],
		[2, 0.28, "sine"],
		[3, 0.08, "sine"],
	] as const) {
		const osc = ctx.createOscillator();
		osc.type = type;
		osc.frequency.value = hz * mult;
		const g = ctx.createGain();
		g.gain.value = level;
		osc.connect(g).connect(env);
		osc.start(at);
		osc.stop(at + decay + 0.1);
	}
}

export type Note = { midi: number; offset: number; velocity: number };

/**
 * The notes struck on one beat: the bass at the top of each chord, a chord
 * tone on most beats, and now and then a soft note an octave up.
 */
export function beatNotes(beat: number, random: () => number): Note[] {
	const chord = PROGRESSION[Math.floor(beat / BEATS_PER_CHORD) % PROGRESSION.length];
	if (!chord) return [];
	const inChord = beat % BEATS_PER_CHORD;
	const first = inChord === 0;
	const notes: Note[] = [];
	if (first) notes.push({ midi: chord.bass, offset: 0, velocity: 0.32 });
	if (first || random() < 0.72) {
		const tone = chord.tones[Math.floor(random() * chord.tones.length)] ?? chord.tones[0] ?? 60;
		notes.push({ midi: tone, offset: first ? 0.12 : 0, velocity: 0.14 + random() * 0.1 });
	}
	if (inChord === 5 && random() < 0.35) {
		const high = chord.tones[chord.tones.length - 1] ?? 72;
		notes.push({ midi: high + 12, offset: BEAT / 2, velocity: 0.07 });
	}
	return notes;
}

export type Piano = {
	setPlaying: (playing: boolean) => void;
	close: () => void;
};

export function createPiano(ctx: AudioContext): Piano {
	const master = ctx.createGain();
	master.gain.value = 0;
	master.connect(ctx.destination);

	// A small room: two filtered feedback delays.
	const dry = ctx.createGain();
	dry.gain.value = 0.8;
	dry.connect(master);
	const notes = ctx.createGain();
	notes.connect(dry);
	for (const [time, feedback] of [
		[0.29, 0.38],
		[0.47, 0.3],
	] as const) {
		const delay = ctx.createDelay(1);
		delay.delayTime.value = time;
		const fb = ctx.createGain();
		fb.gain.value = feedback;
		const damp = ctx.createBiquadFilter();
		damp.type = "lowpass";
		damp.frequency.value = 1800;
		notes.connect(delay);
		delay.connect(damp).connect(fb).connect(delay);
		const wet = ctx.createGain();
		wet.gain.value = 0.22;
		damp.connect(wet).connect(master);
	}

	let playing = false;
	let timer: number | undefined;
	let beat = 0;
	let next = 0;

	const schedule = () => {
		while (next < ctx.currentTime + 0.6) {
			const at = next + (Math.random() - 0.5) * 0.04;
			for (const note of beatNotes(beat, Math.random)) {
				strike(ctx, notes, note.midi, at + note.offset, note.velocity);
			}
			beat++;
			next += BEAT;
		}
	};

	return {
		setPlaying(on) {
			const now = ctx.currentTime;
			master.gain.cancelScheduledValues(now);
			master.gain.setValueAtTime(master.gain.value, now);
			master.gain.linearRampToValueAtTime(on ? PIANO_VOLUME : 0, now + FADE);
			playing = on;
			if (on && timer === undefined) {
				next = Math.max(next, now + 0.1);
				schedule();
				timer = window.setInterval(schedule, 150);
			} else if (!on) {
				// Let the fade finish before the notes stop being written.
				window.setTimeout(() => {
					if (playing || timer === undefined) return;
					window.clearInterval(timer);
					timer = undefined;
				}, FADE * 1000);
			}
		},
		close() {
			window.clearInterval(timer);
			master.disconnect();
		},
	};
}
