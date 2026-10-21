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
	shipMotion,
	shipRows,
	tapCell,
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
