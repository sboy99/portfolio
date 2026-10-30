import type { TocEntry } from "../types";

function Entries({ toc }: { toc: TocEntry[] }) {
	return (
		<ol className="m-0 flex list-none flex-col gap-1.5 p-0">
			{toc.map((entry, i) => (
				<li className="grid grid-cols-[22px_minmax(0,1fr)]" key={entry.id}>
					<span className="text-muted">{String(i + 1).padStart(2, "0")}</span>
					<a className="no-underline hover:text-accent hover:underline" href={`#${entry.id}`}>
						{entry.title}
					</a>
				</li>
			))}
		</ol>
	);
}

/** The post's ## headings: folded under the title on phones, sticky in the margin on desktop. */
export function PostToc({ toc, variant }: { toc: TocEntry[]; variant: "fold" | "margin" }) {
	if (toc.length < 2) return null;
	if (variant === "fold") {
		return (
			<details className="type-meta mt-7 border-y border-line py-2.5 text-fg lg:hidden">
				<summary className="cursor-pointer text-muted">The chart · {toc.length}</summary>
				<div className="mt-3 pb-1">
					<Entries toc={toc} />
				</div>
			</details>
		);
	}
	return (
		<nav aria-label="On this page" className="type-meta sticky top-8 text-fg">
			<p className="mb-3 text-muted">The chart</p>
			<Entries toc={toc} />
		</nav>
	);
}
