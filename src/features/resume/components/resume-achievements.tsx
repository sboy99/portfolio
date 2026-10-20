import { ExternalLinkIcon } from "@/components/common/icons";
import { List, ListItem } from "@/components/ui/list";
import { TextLink } from "@/components/ui/text-link";
import type { Achievement } from "@/features/resume/types";

type ResumeAchievementsProps = {
	achievements: Achievement[];
};

export function ResumeAchievements({ achievements }: ResumeAchievementsProps) {
	return (
		<List>
			{achievements.map((item) => (
				<ListItem key={`${item.title}-${item.issuer}`} variant="flush">
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
					<p className="type-meta mt-1 text-muted-foreground">{item.issuer}</p>
				</ListItem>
			))}
		</List>
	);
}
