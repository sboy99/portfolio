import Link from "next/link";
import { AnchorHighlights } from "@/components/shore/anchor-highlights";
import { WaveRule } from "@/components/shore/wave-rule";

export type WorkItem = {
	slug: string;
	title: string;
	year: number;
	summary: string;
	note?: string;
	stack?: string;
	/** Lines with [[marked]] figures, opened from the anchor toggle. */
	highlights?: string[];
	href?: string;
};

function TitleLink({ item }: { item: WorkItem }) {
	if (item.href == null) {
		return item.title;
	}
	if (item.href.startsWith("/")) {
		return <Link href={item.href}>{item.title}</Link>;
	}
	return (
		<a href={item.href} rel="noreferrer" target="_blank">
			{item.title}
		</a>
	);
}

/** Numbered work with a wave between items; hovering an item lights the wave above it. */
export function WorkList({ items }: { items: WorkItem[] }) {
	return (
		<ol className="m-0 list-none p-0">
			{items.map((item, i) => (
				<li
					className="group grid grid-cols-[32px_minmax(0,1fr)] gap-x-3 first:pt-5 md:grid-cols-[56px_minmax(0,1fr)]"
					key={item.slug}
				>
					{i > 0 ? (
						<WaveRule
							className="col-span-full mt-2 mb-5 text-line-strong transition-colors duration-[220ms] group-hover:text-accent"
							seeds={[i - 1]}
						/>
					) : null}
					<span className="font-mono text-[13px] leading-[30px] text-muted">
						{String(i + 1).padStart(2, "0")}
					</span>
					<div>
						<p className="type-title transition-transform duration-[220ms] ease-tide group-hover:translate-x-2">
							<TitleLink item={item} />{" "}
							<span className="font-mono text-[12px] text-muted transition-colors duration-[220ms] group-hover:text-accent">
								{item.year}
							</span>
						</p>
						<p className="type-small mt-1.5 text-body">
							{item.summary}
							{item.note ? (
								<>
									{" "}
									<em className="text-accent">{item.note}</em>
								</>
							) : null}
						</p>
						{item.stack ? (
							<p className="mt-1.5 font-mono text-[12px] text-muted">{item.stack}</p>
						) : null}
						{item.highlights?.length ? (
							<AnchorHighlights highlights={item.highlights} seed={i + 20} slug={item.slug} />
						) : null}
					</div>
				</li>
			))}
		</ol>
	);
}
