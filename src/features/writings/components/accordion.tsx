"use client";

import { type ReactNode, useId, useState } from "react";
import { cn } from "@/lib/cn";
import { SpyglassIcon } from "./icons";

export function AccordionGroup({ children }: { children?: ReactNode }) {
	return <div className="my-7">{children}</div>;
}

/** A question with a spyglass that extends as the answer opens. */
export function Accordion({
	title,
	defaultOpen = false,
	children,
}: {
	title: string;
	defaultOpen?: boolean;
	children?: ReactNode;
}) {
	const [open, setOpen] = useState(defaultOpen);
	const id = useId();

	return (
		<div className={cn("spyglass", open && "is-open")}>
			<button
				aria-controls={id}
				aria-expanded={open}
				className={cn(
					"grid min-h-10 w-full cursor-pointer grid-cols-[34px_minmax(0,1fr)] items-center gap-x-3.5 border-0 bg-transparent p-0 text-left",
					open ? "text-accent" : "text-muted",
				)}
				onClick={() => setOpen(!open)}
				type="button"
			>
				<SpyglassIcon />
				<span
					className={cn(
						"py-1.5 text-[18px] leading-[26px] transition-colors duration-200 md:text-[20px] md:leading-7",
						open ? "text-accent" : "text-fg hover:text-accent",
					)}
				>
					{title}
				</span>
			</button>
			<div
				className="grid transition-[grid-template-rows] duration-[420ms] ease-tide"
				style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
			>
				<div className="min-h-0 overflow-hidden">
					<div
						className="accordion-body pb-2.5 pl-12 text-[16px] leading-[26px] text-body transition-opacity duration-300 md:text-[17px] md:leading-[27px]"
						id={id}
						inert={!open}
						style={{ opacity: open ? 1 : 0, transitionDelay: open ? "160ms" : "0ms" }}
					>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}
