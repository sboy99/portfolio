"use client";

import { useEffect } from "react";

type ErrorPageProps = {
	error: Error & { digest?: string };
	reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
	useEffect(() => {
		// biome-ignore lint/suspicious/noConsole: error boundaries should report the original cause
		console.error(error);
	}, [error]);

	return (
		<main className="mx-auto flex w-full max-w-[960px] flex-col items-start gap-4 px-5 py-24 lg:px-0">
			<h1 className="type-display">Something went wrong.</h1>
			<p className="type-lead text-body">The page failed to load. You can try again.</p>
			<button
				className="type-meta h-9 cursor-pointer rounded-full border border-line px-4 transition-colors hover:border-accent hover:text-accent"
				onClick={reset}
				type="button"
			>
				Try again
			</button>
		</main>
	);
}
