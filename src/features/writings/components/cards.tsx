import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { CompassIcon } from "./icons";

export function CardGroup({ cols = 2, children }: { cols?: 1 | 2; children?: ReactNode }) {
	return (
		<div className={cn("my-7 -mx-3.5 grid gap-2", cols === 2 && "md:grid-cols-2")}>{children}</div>
	);
}

/** A link out: the compass needle swings round to point at it on hover. */
export function Card({ title, href, hint }: { title: string; href: string; hint?: string }) {
	const external = !href.startsWith("/") && !href.startsWith("#");
	const body = (
		<>
			<span className="text-muted transition-colors duration-200 group-hover:text-accent">
				<CompassIcon />
			</span>
			<span className="min-w-0">
				<span className="block text-[18px] leading-6 text-fg transition-colors duration-200 group-hover:text-accent">
					{title}
				</span>
				{hint ? (
					<span className="mt-0.5 block font-mono text-[11px] text-muted">{hint}</span>
				) : null}
			</span>
			<span
				aria-hidden="true"
				className="font-mono text-[13px] text-muted transition-[transform,color] duration-[220ms] ease-tide group-hover:translate-x-1 group-hover:text-accent"
			>
				→
			</span>
		</>
	);
	const className =
		"card-link group grid grid-cols-[24px_minmax(0,1fr)_auto] items-center gap-x-3.5 rounded-md border border-transparent px-3.5 py-3 no-underline";

	return external ? (
		<a className={className} href={href} rel="noreferrer" target="_blank">
			{body}
		</a>
	) : (
		<Link className={className} href={href}>
			{body}
		</Link>
	);
}
