import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type PageGridProps = HTMLAttributes<HTMLDivElement>;

export function PageGrid({ className, children, ...props }: PageGridProps) {
	return (
		<div
			className={cn("relative flex min-h-full flex-1 flex-col overflow-x-clip", className)}
			{...props}
		>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-full max-w-5xl -translate-x-1/2"
			>
				<span className="absolute inset-y-0 left-4 border-l border-dashed border-border" />
				<span className="absolute inset-y-0 right-4 border-r border-dashed border-border" />
			</div>
			{children}
		</div>
	);
}
