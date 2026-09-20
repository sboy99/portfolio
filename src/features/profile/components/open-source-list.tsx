import { SectionHeading } from "@/components/ui/section-heading";
import type { OpenSource } from "@/features/profile/types";

type OpenSourceListProps = {
	openSource: OpenSource[];
};

export function OpenSourceList({ openSource }: OpenSourceListProps) {
	return (
		<section aria-labelledby="open-source-heading">
			<SectionHeading id="open-source-heading">Open Source</SectionHeading>
			<ul className="divide-y divide-dashed divide-border">
				{openSource.map((item) => (
					<li
						className="px-3 py-3 transition-colors duration-300 delay-75 hover:bg-muted/40"
						key={item.name}
					>
						<h3 className="text-sm font-medium">{item.name}</h3>
						<p className="mt-1.5 text-sm leading-6 text-muted-foreground">{item.description}</p>
						<p className="mt-1 font-mono text-xs text-muted-foreground">
							<a
								className="hover:text-foreground"
								href={item.href}
								rel="noopener noreferrer"
								target="_blank"
							>
								GitHub
							</a>
						</p>
					</li>
				))}
			</ul>
		</section>
	);
}
