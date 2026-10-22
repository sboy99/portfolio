/** One-off sounds on the shore: a drop where the water is tapped, and a far-off ship's horn. */

/** A soft plip: a short sine falling in pitch, like a pebble into still water. */
export function playDrop(ctx: AudioContext, out: AudioNode): void {
	const now = ctx.currentTime;
	const pitch = 700 + Math.random() * 400;

	const tone = ctx.createOscillator();
	tone.type = "sine";
	tone.frequency.setValueAtTime(pitch, now);
	tone.frequency.exponentialRampToValueAtTime(pitch * 0.45, now + 0.18);

	const env = ctx.createGain();
	env.gain.setValueAtTime(0.0001, now);
	env.gain.exponentialRampToValueAtTime(0.09, now + 0.012);
	env.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

	const soften = ctx.createBiquadFilter();
	soften.type = "lowpass";
	soften.frequency.value = 1600;

	tone.connect(env).connect(soften).connect(out);
	tone.start(now);
	tone.stop(now + 0.35);
}

/** A low, distant two-note horn, with a slow swell, a long tail and a faint echo. */
export function playHorn(ctx: AudioContext, out: AudioNode): void {
	const now = ctx.currentTime;
	const length = 1.8;

	const body = ctx.createGain();
	body.gain.setValueAtTime(0.0001, now);
	body.gain.exponentialRampToValueAtTime(0.05, now + 0.35);
	body.gain.setValueAtTime(0.05, now + length - 0.5);
	body.gain.exponentialRampToValueAtTime(0.0001, now + length + 0.6);

	const muffle = ctx.createBiquadFilter();
	muffle.type = "lowpass";
	muffle.frequency.value = 520;
	muffle.Q.value = 0.7;

	const echo = ctx.createDelay(1);
	echo.delayTime.value = 0.42;
	const echoLevel = ctx.createGain();
	echoLevel.gain.value = 0.28;

	body.connect(muffle);
	muffle.connect(out);
	muffle.connect(echo).connect(echoLevel).connect(out);

	// A low fifth, slightly detuned, as ships' horns are.
	for (const [hz, detune] of [
		[98, -6],
		[147, 5],
		[98, 7],
	] as const) {
		const osc = ctx.createOscillator();
		osc.type = "sawtooth";
		osc.frequency.value = hz;
		osc.detune.value = detune;
		osc.connect(body);
		osc.start(now);
		osc.stop(now + length + 0.7);
	}
}
