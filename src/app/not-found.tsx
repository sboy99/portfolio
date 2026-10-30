import Link from "next/link";

export default function NotFoundPage() {
	return (
		<main className="mx-auto flex w-full max-w-[960px] flex-col items-start gap-4 px-5 py-24 lg:px-0">
			<h1 className="type-display">Lost at sea.</h1>
			<p className="type-lead text-body">The page you were looking for does not exist.</p>
			<Link className="type-small" href="/">
				Back to shore
			</Link>
		</main>
	);
}
