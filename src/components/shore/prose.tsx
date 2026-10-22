import type { ReactNode } from "react";
import { WaveRule } from "@/components/shore/wave-rule";
import { cn } from "@/lib/cn";

/** A footnote marker that points at a margin note. */
export function Mark({ n, large = false }: { n: string; large?: boolean }) {
	return (
		<sup
			className={cn(
				"top-0 align-super font-mono text-[12px] text-accent",
				large && "md:text-[14px]",
			)}
		>
			{n}
		</sup>
	);
}

/** A mono, uppercase section label opened by a double wave. */
export function SectionHead({ children, className }: { children: ReactNode; className?: string }) {
	return (
		<>
			<h2 className={cn("type-label mt-11 text-muted", className)}>{children}</h2>
			<WaveRule className="mt-4 text-line-strong" seeds={[4, 5.85]} />
		</>
	);
}

/** Bengali for ocean, set in a face that has the glyphs. */
export function Sagar() {
	return (
		<span className="font-bengali" lang="bn">
			সাগর
		</span>
	);
}
