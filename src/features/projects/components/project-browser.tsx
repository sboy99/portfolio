"use client";

import { useState } from "react";
import { WaveRule } from "@/components/shore/wave-rule";
import { type WorkItem, WorkList } from "@/components/shore/work-list";
import { cn } from "@/lib/cn";

export type ProjectGroup = "scribble" | "personal" | "open-source";

const FILTERS: { id: ProjectGroup | "all"; label: string }[] = [
	{ id: "all", label: "all" },
	{ id: "scribble", label: "scribble" },
	{ id: "personal", label: "personal" },
	{ id: "open-source", label: "open source" },
];

type ProjectBrowserProps = {
	items: (WorkItem & { group: ProjectGroup })[];
};

export function ProjectBrowser({ items }: ProjectBrowserProps) {
	const [filter, setFilter] = useState<ProjectGroup | "all">("all");
	const shown = filter === "all" ? items : items.filter((item) => item.group === filter);
	const heading = filter === "all" ? "All work" : FILTERS.find((f) => f.id === filter)?.label;

	return (
		<>
			<fieldset className="m-0 mt-6 flex flex-wrap gap-2 border-0 p-0">
				<legend className="sr-only">Filter projects</legend>
				{FILTERS.map((f) => {
					const count =
						f.id === "all" ? items.length : items.filter((item) => item.group === f.id).length;
					const active = f.id === filter;
					return (
						<button
							aria-pressed={active}
							className={cn(
								"h-8 cursor-pointer rounded-full border px-3 font-mono text-[12px] transition-colors duration-200 hover:border-accent hover:text-accent",
								active ? "border-accent text-accent" : "border-line text-fg",
							)}
							key={f.id}
							onClick={() => setFilter(f.id)}
							type="button"
						>
							{f.label} <span className="text-muted">{count}</span>
						</button>
					);
				})}
			</fieldset>
			<h2 aria-live="polite" className="type-label mt-9 text-muted">
				{heading} · {shown.length}
			</h2>
			<WaveRule
				className="mt-4 text-line-strong transition-colors duration-[220ms]"
				seeds={[4, 5.85]}
			/>
			<WorkList items={shown} />
		</>
	);
}
