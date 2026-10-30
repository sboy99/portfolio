"use client";

import Link from "next/link";
import { useState } from "react";
import { WaveRule } from "@/components/shore/wave-rule";
import { cn } from "@/lib/cn";
import type { TopicCount } from "../types";
import { Subtopics } from "./subtopics";

export type WritingListItem = {
	slug: string;
	title: string;
	description: string;
	date: string;
	/** Already formatted, such as "12 Oct 2026". */
	dateLabel: string;
	topic: string;
	readingTime: number;
	tags: string[];
};

/** Posts by year, newest first, with a chip per topic. */
export function WritingList({ items, topics }: { items: WritingListItem[]; topics: TopicCount[] }) {
	const [topic, setTopic] = useState<string | null>(null);
	const shown = topic == null ? items : items.filter((item) => item.topic === topic);
	const years = [...new Set(shown.map((item) => item.date.slice(0, 4)))];

	if (items.length === 0) {
		return (
			<div className="mt-10">
				<WaveRule className="text-line-strong" seeds={[4, 5.85]} />
				<p className="type-small mt-5 text-muted">
					The chest is empty for now. The first finds are on their way up.
				</p>
			</div>
		);
	}

	const chips: { topic: string | null; label: string; count: number }[] = [
		{ topic: null, label: "all", count: items.length },
		...topics.map((t) => ({ topic: t.topic, label: t.topic, count: t.count })),
	];

	return (
		<>
			{topics.length > 1 ? (
				<fieldset className="m-0 mt-6 flex flex-wrap gap-2 border-0 p-0">
					<legend className="sr-only">Filter by topic</legend>
					{chips.map((chip) => {
						const active = chip.topic === topic;
						return (
							<button
								aria-pressed={active}
								className={cn(
									"h-8 cursor-pointer rounded-full border px-3 font-mono text-[12px] transition-colors duration-200 hover:border-accent hover:text-accent",
									active ? "border-accent text-accent" : "border-line text-fg",
								)}
								key={chip.label}
								onClick={() => setTopic(chip.topic)}
								type="button"
							>
								{chip.label} <span className="text-muted">{chip.count}</span>
							</button>
						);
					})}
				</fieldset>
			) : null}
			{years.map((year) => (
				<section aria-label={year} key={year}>
					<h2 className="type-label mt-10 text-muted">{year}</h2>
					<WaveRule className="mt-4 text-line-strong" seeds={[Number(year) % 7, 5.85]} />
					<ol className="m-0 list-none p-0">
						{shown
							.filter((item) => item.date.startsWith(year))
							.map((item) => (
								<li className="group mt-6" key={item.slug}>
									<p className="type-meta text-muted">
										{item.dateLabel} · {item.topic} · {item.readingTime} min
									</p>
									<p className="type-title mt-1 transition-transform duration-[220ms] ease-tide group-hover:translate-x-2">
										<Link href={`/writing/${item.slug}`}>{item.title}</Link>
									</p>
									<p className="type-small mt-1.5 text-body">{item.description}</p>
									<Subtopics className="mt-2" tags={item.tags} />
								</li>
							))}
					</ol>
				</section>
			))}
		</>
	);
}
