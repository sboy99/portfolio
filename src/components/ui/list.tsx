import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ListProps = HTMLAttributes<HTMLUListElement>;

/** Vertical list separated by dashed rules, matching the page grid. */
export function List({ className, ...props }: ListProps) {
	return <ul className={cn("divide-y divide-dashed divide-border", className)} {...props} />;
}

type ListItemVariant = "row" | "flush";

const variantClasses: Record<ListItemVariant, string> = {
	row: "px-gutter py-3 transition-colors duration-300 delay-75 ease-standard hover:bg-surface-hover",
	flush: "py-3 first:pt-0 last:pb-0",
};

type ListItemProps = HTMLAttributes<HTMLLIElement> & {
	/** `row` spans the frame with a hover fill; `flush` sits inside a padded container. */
	variant?: ListItemVariant;
};

export function ListItem({ className, variant = "row", ...props }: ListItemProps) {
	return <li className={cn(variantClasses[variant], className)} {...props} />;
}
