import Link from "next/link";
import { Container } from "@/components/layout/container";
import { buttonClassName } from "@/components/ui/button";

export default function NotFoundPage() {
	return (
		<Container className="flex flex-col items-start gap-4 py-16">
			<h1 className="text-xl font-semibold tracking-tight">Page not found</h1>
			<p className="text-sm text-muted-foreground">The page you were looking for does not exist.</p>
			<Link className={buttonClassName()} href="/">
				Back home
			</Link>
		</Container>
	);
}
