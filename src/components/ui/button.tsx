import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "icon";

const variantClasses: Record<ButtonVariant, string> = {
	primary: "bg-accent text-accent-foreground hover:bg-accent-hover",
	secondary:
		"border border-border bg-background text-foreground hover:border-border-strong hover:bg-muted",
	ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
};

const sizeClasses: Record<ButtonSize, string> = {
	sm: "h-8 gap-1.5 px-3 text-xs",
	icon: "size-8",
};

type ButtonStyleOptions = {
	variant?: ButtonVariant;
	size?: ButtonSize;
	className?: string;
};

export function buttonClassName({
	variant = "primary",
	size = "sm",
	className,
}: ButtonStyleOptions = {}): string {
	return cn(
		"inline-flex shrink-0 items-center justify-center rounded-md font-medium whitespace-nowrap",
		"transition-colors duration-150 ease-standard",
		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
		"disabled:pointer-events-none disabled:opacity-50",
		variantClasses[variant],
		sizeClasses[size],
		className,
	);
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: ButtonVariant;
	size?: ButtonSize;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
	{ className, variant = "primary", size = "sm", type = "button", ...props },
	ref,
) {
	return (
		<button
			className={buttonClassName({ variant, size, className })}
			ref={ref}
			type={type}
			{...props}
		/>
	);
});
