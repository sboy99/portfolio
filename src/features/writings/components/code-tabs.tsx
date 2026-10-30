"use client";

import { type ReactNode, useId, useState } from "react";
import { cn } from "@/lib/cn";
import { CopyButton } from "./copy-button";

type Tab = { label: string; language: string | null; text: string; pre: ReactNode };

export function CodeTabs({ tabs }: { tabs: Tab[] }) {
	const [active, setActive] = useState(0);
	const id = useId();
	const current = tabs[active] ?? tabs[0];
	if (current == null) return null;

	return (
		<figure className="code-block my-7">
			<div className="flex min-h-8 items-center gap-4 pb-1 font-mono text-[11px] text-muted">
				<div aria-label="Files" className="flex min-w-0 gap-4 overflow-x-auto" role="tablist">
					{tabs.map((tab, i) => (
						<button
							aria-controls={`${id}-panel`}
							aria-selected={i === active}
							className={cn(
								"cursor-pointer border-0 bg-transparent p-0 font-mono text-[11px] leading-5 whitespace-nowrap transition-colors duration-200 hover:text-accent",
								i === active ? "text-fg" : "text-muted",
							)}
							id={`${id}-tab-${i}`}
							key={tab.label}
							onClick={() => setActive(i)}
							role="tab"
							type="button"
						>
							{tab.label}
						</button>
					))}
				</div>
				<span className="flex-1" />
				{current.language ? <span>{current.language}</span> : null}
				<CopyButton key={active} text={current.text} />
			</div>
			<div aria-labelledby={`${id}-tab-${active}`} id={`${id}-panel`} role="tabpanel">
				{current.pre}
			</div>
		</figure>
	);
}
