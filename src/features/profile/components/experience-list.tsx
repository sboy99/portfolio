import { DashedFrame } from "@/components/ui/dashed-frame";
import type { Experience } from "@/features/profile/types";
import { formatYearRange } from "@/lib/format-date";

type ExperienceListProps = {
	experience: Experience[];
};

export function ExperienceList({ experience }: ExperienceListProps) {
	return (
		<section aria-labelledby="experience-heading" className="space-y-4">
			<h2 className="text-sm font-semibold tracking-tight" id="experience-heading">
				Experience
			</h2>
			<DashedFrame>
				<ul className="divide-y divide-dashed divide-border">
					{experience.map((item) => (
						<li
							className="px-3 py-3 transition-colors duration-300 delay-75 hover:bg-muted/40"
							key={`${item.company}-${item.role}`}
						>
							<p className="font-mono text-xs text-muted-foreground">
								{formatYearRange(item.startDate, item.endDate)}
							</p>
							<h3 className="mt-1 text-sm font-medium">
								{item.role} · {item.company}
							</h3>
							<p className="mt-1.5 text-sm leading-6 text-muted-foreground">{item.summary}</p>
						</li>
					))}
				</ul>
			</DashedFrame>
		</section>
	);
}
