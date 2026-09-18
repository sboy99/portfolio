import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
	primary: "bg-accent text-accent-foreground hover:opacity-90",
	secondary: "border border-border bg-background text-foreground hover:bg-muted",
	ghost: "text-foreground hover:bg-muted",
};

export function buttonClassName(variant: ButtonVariant = "primary", className?: string): string {
	return cn(
		"inline-flex h-8 items-center justify-center rounded-md px-3 text-xs font-medium transition-colors",
		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
		variantClasses[variant],
		className,
	);
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: ButtonVariant;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
	{ className, variant = "primary", type = "button", ...props },
	ref,
) {
	return (
		<button className={buttonClassName(variant, className)} ref={ref} type={type} {...props} />
	);
});
