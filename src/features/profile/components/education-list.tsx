import { SectionHeading } from "@/components/ui/section-heading";
import type { Education } from "@/features/profile/types";
import { formatYearRange } from "@/lib/format-date";

type EducationListProps = {
	education: Education[];
};

export function EducationList({ education }: EducationListProps) {
	return (
		<section aria-labelledby="education-heading">
			<SectionHeading id="education-heading">Education</SectionHeading>
			<ul className="divide-y divide-dashed divide-border">
				{education.map((item) => (
					<li
						className="px-3 py-3 transition-colors duration-300 delay-75 hover:bg-muted/40"
						key={`${item.school}-${item.program}`}
					>
						<p className="font-mono text-xs text-muted-foreground">
							{formatYearRange(item.startDate, item.endDate)}
						</p>
						<h3 className="mt-1 text-sm font-medium">{item.program}</h3>
						<p className="font-mono text-xs text-muted-foreground">{item.school}</p>
						{item.result ? (
							<p className="mt-1 font-mono text-xs text-muted-foreground">{item.result}</p>
						) : null}
					</li>
				))}
			</ul>
		</section>
	);
}
