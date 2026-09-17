import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HeroBeam, START_DELAY_MS } from "./hero-beam";

const SNAP_CLASS = "left-[round(down,var(--beam-left),var(--beam-grid-gap))]";
const BEAM_COUNT = 10;

describe("HeroBeam", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.spyOn(Math, "random").mockReturnValue(0);
	});

	afterEach(() => {
		cleanup();
		vi.useRealTimers();
		vi.restoreAllMocks();
	});

	it("renders only the grid before the start delay", () => {
		const { container } = render(<HeroBeam />);

		const field = container.firstElementChild;
		expect(field).not.toBeNull();
		expect(field).toHaveAttribute("aria-hidden", "true");
		expect(field).toHaveClass("pointer-events-none");
		expect(field).toHaveClass("beam-grid");
		expect(field).toHaveClass("inset-x-0");
		expect(field).not.toHaveClass("-inset-x-3");

		const columns = field?.querySelectorAll(":scope > span") ?? [];
		expect(columns).toHaveLength(0);
	});

	it("seeds snapped beams after the start delay", () => {
		const { container } = render(<HeroBeam />);

		act(() => {
			vi.advanceTimersByTime(START_DELAY_MS);
		});

		const field = container.firstElementChild;
		const columns = [...(field?.querySelectorAll(":scope > span") ?? [])];
		expect(columns).toHaveLength(BEAM_COUNT);

		for (const [index, column] of columns.entries()) {
			expect(column).toHaveClass(SNAP_CLASS);
			expect(column.getAttribute("style")).toMatch(/--beam-left:/);
			expect(column).not.toHaveClass("bg-border");

			if (index % 2 === 1) {
				expect(column).toHaveClass("hidden");
				expect(column).toHaveClass("sm:block");
			} else {
				expect(column).not.toHaveClass("hidden");
			}

			const beams = column.querySelectorAll(":scope > span");
			expect(beams).toHaveLength(1);

			const beam = beams[0];
			expect(beam).toHaveClass("animate-beam-fall");
			expect(beam).toHaveClass("motion-reduce:hidden");
			expect(beam).toHaveClass("h-full");
			expect(beam).toHaveClass("scale-x-50");
			expect(beam).toHaveClass("from-transparent");
			expect(beam).toHaveClass("via-accent/40");
			expect(beam).toHaveClass("to-transparent");

			const style = beam.getAttribute("style") ?? "";
			expect(style).toContain("animation-delay: 0.2s");
			expect(style).toContain("animation-duration: 2.4s");
			expect(style).not.toContain("--beam-len");
		}
	});
});
