"use client";

import { useEffect, useRef, useState } from "react";
import { useSound } from "@/components/shore/sound";
import { WaveRule } from "@/components/shore/wave-rule";
import { HighlightedText } from "@/components/ui/highlighted-text";
import { cn } from "@/lib/cn";

/** When the falling anchor meets the water line; matches the 24% mark of anchor-drop in globals.css. */
const SPLASH_MS = 330;

type AnchorHighlightsProps = {
	slug: string;
	highlights: string[];
	/** Phase of the wave the anchor drops into. */
	seed: number;
};

/**
 * A small boat that lowers its anchor to open a project's highlights and
 * reels it back up to close them. The motion lives in globals.css (anchor-*).
 */
export function AnchorHighlights({ slug, highlights, seed }: AnchorHighlightsProps) {
	const [open, setOpen] = useState(false);
	const [moved, setMoved] = useState(false);
	const { drop } = useSound();
	const splashRef = useRef<number | undefined>(undefined);
	const panelId = `highlights-${slug}`;

	useEffect(() => () => window.clearTimeout(splashRef.current), []);

	const toggle = () => {
		const next = !open;
		setOpen(next);
		setMoved(true);
		window.clearTimeout(splashRef.current);
		if (next) {
			splashRef.current = window.setTimeout(drop, SPLASH_MS);
		}
	};

	return (
		<div className={cn("anchor-box relative mt-2", open ? "is-down" : moved && "is-up")}>
			<button
				aria-controls={panelId}
				aria-expanded={open}
				className={cn(
					"-ml-2.5 flex min-h-11 w-fit cursor-pointer items-center gap-2.5 border-0 bg-transparent px-2.5 font-mono text-[12px] transition-colors duration-200 hover:text-accent",
					open ? "text-accent" : "text-muted",
				)}
				onClick={toggle}
				type="button"
			>
				<span aria-hidden="true" className="relative h-[18px] w-6 flex-none">
					<svg
						aria-hidden="true"
						className="anchor-boat absolute top-0 left-0"
						fill="none"
						height="18"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.4"
						viewBox="0 0 24 18"
						width="24"
					>
						<path d="M12 2v11" />
						<path d="M12 3l6 8h-6" />
						<path d="M2 13h20l-2.6 4H4.6z" />
					</svg>
				</span>
				<span>highlights · {highlights.length}</span>
			</button>
			<div
				className="anchor-fold grid"
				style={{ gridTemplateRows: open ? "1fr" : "0fr", transitionDelay: open ? "0ms" : "760ms" }}
			>
				<div className="min-h-0 overflow-hidden">
					<div
						className="anchor-panel pt-3.5 pb-2.5 pl-[34px]"
						id={panelId}
						inert={!open}
						style={{
							opacity: open ? 1 : 0,
							transform: open ? "none" : "translateY(6px)",
							transitionDelay: open ? "380ms" : "0ms",
						}}
					>
						<WaveRule className="mb-3.5 -ml-[34px] text-line-strong" seeds={[seed]} />
						<ul className="m-0 flex list-none flex-col gap-2.5 p-0">
							{highlights.map((line) => (
								<li
									className="grid grid-cols-[22px_minmax(0,1fr)] text-[16px] leading-[25px] text-body md:text-[17px] md:leading-[27px]"
									key={line}
								>
									<span aria-hidden="true" className="font-mono text-[13px]" data-c="sea2">
										~
									</span>
									<span>
										<HighlightedText markClassName="font-medium text-accent" text={line} />
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
			<div aria-hidden="true" className={cn("anchor-drop", open ? "text-accent" : "text-muted")}>
				<span className="anchor-rope text-muted" />
				<svg
					aria-hidden="true"
					className="anchor-hook"
					fill="none"
					height="14"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.5"
					viewBox="0 0 16 16"
					width="14"
				>
					<circle cx="8" cy="3" r="1.6" />
					<path d="M8 4.6V14" />
					<path d="M5 7.5h6" />
					<path d="M2.5 9.5c.4 2.6 2.7 4.5 5.5 4.5s5.1-1.9 5.5-4.5" />
				</svg>
				<span className="anchor-splash font-mono" data-c="sea2">
					˙ ˙
				</span>
			</div>
		</div>
	);
}
