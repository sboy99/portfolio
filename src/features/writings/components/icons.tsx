import type { ReactNode } from "react";

type IconProps = { size?: number; className?: string };

/** Line icons on a 24 grid, drawn like the highlights boat. */
function Icon({ size = 21, className, children }: IconProps & { children: ReactNode }) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			fill="none"
			height={size}
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
			viewBox="0 0 24 24"
			width={size}
		>
			{children}
		</svg>
	);
}

export function BottleIcon(props: IconProps) {
	return (
		<Icon {...props}>
			<path d="M10 2.5h4" />
			<path d="M10.5 2.5v4.2L8 9.5V19a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V9.5l-2.5-2.8V2.5" />
			<path d="M10.5 13h3" />
			<path d="M10.5 16h2" />
		</Icon>
	);
}

export function LighthouseIcon(props: IconProps) {
	return (
		<Icon {...props}>
			<path className="lighthouse-beam" d="M3 4.5l5 2" />
			<path className="lighthouse-beam" d="M21 4.5l-5 2" />
			<path d="M10 5.5h4V9h-4z" />
			<path d="M12 3.5v2" />
			<path d="M10 9l-1.2 11h6.4L14 9" />
			<path d="M9.6 14h4.8" />
			<path d="M6.5 20.5h11" />
		</Icon>
	);
}

export function BuoyIcon(props: IconProps) {
	return (
		<Icon {...props}>
			<path d="M12 2.5v4" />
			<path d="M10 4.5h4" />
			<path d="M9 6.5h6l2 9H7z" />
			<path d="M8 11h8" />
			<path d="M2.5 19.5c1.6 1.2 3.2 1.2 4.8 0s3.2-1.2 4.8 0 3.2 1.2 4.8 0 3.2-1.2 4.8 0" />
		</Icon>
	);
}

export function PirateShipIcon(props: IconProps) {
	return (
		<Icon {...props}>
			<path d="M12 2.5v12" />
			<path d="M12 3l-3.5 1.4L12 5.8" />
			<path d="M12 6.5h6.5v6H12" />
			<path d="M14 8l2.5 3" />
			<path d="M16.5 8L14 11" />
			<path d="M2.5 14.5h19l-2.6 4.5H5.1z" />
			<path d="M7 16.8h1M11.5 16.8h1M16 16.8h1" />
		</Icon>
	);
}

export function CompassIcon({ size = 24, className }: IconProps) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			fill="none"
			height={size}
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.3"
			viewBox="0 0 24 24"
			width={size}
		>
			<circle cx="12" cy="12" r="10" />
			<path d="M12 2.8v1.6M12 19.6v1.6M2.8 12h1.6M19.6 12h1.6" />
			<g className="compass-needle">
				<path d="M12 5l2.3 7h-4.6z" fill="currentColor" />
				<path d="M9.7 12h4.6L12 19z" />
			</g>
			<circle cx="12" cy="12" fill="currentColor" r="0.9" stroke="none" />
		</svg>
	);
}

/** Collapsed until its accordion opens; the tubes slide out in CSS (spyglass-*). */
export function SpyglassIcon() {
	return (
		<svg
			aria-hidden="true"
			className="overflow-visible"
			height="18"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.4"
			viewBox="0 0 34 18"
			width="34"
		>
			<g className="spyglass-eyepiece">
				<rect fill="var(--bg)" height="5" rx="1" width="9" x="2" y="6.5" />
			</g>
			<g className="spyglass-middle">
				<rect fill="var(--bg)" height="8" rx="1" width="9" x="10" y="5" />
			</g>
			<rect fill="var(--bg)" height="11" rx="1.5" width="12" x="18" y="3.5" />
			<path d="M30 5v8" strokeWidth="2" />
			<g className="spyglass-glint" fill="currentColor" stroke="none">
				<circle cx="33" cy="4.5" r="0.8" />
				<circle cx="33.5" cy="9" r="0.8" />
				<circle cx="33" cy="13.5" r="0.8" />
			</g>
		</svg>
	);
}

/** A numbered bottle hanging from a knot, for Steps. */
export function StepBottle({ n }: { n: number }) {
	return (
		<svg
			aria-hidden="true"
			className="step-bottle block flex-none"
			fill="none"
			height="46"
			strokeLinecap="round"
			strokeLinejoin="round"
			viewBox="0 0 32 46"
			width="32"
		>
			<g stroke="var(--line-strong)" strokeWidth="1.6">
				<path d="M16 0v7" />
				<path d="M12.5 9.5c0-2.6 7-2.6 7 0s-7 2.6-7 0z" />
				<path d="M14 11.5l-2.5 3" />
				<path d="M18 11.5l2.5 3" />
			</g>
			<g stroke="var(--accent)" strokeWidth="1.4">
				<path d="M13.5 13.5h5" />
				<path d="M14.2 13.5v4.5L9 23v17.5a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V23l-5.2-5v-4.5" />
			</g>
			<text
				className="font-mono"
				fill="var(--accent)"
				fontSize="11"
				textAnchor="middle"
				x="16"
				y="36.5"
			>
				{n}
			</text>
		</svg>
	);
}
