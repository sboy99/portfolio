import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type DashedFrameProps = HTMLAttributes<HTMLDivElement>;

const lineClass = "pointer-events-none absolute border-border border-dashed";

export function DashedFrame({ className, children, ...props }: DashedFrameProps) {
	return (
		<div className={cn("relative", className)} {...props}>
			<span
				aria-hidden
				className={cn(lineClass, "-left-3 -right-3 top-0 border-t")}
			/>
			<span
				aria-hidden
				className={cn(lineClass, "-left-3 -right-3 bottom-0 border-b")}
			/>
			<span
				aria-hidden
				className={cn(lineClass, "-top-3 -bottom-3 left-0 border-l")}
			/>
			<span
				aria-hidden
				className={cn(lineClass, "-top-3 -bottom-3 right-0 border-r")}
			/>
			{children}
		</div>
	);
}
