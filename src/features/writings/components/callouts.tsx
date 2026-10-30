import type { ComponentType, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { BottleIcon, BuoyIcon, LighthouseIcon, PirateShipIcon } from "./icons";

type Kind = "note" | "tip" | "warning" | "danger";

const KINDS: Record<
	Kind,
	{
		name: string;
		stamp: string;
		tone: string;
		Icon: ComponentType<{ className?: string }>;
		motion: string;
	}
> = {
	note: {
		name: "Message in a bottle",
		stamp: "note",
		tone: "text-accent border-accent",
		Icon: BottleIcon,
		motion: "callout-bob",
	},
	tip: {
		name: "Lighthouse",
		stamp: "tip",
		tone: "text-sea2 border-sea2",
		Icon: LighthouseIcon,
		motion: "callout-beam",
	},
	warning: {
		name: "Buoy",
		stamp: "warn",
		tone: "text-sun border-sun",
		Icon: BuoyIcon,
		motion: "callout-rock",
	},
	danger: {
		name: "Pirates",
		stamp: "danger",
		tone: "text-danger border-danger",
		Icon: PirateShipIcon,
		motion: "callout-rock",
	},
};

type CalloutProps = {
	/** Replaces the default label, such as "Lighthouse". */
	title?: string;
	children: ReactNode;
};

/** An aside in the flow of a post, stamped with what you meet at sea. */
function Callout({ kind, title, children }: CalloutProps & { kind: Kind }) {
	const { name, stamp, tone, Icon, motion } = KINDS[kind];
	return (
		<aside className="my-7 grid grid-cols-[44px_minmax(0,1fr)] gap-x-4 py-1.5">
			<span
				aria-hidden="true"
				className={cn("h-[50px] w-[44px] rounded-[3px] border border-dashed p-[3px]", tone)}
			>
				<span className="flex h-full w-full flex-col items-center justify-center gap-[3px] bg-code-bg">
					<Icon className={cn("shrink-0", motion)} />
					<span className="font-mono text-[7px] leading-none uppercase tracking-[0.08em] text-muted">
						{stamp}
					</span>
				</span>
			</span>
			<div>
				<p className={cn("font-mono text-[11px] uppercase leading-[18px] tracking-[0.08em]", tone)}>
					{title ?? name}
				</p>
				<div className="callout-body mt-0.5 text-[16px] leading-[22px] text-body">{children}</div>
			</div>
		</aside>
	);
}

export function Bottle(props: CalloutProps) {
	return <Callout kind="note" {...props} />;
}

export function Lighthouse(props: CalloutProps) {
	return <Callout kind="tip" {...props} />;
}

export function Buoy(props: CalloutProps) {
	return <Callout kind="warning" {...props} />;
}

export function Pirates(props: CalloutProps) {
	return <Callout kind="danger" {...props} />;
}
