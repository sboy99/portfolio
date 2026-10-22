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

/** A gentle saturation that gives the horn its brassy edge. */
function brass(ctx: AudioContext): WaveShaperNode {
	const curve = new Float32Array(1024);
	for (let i = 0; i < curve.length; i++) {
		const x = (i / (curve.length - 1)) * 2 - 1;
		curve[i] = Math.tanh(2.2 * x) / Math.tanh(2.2);
	}
	const shaper = ctx.createWaveShaper();
	shaper.curve = curve;
	return shaper;
}

export type HornVoice = {
	/** Loudness of each blast. */
	level: number;
	/** Lowpass cutoff; lower sounds further away. */
	tone: number;
	/** Share of the sound that is echo off the water. */
	wet: number;
	/** Each blast as [start, length] in seconds. */
	blasts: readonly (readonly [number, number])[];
};

/** The mini ship far out: two blasts, softer and more distant. */
export const FAR_HORN: HornVoice = {
	level: 0.05,
	tone: 700,
	wet: 0.5,
	blasts: [
		[0, 1.1],
		[1.6, 1.8],
	],
};

/** The big ship in the header, close by: one long blast. */
export const NEAR_HORN: HornVoice = { level: 0.08, tone: 1300, wet: 0.32, blasts: [[0, 2.2]] };

/**
 * A ship's horn: a low, brassy fifth that sags up to pitch as the air comes
 * through, wavers slightly, then stops with the harbour ringing after it.
 */
export function playHorn(ctx: AudioContext, out: AudioNode, voice: HornVoice): void {
	const now = ctx.currentTime;
	const end = Math.max(...voice.blasts.map(([start, length]) => start + length));

	const shape = brass(ctx);
	const body = ctx.createBiquadFilter();
	body.type = "peaking";
	body.frequency.value = 380;
	body.Q.value = 1.1;
	body.gain.value = 6;
	const muffle = ctx.createBiquadFilter();
	muffle.type = "lowpass";
	muffle.frequency.value = voice.tone;

	const env = ctx.createGain();
	env.gain.value = 0;
	for (const [start, length] of voice.blasts) {
		const t = now + start;
		env.gain.setValueAtTime(0.0001, t);
		env.gain.exponentialRampToValueAtTime(voice.level, t + 0.14);
		env.gain.setValueAtTime(voice.level, t + length - 0.12);
		env.gain.exponentialRampToValueAtTime(0.0001, t + length + 0.08);
	}

	const dry = ctx.createGain();
	dry.gain.value = 1 - voice.wet;
	const wet = ctx.createGain();
	wet.gain.value = voice.wet;
	const room = harbour(ctx, 3);

	shape.connect(body).connect(muffle).connect(env);
	env.connect(dry).connect(out);
	env.connect(room).connect(wet).connect(out);

	const vibrato = ctx.createOscillator();
	vibrato.frequency.value = 4.5;
	const vibratoDepth = ctx.createGain();
	vibratoDepth.gain.value = 6;
	vibrato.connect(vibratoDepth);
	vibrato.start(now);
	vibrato.stop(now + end + 0.2);

	for (const [hz, type, level] of [
		[87, "sawtooth", 0.5],
		[130.5, "sawtooth", 0.35],
		[43.5, "square", 0.2],
	] as const) {
		const osc = ctx.createOscillator();
		osc.type = type;
		osc.frequency.value = hz;
		// Each blast starts a little flat and rises to pitch.
		for (const [start] of voice.blasts) {
			osc.detune.setValueAtTime(-60, now + start);
			osc.detune.linearRampToValueAtTime(0, now + start + 0.18);
		}
		vibratoDepth.connect(osc.detune);
		const g = ctx.createGain();
		g.gain.value = level;
		osc.connect(g).connect(shape);
		osc.start(now);
		osc.stop(now + end + 0.2);
	}
}
