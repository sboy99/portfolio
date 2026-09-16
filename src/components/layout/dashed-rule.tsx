import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type DashedRuleProps = {
	edge: "top" | "bottom";
} & HTMLAttributes<HTMLSpanElement>;

/** Full-viewport dashed horizontal rule. */
export function DashedRule({ edge, className, ...props }: DashedRuleProps) {
	return (
		<span
			aria-hidden
			className={cn(
				"pointer-events-none absolute left-1/2 w-screen -translate-x-1/2 border-dashed border-border",
				edge === "top" ? "top-0 border-t" : "bottom-0 border-b",
				className,
			)}
			{...props}
		/>
	);
}
