import { ExternalLinkIcon } from "@/components/common/icons";
import type { Achievement } from "@/features/resume/types";

type ResumeAchievementsProps = {
	achievements: Achievement[];
};

export function ResumeAchievements({ achievements }: ResumeAchievementsProps) {
	return (
		<ul className="divide-y divide-dashed divide-border">
			{achievements.map((item) => (
				<li className="py-3 first:pt-0 last:pb-0" key={`${item.title}-${item.issuer}`}>
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
					<p className="mt-1 font-mono text-xs text-muted-foreground">{item.issuer}</p>
				</li>
			))}
		</ul>
	);
}
