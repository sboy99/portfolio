"use client";

import { useEffect } from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

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
		<Container className="flex flex-col items-start gap-4 py-16">
			<h1 className="text-xl font-semibold tracking-tight">Something went wrong</h1>
			<p className="text-sm text-muted-foreground">The page failed to load. You can try again.</p>
			<Button onClick={reset} variant="secondary">
				Try again
			</Button>
		</Container>
	);
}
