import type { HTMLAttributes } from "react";
import { DashedRule } from "@/components/layout/dashed-rule";
import { cn } from "@/lib/cn";

type DashedFrameProps = HTMLAttributes<HTMLDivElement>;

type DashedSectionProps = HTMLAttributes<HTMLDivElement>;

export function DashedFrame({ className, children, ...props }: DashedFrameProps) {
	return (
		<div className={cn("relative z-0", className)} {...props}>
			<DashedRule edge="top" />
			<DashedRule edge="bottom" />
			{children}
		</div>
	);
}

export function DashedSection({ className, children, ...props }: DashedSectionProps) {
	return (
		<div
			className={cn(
				"relative z-0 py-6",
				"before:pointer-events-none before:absolute before:left-1/2 before:top-0 before:w-screen before:-translate-x-1/2 before:border-t before:border-dashed before:border-border before:content-['']",
				"first:before:content-none",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}
