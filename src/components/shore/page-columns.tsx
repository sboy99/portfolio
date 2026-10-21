import type { CSSProperties, ReactNode } from "react";
import { WaveRule } from "@/components/shore/wave-rule";
import { siteConfig } from "@/config/site";

export type MarginNote = {
	n: string;
	body: ReactNode;
	/** Extra space above the note on desktop, to sit it beside the text it explains. */
	offset?: number;
};

const ELSEWHERE = [
	{ label: "github", href: siteConfig.links.github },
	{ label: "linkedin", href: siteConfig.links.linkedin },
	{ label: "x", href: siteConfig.links.x },
	{ label: "youtube", href: siteConfig.links.youtube },
	{ label: "email", href: `mailto:${siteConfig.email}` },
];

/**
 * The page body: a 680px main column with a 220px margin for notes on desktop.
 * On phones the notes follow the content under a wave.
 */
export function PageColumns({ children, notes }: { children: ReactNode; notes: MarginNote[] }) {
	return (
		<div className="lg:grid lg:grid-cols-[minmax(0,680px)_220px] lg:gap-[60px]">
			<main className="pt-6 md:pt-8">{children}</main>
			<aside
				aria-label="Notes"
				className="type-meta mt-9 flex flex-col gap-3.5 text-muted lg:mt-0 lg:gap-7 lg:pt-[72px]"
			>
				<WaveRule className="text-line-strong lg:hidden" seeds={[7]} />
				{notes.map((note) => (
					<p
						className="lg:mt-[var(--note-top)]"
						key={note.n}
						style={{ "--note-top": `${note.offset ?? 0}px` } as CSSProperties}
					>
						<span className="text-accent">{note.n}</span> {note.body}
					</p>
				))}
				<div className="mt-2.5 lg:mt-[60px]">
					<WaveRule
						className="mb-3 hidden text-line-strong lg:block"
						length={30}
						seeds={[7, 8.85]}
					/>
					<p className="text-fg">Elsewhere</p>
					<p className="mt-2 flex flex-col gap-1">
						{ELSEWHERE.map((link) => (
							<a href={link.href} key={link.label}>
								{link.label}
							</a>
						))}
					</p>
				</div>
			</aside>
		</div>
	);
}
