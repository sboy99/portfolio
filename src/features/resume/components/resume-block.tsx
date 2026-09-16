import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ResumeBlockProps = {
	id: string;
	label: string;
	children: ReactNode;
	className?: string;
};

export function ResumeBlock({ id, label, children, className }: ResumeBlockProps) {
	return (
		<section
			aria-labelledby={id}
			className={cn(
				"grid gap-4 border-t border-dashed border-border px-4 py-5 sm:grid-cols-[7rem_1fr] sm:gap-6 sm:px-6",
				className,
			)}
		>
			<h2
				className="font-mono text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
				id={id}
			>
				{label}
			</h2>
			<div className="min-w-0">{children}</div>
		</section>
	);
}
