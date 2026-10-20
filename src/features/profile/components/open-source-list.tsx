import { List, ListItem } from "@/components/ui/list";
import { SectionHeading } from "@/components/ui/section-heading";
import { TextLink } from "@/components/ui/text-link";
import type { OpenSource } from "@/features/profile/types";

type OpenSourceListProps = {
	openSource: OpenSource[];
};

export function OpenSourceList({ openSource }: OpenSourceListProps) {
	return (
		<section aria-labelledby="open-source-heading">
			<SectionHeading id="open-source-heading">Open Source</SectionHeading>
			<List>
				{openSource.map((item) => (
					<ListItem key={item.name}>
						<h3 className="type-title">{item.name}</h3>
						<p className="type-body mt-1.5 text-muted-foreground">{item.description}</p>
						<p className="type-meta mt-1">
							<TextLink external href={item.href}>
								GitHub
							</TextLink>
						</p>
					</ListItem>
				))}
			</List>
		</section>
	);
}
