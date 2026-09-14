import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLElement>;

export function Card({ className, ...props }: CardProps) {
	return (
		<article className={cn("rounded-md border border-border bg-card p-4", className)} {...props} />
	);
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
	return <h3 className={cn("text-sm font-semibold tracking-tight", className)} {...props} />;
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p className={cn("mt-1.5 text-sm leading-6 text-muted-foreground", className)} {...props} />
	);
}

export function Row({ className, ...props }: HTMLAttributes<HTMLElement>) {
	return <div className={cn("rounded-md px-3 py-2 hover:bg-muted", className)} {...props} />;
}
