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

/** The recorded foghorn, cleaned and trimmed; see public/sounds. */
export const HORN_URL = "/sounds/foghorn.wav";

export type HornVoice = {
	/** Loudness of each blast. */
	level: number;
	/** Lowpass cutoff; lower sounds further away. */
	tone: number;
	/** Playback rate; a touch under 1 makes it deeper. */
	rate: number;
	/** When each blast starts, in seconds. */
	starts: readonly number[];
};

/** The mini ship far out: two blasts, softer and further off. */
export const FAR_HORN: HornVoice = { level: 0.14, tone: 1500, rate: 0.97, starts: [0, 3.4] };

/** The big ship in the header, close by: one full blast. */
export const NEAR_HORN: HornVoice = { level: 0.17, tone: 6000, rate: 1, starts: [0] };

/** Fetches and decodes the foghorn once per audio context. */
export async function loadHorn(ctx: BaseAudioContext): Promise<AudioBuffer> {
	const response = await fetch(HORN_URL);
	return ctx.decodeAudioData(await response.arrayBuffer());
}

/** Plays the foghorn recording as the voice asks: how loud, how far, how many blasts. */
export function playHorn(
	ctx: BaseAudioContext,
	out: AudioNode,
	buffer: AudioBuffer,
	voice: HornVoice,
): void {
	const muffle = ctx.createBiquadFilter();
	muffle.type = "lowpass";
	muffle.frequency.value = voice.tone;
	const level = ctx.createGain();
	level.gain.value = voice.level;
	muffle.connect(level).connect(out);

	for (const start of voice.starts) {
		const blast = ctx.createBufferSource();
		blast.buffer = buffer;
		blast.playbackRate.value = voice.rate;
		blast.connect(muffle);
		blast.start(ctx.currentTime + start);
	}
}
