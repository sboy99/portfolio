import type { ReactNode } from "react";
import { WaveRule } from "@/components/shore/wave-rule";

export function Kbd({ children }: { children?: ReactNode }) {
	return (
		<kbd className="rounded border border-b-[3px] border-line px-1.5 py-px font-mono text-[0.74em] text-fg">
			{children}
		</kbd>
	);
}

/** The numbers that matter, underlined with a wave. */
export function Mark({ children }: { children?: ReactNode }) {
	return (
		<span className="text-fg underline decoration-sea1 decoration-wavy decoration-[1.5px] underline-offset-[5px]">
			{children}
		</span>
	);
}

/** Markdown `>` quotes: a pull quote under a swell. */
export function PullQuote({ children }: { children?: ReactNode }) {
	return (
		<blockquote className="pull-quote my-8 p-0">
			<WaveRule className="text-sea1" length={60} seeds={[13]} />
			<div className="mt-2.5 text-[20px] leading-[31px] text-fg italic md:text-[24px] md:leading-9">
				{children}
			</div>
		</blockquote>
	);
}

/** An ASCII diagram or an image, numbered by CSS (fig. 1, fig. 2 …). */
export function Figure({ caption, children }: { caption?: string; children?: ReactNode }) {
	return (
		<figure className="post-figure my-8">
			{children}
			{caption ? (
				<figcaption className="mt-2.5 font-mono text-[12px] text-muted">{caption}</figcaption>
			) : null}
		</figure>
	);
}
