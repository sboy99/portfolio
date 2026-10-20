import { Badge } from "@/components/ui/badge";
import { HighlightedText } from "@/components/ui/highlighted-text";
import { List, ListItem } from "@/components/ui/list";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Experience } from "@/features/profile/types";
import { formatYearRange } from "@/lib/format-date";

type ExperienceListProps = {
	experience: Experience[];
};

export function ExperienceList({ experience }: ExperienceListProps) {
	return (
		<section aria-labelledby="experience-heading">
			<SectionHeading id="experience-heading">Experience</SectionHeading>
			<List>
				{experience.map((item) => (
					<ListItem key={`${item.company}-${item.role}`}>
						<p className="type-meta text-muted-foreground">
							{formatYearRange(item.startDate, item.endDate)}
						</p>
						<h3 className="type-title mt-1">
							{item.role} · {item.company}
						</h3>
						<p className="type-body mt-1.5 text-muted-foreground">
							<HighlightedText text={item.summary} />
						</p>
						{item.highlights.length > 0 ? (
							<ul
								aria-label={`Highlights at ${item.company}`}
								className="type-body mt-2 list-disc space-y-1 pl-4 text-muted-foreground marker:text-border-strong"
							>
								{item.highlights.map((highlight) => (
									<li key={highlight}>
										<HighlightedText text={highlight} />
									</li>
								))}
							</ul>
						) : null}
						{item.skills.length > 0 ? (
							<ul aria-label={`Skills at ${item.company}`} className="mt-2 flex flex-wrap gap-1">
								{item.skills.map((skill) => (
									<li key={skill}>
										<Badge>{skill}</Badge>
									</li>
								))}
							</ul>
						) : null}
					</ListItem>
				))}
			</List>
		</section>
	);
}
