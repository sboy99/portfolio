"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const RESET_MS = 1800;

export function CopyButton({ text }: { text: string }) {
	const [copied, setCopied] = useState(false);
	const timer = useRef<number | undefined>(undefined);

	useEffect(() => () => window.clearTimeout(timer.current), []);

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(text);
		} catch {
			return;
		}
		setCopied(true);
		window.clearTimeout(timer.current);
		timer.current = window.setTimeout(() => setCopied(false), RESET_MS);
	};

	return (
		<button
			aria-label={copied ? "Copied" : "Copy code"}
			className={cn(
				"-mr-1.5 flex h-8 w-8 cursor-pointer items-center justify-center border-0 bg-transparent p-0 transition-colors duration-200 hover:text-accent",
				copied ? "text-accent" : "text-muted",
			)}
			onClick={copy}
			title={copied ? "Copied" : "Copy code"}
			type="button"
		>
			<svg
				aria-hidden="true"
				fill="none"
				height="15"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.6"
				viewBox="0 0 24 24"
				width="15"
			>
				{copied ? (
					<path d="M5 12.5l4.5 4.5L19 7.5" />
				) : (
					<>
						<rect height="11" rx="2" width="11" x="8.5" y="8.5" />
						<path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2" />
					</>
				)}
			</svg>
			<span aria-live="polite" className="sr-only">
				{copied ? "Copied" : ""}
			</span>
		</button>
	);
}
