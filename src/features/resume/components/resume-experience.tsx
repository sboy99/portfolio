import { Badge } from "@/components/ui/badge";
import type { Experience } from "@/features/resume/types";
import { formatYearRange } from "@/lib/format-date";

type ResumeExperienceProps = {
	experience: Experience[];
};

export function ResumeExperience({ experience }: ResumeExperienceProps) {
	return (
		<ul className="divide-y divide-dashed divide-border">
			{experience.map((item) => (
				<li className="py-3 first:pt-0 last:pb-0" key={`${item.company}-${item.role}`}>
					<div className="flex flex-wrap items-baseline justify-between gap-2">
						<h3 className="text-sm font-medium">
							{item.role} · {item.company}
						</h3>
						<p className="font-mono text-xs text-muted-foreground">
							{formatYearRange(item.startDate, item.endDate)}
						</p>
					</div>
					<p className="mt-1.5 text-sm leading-6 text-muted-foreground">{item.summary}</p>
					{item.skills.length > 0 ? (
						<ul aria-label={`Skills at ${item.company}`} className="mt-2 flex flex-wrap gap-1">
							{item.skills.map((skill) => (
								<li key={skill}>
									<Badge>{skill}</Badge>
								</li>
							))}
						</ul>
					) : null}
				</li>
			))}
		</ul>
	);
}
