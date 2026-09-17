import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ResumeSheetProps = HTMLAttributes<HTMLDivElement>;

function CornerMark({ className }: { className: string }) {
	return (
		<span
			aria-hidden
			className={cn(
				"pointer-events-none absolute size-3 before:absolute before:h-px before:w-full before:bg-accent after:absolute after:h-full after:w-px after:bg-accent",
				className,
			)}
		/>
	);
}

export function ResumeSheet({ className, children, ...props }: ResumeSheetProps) {
	return (
		<div className={cn("relative rounded-lg border border-border bg-card", className)} {...props}>
			<CornerMark className="left-0 top-0 before:left-0 before:top-0 after:left-0 after:top-0" />
			<CornerMark className="right-0 top-0 before:right-0 before:top-0 after:right-0 after:top-0" />
			<CornerMark className="bottom-0 left-0 before:bottom-0 before:left-0 after:bottom-0 after:left-0" />
			<CornerMark className="bottom-0 right-0 before:bottom-0 before:right-0 after:bottom-0 after:right-0" />
			{children}
		</div>
	);
}
