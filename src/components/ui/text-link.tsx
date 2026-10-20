import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type TextLinkVariant = "muted" | "accent";

const variantClasses: Record<TextLinkVariant, string> = {
	muted: "text-muted-foreground hover:text-foreground",
	accent: "text-accent underline-offset-4 hover:underline",
};

type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
	variant?: TextLinkVariant;
	/** Opens in a new tab with a safe `rel`. */
	external?: boolean;
};

export function TextLink({ className, variant = "muted", external, ...props }: TextLinkProps) {
	return (
		<a
			className={cn(
				"transition-colors duration-150 ease-standard",
				variantClasses[variant],
				className,
			)}
			{...(external ? { rel: "noopener noreferrer", target: "_blank" } : null)}
			{...props}
		/>
	);
}
