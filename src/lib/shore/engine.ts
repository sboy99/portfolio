/**
 * Shoreline ASCII engine. Pure functions that turn (columns, tick, mode) into
 * rows of coloured text runs. Ported from design/shoreline/ShoreHome.dc.html;
 * keep the maths in step with the design files.
 */

export type ShoreMode = "day" | "dusk";

export type ColorKey =
	| "sky"
	| "sun"
	| "sea1"
	| "sea2"
	| "sea3"
	| "fg"
	| "accent"
	| "cloud"
	| "boat"
	| "gull"
	| "line-strong";

export type Run = { c: ColorKey; t: string };
export type Row = Run[];

export type Ripple = { c: number; r: number; t0: number };

export type Cloud = { x0: number; row: number; s: number; sp: number };

export type BandLayout = {
	cols: number;
	sunC: number;
	shipC: number;
	/** 1 at 1280px and wider, down to 0.6 on phones; sizes the ship and sun. */
	scale: number;
	clouds: Cloud[];
};

/** Width of one character at 13px Geist Mono, and the row height. */
export const CHAR_W = 7.8;
export const ROW_H = 14;

export const HORIZON_ROWS = 12;
export const HORIZON_ROW = 6;
export const SEA_ROWS = 12;
const SEA_SURFACE = 4;

/** Ripples grow 0.26 rows per tick and vanish at radius 9. */
const RIPPLE_SPEED = 0.26;
const RIPPLE_MAX = 9;
export const RIPPLE_LIFETIME = Math.ceil((RIPPLE_MAX - 0.6) / RIPPLE_SPEED) + 1;
export const MAX_RIPPLES = 12;

const DESKTOP_CLOUDS: Cloud[] = [
	{ x0: 8, row: 1, s: 0, sp: 0.05 },
	{ x0: 70, row: 0, s: 1, sp: 0.035 },
	{ x0: 140, row: 2, s: 2, sp: 0.045 },
	{ x0: 100, row: 3, s: 0, sp: 0.03 },
];

const MOBILE_CLOUDS: Cloud[] = [
	{ x0: 4, row: 1, s: 0, sp: 0.05 },
	{ x0: 30, row: 3, s: 2, sp: 0.035 },
];

const CLOUD_SHAPES = [
	[" .-.", "(___)"],
	["  .--.", "(______)"],
	["  .-.", ".(___)."],
];

export const SHIP_ART = [
	"           <|",
	"      |    _|_    |",
	"     _|_  (   |  _|_",
	"    (   | (   | (   |",
	"\\    \\__|  \\__|  \\__|",
	"  \\_____|_____|__|_|_|",
	"   \\   o    o    o  /",
	"    \\______________/",
];

const SHIP_SPAN = SHIP_ART.map((line) => [line.search(/\S/), line.length - 1] as const);

const DEPTH_RAMP = [" ", ".", "-", "~", "≈"];
const WAKE_RAMP = ["_", ".", "-", "~"];
const RING_COLORS: ColorKey[] = ["accent", "sea2", "sea1", "line-strong"];

/** Ship and sun shrink with the screen: full size from 1280px, 0.6 at 390px. */
export function sizeScale(widthPx: number): number {
	const t = Math.min(1, Math.max(0, (widthPx - 390) / (1280 - 390)));
	return Math.round((0.6 + 0.4 * t) * 100) / 100;
}

/** Desktop keeps the design's 1280px composition centred; phones use the 390px one. */
export function bandLayout(widthPx: number): BandLayout {
	const cols = Math.max(50, Math.ceil(widthPx / CHAR_W) + 1);
	const scale = sizeScale(widthPx);

	if (widthPx < 640) {
		return { cols, sunC: cols - 10, shipC: 2, scale, clouds: MOBILE_CLOUDS };
	}

	const mid = Math.round(cols / 2);
	return {
		cols,
		sunC: mid + 36,
		shipC: Math.max(2, mid - 46),
		scale,
		clouds: DESKTOP_CLOUDS.map((cl) => ({ ...cl, x0: Math.round((cl.x0 / 170) * cols) })),
	};
}

export const DEFAULT_LAYOUT = bandLayout(1280);

/** Pixels the scaled ship sits below the band's top, so its keel stays on the water. */
export function shipOffset(scale: number): number {
	return SHIP_ART.length * ROW_H * (1 - scale);
}

/** The columns a scaled ship covers on horizon row `r`, if any. */
function shipCover(r: number, shipC: number, scale: number): readonly [number, number] | null {
	const y = r * ROW_H + ROW_H / 2 - shipOffset(scale);
	const sr = Math.floor(y / (ROW_H * scale));
	const span = SHIP_SPAN[sr];
	if (y < 0 || span == null) return null;
	return [shipC + Math.floor(span[0] * scale), shipC + Math.ceil(span[1] * scale)];
}

function hash01(c: number, r: number): number {
	const h = Math.sin(c * 3.1 + r * 17.7) * 9137.13;
	return h - Math.floor(h);
}

function pushCell(runs: Row, ch: string, c: ColorKey): void {
	const last = runs.at(-1);
	if (last && last.c === c) {
		last.t += ch;
	} else {
		runs.push({ c, t: ch });
	}
}

/** The ring character a set of ripples draws at a cell, if any. */
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: a per-cell loop kept in step with the design file
export function ringAt(
	ripples: readonly Ripple[],
	rt: number,
	c: number,
	r: number,
): { ch: string; c: ColorKey } | null {
	let hit: { ch: string; c: ColorKey; fade: number } | null = null;

	for (const q of ripples) {
		const age = rt - q.t0;
		if (age < 0) continue;
		const dx = (c - q.c) * 0.36;
		const dy = r - q.r;
		const d = Math.sqrt(dx * dx + dy * dy);
		const rad = 0.6 + age * RIPPLE_SPEED;
		const tol = d > 0 ? (0.5 * Math.abs(dy)) / d + (0.19 * Math.abs(dx)) / d : 0.5;
		if (rad > RIPPLE_MAX || Math.abs(d - rad) > tol) continue;

		const fade = rad / RIPPLE_MAX;
		let ch: string;
		if (d < 0.5) ch = "o";
		else if (Math.abs(dy) < 0.38 * d) ch = dx > 0 ? ")" : "(";
		else if (Math.abs(dx) < 0.38 * d) ch = "-";
		else ch = dx > 0 === dy < 0 ? "\\" : "/";
		if (fade > 0.8 && (c + r) % 2) ch = "·";

		if (!hit || fade < hit.fade) {
			hit = { ch, c: RING_COLORS[Math.min(3, Math.floor(fade * 4))], fade };
		}
	}

	return hit ? { ch: hit.ch, c: hit.c } : null;
}

export type FrameInput = {
	layout: BandLayout;
	tick: number;
	mode: ShoreMode;
	ripples?: readonly Ripple[];
	rt?: number;
};

/** The top band: sky with sun, clouds or stars, the horizon and the sea below it. */
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: a per-cell loop kept in step with the design file
export function horizonFrame({ layout, tick, mode, ripples = [], rt = 0 }: FrameInput): Row[] {
	const { cols, sunC, shipC, clouds, scale } = layout;
	const sunScale = 0.65 + 0.35 * ((scale - 0.6) / 0.4);
	const sunR = (mode === "day" ? 2.6 : 4.2) * sunScale;
	const sunRow = HORIZON_ROW - (mode === "day" ? 3 : 0.6);
	const rows: Row[] = [];

	for (let r = 0; r < HORIZON_ROWS; r++) {
		const runs: Row = [];
		for (let c = 0; c < cols; c++) {
			let ch = " ";
			let col: ColorKey = "sky";

			if (r < HORIZON_ROW) {
				const dx = (c - sunC) * 0.5;
				const dy = r - sunRow;
				const d = Math.sqrt(dx * dx + dy * dy);
				if (d < sunR) {
					ch = d < sunR - 1 ? "@" : "o";
					col = "sun";
				} else {
					ch = hash01(c, r) > 0.985 ? "·" : " ";
					if (mode === "day") {
						for (const cl of clouds) {
							const shape = CLOUD_SHAPES[cl.s];
							const x = Math.floor((cl.x0 + tick * cl.sp) % (cols + 12)) - 10;
							const line = shape[r - cl.row];
							const glyph = line?.[c - x];
							if (glyph != null && glyph !== " " && c >= x) {
								ch = glyph;
								col = "cloud";
							}
						}
					}
				}
			} else if (r === HORIZON_ROW) {
				ch = "_";
				col = "sea3";
			} else {
				const depth = (r - HORIZON_ROW) / (HORIZON_ROWS - HORIZON_ROW);
				const v =
					Math.sin(c * (0.06 + depth * 0.06) - tick * (0.08 + depth * 0.1) + r * 0.9) +
					0.4 * Math.sin(c * 0.31 + tick * 0.05);
				const n = (v + 1.4) / 2.8;
				ch = DEPTH_RAMP[Math.max(0, Math.min(4, Math.floor(n * (3 + depth * 2))))];
				col = depth < 0.35 ? "sea3" : depth < 0.7 ? "sea2" : "sea1";
				if (
					Math.abs(c - sunC) < 6 - (r - HORIZON_ROW) * 0.3 &&
					Math.sin(c * 2 + tick * 0.5 + r) > 0.3
				) {
					ch = "-";
					col = "sun";
				}
			}

			const cover = shipCover(r, shipC, scale);
			const underShip = cover != null && c >= cover[0] && c <= cover[1];
			if (underShip) ch = " ";

			// Rings stay in open water: never in the sky and never through the hull.
			const ring = r > HORIZON_ROW && !underShip ? ringAt(ripples, rt, c, r) : null;
			if (ring) {
				ch = ring.ch;
				col = ring.c;
			}

			pushCell(runs, ch, col);
		}
		rows.push(runs);
	}

	return rows;
}

/** The ship's rows, coloured once: flag in accent, portholes in sun. */
export function shipRows(): Row[] {
	return SHIP_ART.map((line) => {
		const runs: Row = [];
		for (const ch of line) {
			pushCell(runs, ch, ch === "<" ? "accent" : ch === "o" ? "sun" : "fg");
		}
		return runs;
	});
}

/** Gentle bob for the still ship: pixels down and degrees of tilt. */
export function shipMotion(tick: number): { y: number; tilt: number } {
	return {
		y: Math.round(25 * Math.sin(tick * 0.2)) / 10,
		tilt: Math.round(140 * Math.sin(tick * 0.2 + 1)) / 100,
	};
}

type VesselSpec = {
	id: string;
	art: string[];
	/** Columns per tick. */
	speed: number;
	/** 1 sails left to right, -1 right to left. */
	dir: 1 | -1;
	/** Where along its loop the vessel starts, 0 to 1. */
	start: number;
	/** Rows below the surface its keel sails at. */
	lane: number;
};

// The mini ship has the surface to itself; the two small boats share a lower
// lane at one speed, half a loop apart, so they never catch each other.
const VESSELS: VesselSpec[] = [
	{
		id: "mini-ship",
		art: ["   |   |", "  )_)  )_)", " _|____|___", " \\_o__o__o/"],
		speed: 0.13,
		dir: -1,
		start: 0.62,
		lane: 0,
	},
	{ id: "sloop", art: ["  |\\", "__|_\\_", "\\____/"], speed: 0.24, dir: 1, start: 0, lane: 5 },
	{ id: "dinghy", art: [" /|", "/_|_", "\\___/"], speed: 0.24, dir: 1, start: 0.5, lane: 5 },
];

/** Phones sail one slow sloop on the surface. */
const PHONE_FLEET: VesselSpec[] = [
	{ id: "sloop", art: ["  |\\", "__|_\\_", "\\____/"], speed: 0.12, dir: 1, start: 0.2, lane: 0 },
];

export type Vessel = {
	id: string;
	rows: Row[];
	/** Left edge in columns and top edge in rows, both fractional for smooth motion. */
	x: number;
	y: number;
	tilt: number;
};

function swellAt(c: number, tick: number): number {
	return 0.9 * Math.sin(c * 0.08 - tick * 0.12) + 0.4 * Math.sin(c * 0.21 + tick * 0.07);
}

function vesselRows(art: string[]): Row[] {
	return art.map((line) => {
		const runs: Row = [];
		for (const ch of line) pushCell(runs, ch, ch === "o" ? "sun" : "boat");
		return runs;
	});
}

/** Columns of a band narrower than the 640px phone breakpoint. */
const SMALL_COLS = Math.ceil(640 / CHAR_W) + 1;

const VESSEL_ROWS = new Map([...VESSELS, ...PHONE_FLEET].map((v) => [v.id, vesselRows(v.art)]));

/**
 * Boats on the footer sea. Each runs its own loop at its own speed and
 * direction in its own lane, riding the swell under its middle with its keel
 * in the water. Phones get a single slow boat.
 */
export function seaVessels(layout: BandLayout, tick: number): Vessel[] {
	const { cols } = layout;
	const fleet = cols < SMALL_COLS ? PHONE_FLEET : VESSELS;
	return fleet.map((v) => {
		const w = Math.max(...v.art.map((line) => line.length));
		const loop = cols + w + 20;
		const p = (v.start * loop + v.speed * tick) % loop;
		const x = v.dir > 0 ? p - w - 10 : cols + 10 - p;
		const mid = x + w / 2;
		// Deeper lanes ride a gentler swell, the way the far water looks calmer.
		const lift = v.lane > 0 ? 0.5 : 1;
		const surface = SEA_SURFACE + v.lane + lift * swellAt(mid, tick);
		const slope = (lift * (swellAt(mid + 1, tick) - swellAt(mid - 1, tick))) / 2;
		const tilt = Math.max(-3, Math.min(3, (Math.atan((slope * ROW_H) / CHAR_W) * 180) / Math.PI));
		return {
			id: v.id,
			rows: VESSEL_ROWS.get(v.id) ?? [],
			x,
			y: surface + 0.9 - (v.art.length - 1),
			tilt: Math.round(tilt * 10) / 10,
		};
	});
}

/** Cells hidden behind each vessel, so the sea never shows through a hull. */
function vesselMask(vessels: Vessel[], cols: number): Set<number> {
	const mask = new Set<number>();
	for (const v of vessels) {
		v.rows.forEach((row, i) => {
			const line = rowText(row);
			const first = line.search(/\S/);
			if (first < 0) return;
			const r = Math.round(v.y + i);
			const x0 = Math.round(v.x);
			for (let c = x0 + first; c <= x0 + line.length - 1; c++) {
				if (c >= 0 && c < cols && r >= 0 && r < SEA_ROWS) mask.add(r * cols + c);
			}
		});
	}
	return mask;
}

/** The footer sea: swell, gulls by day and stars at dusk. Vessels are drawn on top by the caller. */
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: a per-cell loop kept in step with the design file
export function seaFrame({ layout, tick, mode, ripples = [], rt = 0 }: FrameInput): Row[] {
	const { cols } = layout;
	const mask = vesselMask(seaVessels(layout, tick), cols);
	const gullX = Math.floor(cols - ((tick * 0.6) % (cols + 10)));
	const rows: Row[] = [];

	for (let r = 0; r < SEA_ROWS; r++) {
		const runs: Row = [];
		for (let c = 0; c < cols; c++) {
			let ch = " ";
			let col: ColorKey = "sky";
			const surface = SEA_SURFACE + swellAt(c, tick);

			if (r >= surface) {
				const depth = (r - surface) / (SEA_ROWS - surface);
				const v =
					Math.sin(c * 0.12 - tick * 0.2 + r * 0.8) + 0.5 * Math.sin(c * 0.33 + tick * 0.09 - r);
				const n = (v + 1.5) / 3;
				const crest = r - surface < 1;
				ch = crest
					? Math.sin(c * 1.3 + tick * 0.5) > 0
						? "~"
						: "-"
					: DEPTH_RAMP[Math.max(1, Math.min(4, Math.floor(n * 5)))];
				col = crest ? "sea1" : depth < 0.5 ? "sea2" : "sea3";

				const ring = ringAt(ripples, rt, c, r);
				if (ring) {
					ch = ring.ch;
					col = ring.c;
				}
			}

			if (mask.has(r * cols + c)) {
				ch = " ";
				col = "sky";
			}

			if (mode === "day" && r === 1 && (c === gullX || c === gullX + 9)) {
				ch = "v";
				col = "gull";
			}

			if (mode === "dusk" && r < surface - 0.5 && ch === " " && hash01(c, r) > 0.955) {
				ch = "·";
				col = "sky";
			}

			pushCell(runs, ch, col);
		}
		rows.push(runs);
	}

	return rows;
}

/** One line of wave used in place of a rule. `seed` gives each line its own phase. */
export function wakeLine(seed: number, length: number, tick: number): string {
	let out = "";
	for (let c = 0; c < length; c++) {
		const v =
			Math.sin(c * 0.22 - tick * (0.22 + seed * 0.03) + seed * 1.7) +
			0.35 * Math.sin(c * 0.07 + tick * 0.05 + seed);
		out += WAKE_RAMP[Math.max(0, Math.min(3, Math.floor(((v + 1.35) / 2.7) * 4)))];
	}
	return out;
}

/** Convert a tap in pixels (relative to the band's top-left) into a cell. */
export function tapCell(x: number, y: number, minRow: number): { c: number; r: number } {
	return { c: Math.round(x / CHAR_W), r: Math.max(Math.round(y / ROW_H), minRow) };
}

export function rowText(row: Row): string {
	return row.map((run) => run.t).join("");
}

const ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;" };

/**
 * Rows as HTML, one div per row and one span per colour run. Every ≈ gets its
 * own one-character cell: Geist Mono has no ≈, and a fallback face would
 * otherwise draw it at a different width and push the row out of line.
 */
export function rowsToHtml(rows: Row[]): string {
	let html = "";
	for (const row of rows) {
		html += "<div>";
		for (const run of row) {
			const text = run.t.replace(/[&<>]/g, (ch) => ESCAPES[ch]).replace(/≈/g, "<i>≈</i>");
			html += `<span data-c="${run.c}">${text}</span>`;
		}
		html += "</div>";
	}
	return html;
}
