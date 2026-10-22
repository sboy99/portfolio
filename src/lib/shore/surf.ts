/**
 * A calm shoreline, synthesised in the browser so nothing is downloaded:
 * a low rumble of brown noise and a soft wash of filtered white noise, both
 * swelling and easing with slow, slightly out-of-step waves.
 */

/** Overall loudness when playing; kept low so it sits under reading. */
export const SURF_VOLUME = 0.13;
/** Seconds to fade in or out. */
export const SURF_FADE = 1.6;

const NOISE_SECONDS = 6;

function noiseBuffer(ctx: AudioContext, brown: boolean): AudioBuffer {
	const length = ctx.sampleRate * NOISE_SECONDS;
	const buffer = ctx.createBuffer(2, length, ctx.sampleRate);
	for (let ch = 0; ch < 2; ch++) {
		const data = buffer.getChannelData(ch);
		let last = 0;
		for (let i = 0; i < length; i++) {
			const white = Math.random() * 2 - 1;
			if (brown) {
				last = (last + 0.02 * white) / 1.02;
				data[i] = last * 3.5;
			} else {
				data[i] = white;
			}
		}
	}
	return buffer;
}

/** A slow sine that nudges an AudioParam around its own value. */
function swell(
	ctx: AudioContext,
	param: AudioParam,
	hz: number,
	depth: number,
	phase = 0,
): OscillatorNode {
	const lfo = ctx.createOscillator();
	lfo.frequency.value = hz;
	const amount = ctx.createGain();
	amount.gain.value = depth;
	lfo.connect(amount).connect(param);
	lfo.start(ctx.currentTime + phase);
	return lfo;
}

export type Surf = {
	/** Fade the sea in or out. */
	setPlaying: (playing: boolean) => void;
	close: () => void;
};

export function createSurf(ctx: AudioContext): Surf {
	const master = ctx.createGain();
	master.gain.value = 0;
	master.connect(ctx.destination);

	// The rumble: brown noise under a lowpass that opens as each wave comes in.
	const rumble = ctx.createBufferSource();
	rumble.buffer = noiseBuffer(ctx, true);
	rumble.loop = true;
	const rumbleFilter = ctx.createBiquadFilter();
	rumbleFilter.type = "lowpass";
	rumbleFilter.frequency.value = 380;
	const rumbleGain = ctx.createGain();
	rumbleGain.gain.value = 0.55;
	rumble.connect(rumbleFilter).connect(rumbleGain).connect(master);

	// The wash: white noise in a soft band, quieter, trailing the rumble.
	const wash = ctx.createBufferSource();
	wash.buffer = noiseBuffer(ctx, false);
	wash.loop = true;
	const washFilter = ctx.createBiquadFilter();
	washFilter.type = "bandpass";
	washFilter.frequency.value = 1100;
	washFilter.Q.value = 0.5;
	const washGain = ctx.createGain();
	washGain.gain.value = 0.018;
	wash.connect(washFilter).connect(washGain).connect(master);

	// Waves about every nine seconds, with a slower drift so no two sound alike.
	const lfos = [
		swell(ctx, rumbleGain.gain, 0.11, 0.3),
		swell(ctx, rumbleGain.gain, 0.043, 0.12),
		swell(ctx, rumbleFilter.frequency, 0.11, 160),
		swell(ctx, washGain.gain, 0.11, 0.014, 1.4),
		swell(ctx, washFilter.frequency, 0.067, 250),
	];

	rumble.start();
	wash.start();

	return {
		setPlaying(playing) {
			const now = ctx.currentTime;
			master.gain.cancelScheduledValues(now);
			master.gain.setValueAtTime(master.gain.value, now);
			master.gain.linearRampToValueAtTime(playing ? SURF_VOLUME : 0, now + SURF_FADE);
		},
		close() {
			for (const lfo of lfos) lfo.stop();
			rumble.stop();
			wash.stop();
			master.disconnect();
		},
	};
}

export const SOUND_STORAGE_KEY = "portfolio-sound";
export const MUSIC_STORAGE_KEY = "portfolio-music";

/** Sound and music are off unless the visitor turned them on before. */
export function parseStoredSound(value: string | null): boolean {
	return value === "on";
}
