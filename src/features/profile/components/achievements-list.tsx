import { ExternalLinkIcon } from "@/components/common/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Achievement } from "@/features/profile/types";

type AchievementsListProps = {
	achievements: Achievement[];
};

export function AchievementsList({ achievements }: AchievementsListProps) {
	return (
		<section aria-labelledby="achievements-heading">
			<SectionHeading id="achievements-heading">Achievements</SectionHeading>
			<ul className="divide-y divide-dashed divide-border">
				{achievements.map((item) => (
					<li
						className="px-3 py-3 transition-colors duration-300 delay-75 hover:bg-muted/40"
						key={`${item.title}-${item.issuer}`}
					>
						<div className="flex flex-wrap items-center gap-2">
							<h3 className="text-sm font-medium">{item.title}</h3>
							<a
								aria-label={`View ${item.title} credential (opens in a new tab)`}
								className="text-muted-foreground transition-colors hover:text-foreground"
								href={item.href}
								rel="noopener noreferrer"
								target="_blank"
							>
								<ExternalLinkIcon className="size-3.5" />
							</a>
						</div>
						<p className="font-mono text-xs text-muted-foreground">{item.issuer}</p>
					</li>
				))}
			</ul>
		</section>
	);
}
