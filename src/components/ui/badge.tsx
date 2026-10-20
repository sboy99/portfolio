import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type BadgeVariant = "accent" | "neutral";

const variantClasses: Record<BadgeVariant, string> = {
	accent: "bg-accent-soft text-accent",
	neutral: "border border-border text-muted-foreground",
};

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
	variant?: BadgeVariant;
};

/**
 * `neutral` is the default for tags such as tech stacks and skills.
 * Reserve `accent` for the one label per item that should stand out.
 */
export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
	return (
		<span
			className={cn(
				"inline-flex items-center rounded-sm px-1.5 py-px font-mono text-2xs",
				variantClasses[variant],
				className,
			)}
			{...props}
		/>
	);
}
