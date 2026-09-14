import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function MoonIcon({ className, ...props }: IconProps) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			viewBox="0 0 24 24"
			{...props}
		>
			<path
				d="M21 14.3A8.5 8.5 0 0 1 9.7 3 7.5 7.5 0 1 0 21 14.3Z"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export function ArrowRightIcon({ className, ...props }: IconProps) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			viewBox="0 0 24 24"
			{...props}
		>
			<path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

export function SunIcon({ className, ...props }: IconProps) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			viewBox="0 0 24 24"
			{...props}
		>
			<circle cx="12" cy="12" r="4" />
			<path
				d="M12 3v1.5M12 19.5V21M4.93 4.93l1.06 1.06M17.99 17.99l1.06 1.06M3 12h1.5M19.5 12H21M4.93 19.07l1.06-1.06M17.99 6.01l1.06-1.06"
				strokeLinecap="round"
			/>
		</svg>
	);
}

export function PaletteIcon({ className, ...props }: IconProps) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			viewBox="0 0 24 24"
			{...props}
		>
			<path
				d="M12 3a9 9 0 0 0 0 18c.9 0 1.5-.7 1.5-1.5 0-.4-.1-.7-.3-1-.3-.4-.2-1 .2-1.4.4-.4 1-.5 1.4-.2.3.2.6.3 1 .3A2.5 2.5 0 0 0 18 14.7 9 9 0 0 0 12 3Z"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<circle cx="7.5" cy="10.5" fill="currentColor" r="1" stroke="none" />
			<circle cx="10.5" cy="7.5" fill="currentColor" r="1" stroke="none" />
			<circle cx="14.5" cy="7.5" fill="currentColor" r="1" stroke="none" />
			<circle cx="16.5" cy="11" fill="currentColor" r="1" stroke="none" />
		</svg>
	);
}

export function CheckIcon({ className, ...props }: IconProps) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			viewBox="0 0 24 24"
			{...props}
		>
			<path d="M5 12.5 9.5 17 19 7" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}
