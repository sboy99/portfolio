/** One-off sounds on the shore: a drop where the water is tapped, and ships' horns. */

/**
 * A water drop. Real drops ring as a tiny bubble whose pitch rises as it
 * closes, over a faint splash; a smaller drop follows the first.
 */
export function playDrop(ctx: AudioContext, out: AudioNode): void {
	const now = ctx.currentTime;
	const pitch = 520 + Math.random() * 260;
	bubble(ctx, out, now, pitch, 0.07);
	bubble(ctx, out, now + 0.07 + Math.random() * 0.05, pitch * 1.45, 0.025);
	splash(ctx, out, now);
}

function bubble(ctx: AudioContext, out: AudioNode, at: number, hz: number, level: number): void {
	const tone = ctx.createOscillator();
	tone.type = "sine";
	tone.frequency.setValueAtTime(hz, at);
	tone.frequency.exponentialRampToValueAtTime(hz * 2.3, at + 0.07);

	const env = ctx.createGain();
	env.gain.setValueAtTime(0.0001, at);
	env.gain.exponentialRampToValueAtTime(level, at + 0.006);
	env.gain.exponentialRampToValueAtTime(0.0001, at + 0.14);

	tone.connect(env).connect(out);
	tone.start(at);
	tone.stop(at + 0.16);
}

function splash(ctx: AudioContext, out: AudioNode, at: number): void {
	const length = Math.floor(ctx.sampleRate * 0.05);
	const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
	const data = buffer.getChannelData(0);
	for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 2;

	const noise = ctx.createBufferSource();
	noise.buffer = buffer;
	const band = ctx.createBiquadFilter();
	band.type = "bandpass";
	band.frequency.value = 2600;
	band.Q.value = 0.8;
	const level = ctx.createGain();
	level.gain.value = 0.02;
	noise.connect(band).connect(level).connect(out);
	noise.start(at);
}

/** A harbour's worth of reverb: decaying noise as an impulse response. */
function harbour(ctx: AudioContext, seconds: number): ConvolverNode {
	const length = Math.floor(ctx.sampleRate * seconds);
	const impulse = ctx.createBuffer(2, length, ctx.sampleRate);
	for (let ch = 0; ch < 2; ch++) {
		const data = impulse.getChannelData(ch);
		for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 3;
	}
	const convolver = ctx.createConvolver();
	convolver.buffer = impulse;
	return convolver;
}

export type HornVoice = {
	/** The chord the whistle sounds, in Hz; kept in the piano's key so the two never clash. */
	notes: readonly number[];
	/** Loudness of each blast. */
	level: number;
	/** Lowpass cutoff on the reedy edge; higher is clearer, nearer. */
	tone: number;
	/** Share of the sound that is echo off the water. */
	wet: number;
	/** Each blast as [start, length] in seconds. */
	blasts: readonly (readonly [number, number])[];
};

/** The mini ship far out: two short, light toots of an F major chord. */
export const FAR_HORN: HornVoice = {
	notes: [349.2, 440, 523.3],
	level: 0.06,
	tone: 1600,
	wet: 0.55,
	blasts: [
		[0, 0.55],
		[0.85, 0.9],
	],
};

/** The big ship in the header, close by: one fuller, lower call. */
export const NEAR_HORN: HornVoice = {
	notes: [174.6, 261.6, 349.2, 440],
	level: 0.085,
	tone: 2400,
	wet: 0.35,
	blasts: [[0, 1.4]],
};

/**
 * A ship's whistle tuned to the shore: a soft chord with a clear, quick
 * onset and a breath of air, that settles and fades into the harbour.
 */
export function playHorn(ctx: AudioContext, out: AudioNode, voice: HornVoice): void {
	const now = ctx.currentTime;
	const end = Math.max(...voice.blasts.map(([start, length]) => start + length)) + 0.6;

	const env = ctx.createGain();
	env.gain.value = 0;
	for (const [start, length] of voice.blasts) {
		const t = now + start;
		// A crisp start with a slight bloom above the held level, then a soft tail.
		env.gain.setValueAtTime(0.0001, t);
		env.gain.exponentialRampToValueAtTime(voice.level * 1.3, t + 0.05);
		env.gain.exponentialRampToValueAtTime(voice.level, t + 0.25);
		env.gain.setValueAtTime(voice.level, t + length - 0.1);
		env.gain.exponentialRampToValueAtTime(0.0001, t + length + 0.35);
	}

	const edge = ctx.createBiquadFilter();
	edge.type = "lowpass";
	edge.frequency.value = voice.tone;
	edge.Q.value = 0.7;

	const dry = ctx.createGain();
	dry.gain.value = 1 - voice.wet;
	const wet = ctx.createGain();
	wet.gain.value = voice.wet;
	const room = harbour(ctx, 2.5);

	edge.connect(env);
	env.connect(dry).connect(out);
	env.connect(room).connect(wet).connect(out);

	const vibrato = ctx.createOscillator();
	vibrato.frequency.value = 5;
	const vibratoDepth = ctx.createGain();
	vibratoDepth.gain.value = 4;
	vibrato.connect(vibratoDepth);
	vibrato.start(now);
	vibrato.stop(now + end);

	const share = 1 / voice.notes.length;
	for (const hz of voice.notes) {
		// A rounded triangle carries the note; a little filtered saw gives it a reedy edge.
		for (const [type, level] of [
			["triangle", 0.8],
			["sawtooth", 0.2],
		] as const) {
			const osc = ctx.createOscillator();
			osc.type = type;
			osc.frequency.value = hz;
			// Each blast starts a touch flat and slides up to pitch.
			for (const [start] of voice.blasts) {
				osc.detune.setValueAtTime(-25, now + start);
				osc.detune.linearRampToValueAtTime(0, now + start + 0.1);
			}
			vibratoDepth.connect(osc.detune);
			const g = ctx.createGain();
			g.gain.value = level * share;
			osc.connect(g).connect(edge);
			osc.start(now);
			osc.stop(now + end);
		}
	}

	breath(ctx, env, now, end);
}

/** The air through the whistle: a faint band of noise under the chord. */
function breath(ctx: AudioContext, out: AudioNode, at: number, seconds: number): void {
	const length = Math.floor(ctx.sampleRate * seconds);
	const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
	const data = buffer.getChannelData(0);
	for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;

	const noise = ctx.createBufferSource();
	noise.buffer = buffer;
	const band = ctx.createBiquadFilter();
	band.type = "bandpass";
	band.frequency.value = 1100;
	band.Q.value = 1.2;
	const level = ctx.createGain();
	level.gain.value = 0.06;
	noise.connect(band).connect(level).connect(out);
	noise.start(at);
}
