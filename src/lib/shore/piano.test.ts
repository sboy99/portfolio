import { describe, expect, it } from "vitest";
import { beatNotes, midiToHz, PROGRESSION } from "@/lib/shore/piano";

describe("piano", () => {
	it("tunes A4 to 440 Hz", () => {
		expect(midiToHz(69)).toBe(440);
		expect(midiToHz(81)).toBeCloseTo(880);
	});

	it("opens each chord with its bass and a chord tone", () => {
		const notes = beatNotes(0, () => 0.5);
		expect(notes[0]?.midi).toBe(PROGRESSION[0]?.bass);
		expect(PROGRESSION[0]?.tones).toContain(notes[1]?.midi);
	});

	it("only ever plays notes from the current chord or an octave above it", () => {
		let seed = 1;
		const random = () => {
			seed = (seed * 16807) % 2147483647;
			return seed / 2147483647;
		};
		for (let beat = 0; beat < 200; beat++) {
			const chord = PROGRESSION[Math.floor(beat / 8) % PROGRESSION.length];
			const allowed = new Set([
				chord?.bass,
				...(chord?.tones ?? []),
				...(chord?.tones ?? []).map((t) => t + 12),
			]);
			for (const note of beatNotes(beat, random)) expect(allowed.has(note.midi)).toBe(true);
		}
	});
});
