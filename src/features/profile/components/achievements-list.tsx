import { ExternalLinkIcon } from "@/components/common/icons";
import { List, ListItem } from "@/components/ui/list";
import { SectionHeading } from "@/components/ui/section-heading";
import { TextLink } from "@/components/ui/text-link";
import type { Achievement } from "@/features/profile/types";

type AchievementsListProps = {
	achievements: Achievement[];
};

export function AchievementsList({ achievements }: AchievementsListProps) {
	return (
		<section aria-labelledby="achievements-heading">
			<SectionHeading id="achievements-heading">Achievements</SectionHeading>
			<List>
				{achievements.map((item) => (
					<ListItem key={`${item.title}-${item.issuer}`}>
						<div className="flex flex-wrap items-center gap-2">
							<h3 className="type-title">{item.title}</h3>
							<TextLink
								aria-label={`View ${item.title} credential (opens in a new tab)`}
								external
								href={item.href}
							>
								<ExternalLinkIcon className="size-3.5" />
							</TextLink>
						</div>
						<p className="type-meta text-muted-foreground">{item.issuer}</p>
					</ListItem>
				))}
			</List>
		</section>
	);
}
