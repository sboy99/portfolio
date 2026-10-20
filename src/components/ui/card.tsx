import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLElement>;

export function Card({ className, ...props }: CardProps) {
	return (
		<article className={cn("rounded-lg border border-border bg-card p-4", className)} {...props} />
	);
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
	return <h3 className={cn("type-heading", className)} {...props} />;
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
	return <p className={cn("type-body mt-1.5 text-muted-foreground", className)} {...props} />;
}
