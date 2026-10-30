import { cn } from "@/lib/cn";

/** A post's tags, shown as its subtopics under the topic. */
export function Subtopics({ tags, className }: { tags: string[]; className?: string }) {
	if (tags.length === 0) return null;
	return (
		<ul
			aria-label="Subtopics"
			className={cn(
				"m-0 flex list-none flex-wrap gap-x-4 gap-y-1 p-0 type-meta text-muted",
				className,
			)}
		>
			{tags.map((tag) => (
				<li key={tag}>
					<span aria-hidden="true" className="text-accent">
						~{" "}
					</span>
					{tag}
				</li>
			))}
		</ul>
	);
}
