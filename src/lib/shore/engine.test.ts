import { describe, expect, it } from "vitest";
import {
	bandLayout,
	DEFAULT_LAYOUT,
	HORIZON_ROW,
	HORIZON_ROWS,
	horizonFrame,
	ringAt,
	rowsToHtml,
	rowText,
	SEA_ROWS,
	SHIP_ART,
	seaFrame,
	seaVessels,
	shipMotion,
	shipRows,
	tapCell,
	type Vessel,
	wakeLine,
} from "./engine";

describe("bandLayout", () => {
	it("matches the 1280px design composition", () => {
		expect(DEFAULT_LAYOUT.cols).toBe(166);
		expect(DEFAULT_LAYOUT.sunC - DEFAULT_LAYOUT.shipC).toBe(82);
		expect(DEFAULT_LAYOUT.clouds).toHaveLength(4);
	});

	it("uses the phone composition under 640px", () => {
		const layout = bandLayout(390);
		expect(layout.cols).toBe(51);
		expect(layout.shipC).toBe(2);
		expect(layout.sunC).toBe(41);
		expect(layout.clouds).toHaveLength(2);
	});

	it("shrinks the ship and sun on smaller screens", () => {
		expect(bandLayout(1600).scale).toBe(1);
		expect(bandLayout(1280).scale).toBe(1);
		expect(bandLayout(390).scale).toBe(0.6);
		const sunCells = (width: number) =>
			horizonFrame({ layout: bandLayout(width), tick: 0, mode: "day" })
				.slice(0, HORIZON_ROW)
				.flat()
				.filter((run) => run.c === "sun")
				.reduce((n, run) => n + run.t.length, 0);
		expect(sunCells(390)).toBeLessThan(sunCells(1280));
	});
});

describe("horizonFrame", () => {
	const day = horizonFrame({ layout: DEFAULT_LAYOUT, tick: 0, mode: "day" });

	it("draws exact rows and columns", () => {
		expect(day).toHaveLength(HORIZON_ROWS);
		for (const row of day) {
			expect([...rowText(row)]).toHaveLength(DEFAULT_LAYOUT.cols);
		}
	});

	it("is deterministic for a tick", () => {
		expect(horizonFrame({ layout: DEFAULT_LAYOUT, tick: 7, mode: "dusk" })).toEqual(
			horizonFrame({ layout: DEFAULT_LAYOUT, tick: 7, mode: "dusk" }),
		);
	});

	it("draws the horizon line outside the ship", () => {
		const line = rowText(day[HORIZON_ROW]);
		expect(line.at(-1)).toBe("_");
		expect(line[0]).toBe("_");
	});

	it("draws a bigger, lower sun at dusk and no clouds", () => {
		const dusk = horizonFrame({ layout: DEFAULT_LAYOUT, tick: 0, mode: "dusk" });
		const count = (rows: typeof day, key: string) =>
			rows.flat().reduce((n, run) => (run.c === key ? n + run.t.trim().length : n), 0);
		const sunAbove = (rows: typeof day) =>
			rows
				.slice(0, HORIZON_ROW)
				.flat()
				.filter((run) => run.c === "sun");
		expect(sunAbove(dusk).length).toBeGreaterThan(0);
		expect(count(dusk, "cloud")).toBe(0);
		expect(count(day, "cloud")).toBeGreaterThan(0);
	});
});

describe("ripples", () => {
	it("draws a ring around the tap and nothing far away", () => {
		const ripple = { c: 40, r: 9, t0: 0 };
		expect(ringAt([ripple], 0, 40, 10)?.ch).toBe("-");
		expect(ringAt([ripple], 0, 120, 9)).toBeNull();
	});

	it("stops drawing once the ring has spread out", () => {
		const ripple = { c: 40, r: 9, t0: 0 };
		const late = 100;
		for (let c = 0; c < 100; c++) {
			expect(ringAt([ripple], late, c, 9)).toBeNull();
		}
	});

	it("never draws rings through the ship's hull", () => {
		const { shipC } = DEFAULT_LAYOUT;
		const ripples = [{ c: shipC + 10, r: 7, t0: 0 }];
		for (let rt = 0; rt < 30; rt++) {
			const hull = rowText(
				horizonFrame({ layout: DEFAULT_LAYOUT, tick: 0, mode: "day", ripples, rt })[7],
			).slice(shipC + 4, shipC + 20);
			expect(hull.trim()).toBe("");
		}
	});

	it("never draws rings in the sky", () => {
		const ripples = [{ c: 60, r: 7, t0: 0 }];
		const rows = horizonFrame({ layout: DEFAULT_LAYOUT, tick: 0, mode: "day", ripples, rt: 12 });
		const sky = rows.slice(0, HORIZON_ROW + 1).flat();
		expect(sky.some((run) => run.c === "accent" || run.c === "line-strong")).toBe(false);
	});
});

describe("seaFrame", () => {
	it("draws exact rows and columns", () => {
		const rows = seaFrame({ layout: DEFAULT_LAYOUT, tick: 3, mode: "day" });
		expect(rows).toHaveLength(SEA_ROWS);
		for (const row of rows) {
			expect([...rowText(row)]).toHaveLength(DEFAULT_LAYOUT.cols);
		}
	});

	it("shows gulls by day and stars at dusk", () => {
		const day = seaFrame({ layout: DEFAULT_LAYOUT, tick: 20, mode: "day" }).flat();
		const dusk = seaFrame({ layout: DEFAULT_LAYOUT, tick: 20, mode: "dusk" }).flat();
		expect(day.some((run) => run.c === "gull")).toBe(true);
		expect(dusk.some((run) => run.c === "gull")).toBe(false);
		expect(dusk.some((run) => run.c === "sky" && run.t.includes("·"))).toBe(true);
	});
});

describe("seaVessels", () => {
	it("sails a mini ship on the surface and two boats in a lower lane, the other way", () => {
		const a = seaVessels(DEFAULT_LAYOUT, 100);
		const b = seaVessels(DEFAULT_LAYOUT, 101);
		expect(a.map((v) => v.id)).toEqual(["mini-ship", "sloop", "dinghy"]);
		const steps = a.map((v, i) => (b[i]?.x ?? 0) - v.x);
		expect(steps[0]).toBeLessThan(0);
		expect(steps[1]).toBeGreaterThan(0);
		expect(steps[2]).toBeGreaterThan(0);
		expect((a[1]?.y ?? 0) - (a[0]?.y ?? 0)).toBeGreaterThan(3);
	});

	it("sails one slow sloop on a phone-width sea", () => {
		const [one] = seaVessels(bandLayout(390), 100);
		const [next] = seaVessels(bandLayout(390), 101);
		expect(seaVessels(bandLayout(390), 100).map((v) => v.id)).toEqual(["sloop"]);
		expect((next?.x ?? 0) - (one?.x ?? 0)).toBeLessThan(0.2);
		expect(seaVessels(bandLayout(639), 100)).toHaveLength(1);
		expect(seaVessels(bandLayout(640), 100)).toHaveLength(3);
	});

	it("never lets two boats cover the same cells", () => {
		const width = (v: Vessel) => Math.max(...v.rows.map((row) => rowText(row).length));
		const overlaps = (p: Vessel, q: Vessel) =>
			p.x < q.x + width(q) &&
			q.x < p.x + width(p) &&
			p.y < q.y + q.rows.length &&
			q.y < p.y + p.rows.length;
		for (let t = 0; t < 2000; t += 3) {
			const now = seaVessels(DEFAULT_LAYOUT, t);
			const clash = now.some((p, i) => now.slice(i + 1).some((q) => overlaps(p, q)));
			expect(clash).toBe(false);
		}
	});

	it("moves smoothly between ticks and keeps its keel at the surface", () => {
		for (let t = 0; t < 400; t++) {
			const now = seaVessels(DEFAULT_LAYOUT, t);
			const next = seaVessels(DEFAULT_LAYOUT, t + 1);
			now.forEach((v, i) => {
				const n = next[i];
				if (!n || Math.abs(n.x - v.x) > 3) return; // wrapped round
				expect(Math.abs(n.y - v.y)).toBeLessThan(0.5);
				expect(v.y).toBeGreaterThan(0);
				expect(v.y + v.rows.length).toBeLessThan(SEA_ROWS);
			});
		}
	});

	it("keeps the sea from showing through a hull", () => {
		const tick = 40;
		const rows = seaFrame({ layout: DEFAULT_LAYOUT, tick, mode: "day" });
		const sloop = seaVessels(DEFAULT_LAYOUT, tick).find((v) => v.id === "sloop");
		if (!sloop) throw new Error("no sloop");
		const keel = Math.round(sloop.y + sloop.rows.length - 1);
		const c = Math.round(sloop.x) + 3;
		if (c >= 0 && c < DEFAULT_LAYOUT.cols) {
			expect(rowText(rows[keel] ?? [])[c]).toBe(" ");
		}
	});
});

describe("ship", () => {
	it("colours the flag and portholes", () => {
		const rows = shipRows();
		expect(rows).toHaveLength(SHIP_ART.length);
		expect(rows[0].some((run) => run.c === "accent")).toBe(true);
		expect(rows[6].some((run) => run.c === "sun")).toBe(true);
	});

	it("bobs within 2.5px and 1.4 degrees", () => {
		for (let tick = 0; tick < 60; tick++) {
			const { y, tilt } = shipMotion(tick);
			expect(Math.abs(y)).toBeLessThanOrEqual(2.5);
			expect(Math.abs(tilt)).toBeLessThanOrEqual(1.4);
		}
	});
});

describe("wakeLine", () => {
	it("has the requested length and only wave characters", () => {
		const line = wakeLine(4, 96, 10);
		expect(line).toHaveLength(96);
		expect(line).toMatch(/^[_.\-~]+$/);
	});

	it("moves with the tick", () => {
		expect(wakeLine(1, 60, 0)).not.toBe(wakeLine(1, 60, 5));
	});
});

describe("rowsToHtml", () => {
	it("escapes markup and gives each ≈ its own cell", () => {
		const html = rowsToHtml([[{ c: "sea2", t: "<≈≈&" }]]);
		expect(html).toBe('<div><span data-c="sea2">&lt;<i>≈</i><i>≈</i>&amp;</span></div>');
	});
});

describe("tapCell", () => {
	it("maps pixels to cells and keeps taps in the water", () => {
		expect(tapCell(78, 14, 7)).toEqual({ c: 10, r: 7 });
		expect(tapCell(78, 140, 7)).toEqual({ c: 10, r: 10 });
	});
});
