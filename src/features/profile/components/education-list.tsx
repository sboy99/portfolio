import { List, ListItem } from "@/components/ui/list";
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
			<List>
				{education.map((item) => (
					<ListItem key={`${item.school}-${item.program}`}>
						<p className="type-meta text-muted-foreground">
							{formatYearRange(item.startDate, item.endDate)}
						</p>
						<h3 className="type-title mt-1">{item.program}</h3>
						<p className="type-meta text-muted-foreground">{item.school}</p>
						{item.result ? (
							<p className="type-meta mt-1 text-muted-foreground">{item.result}</p>
						) : null}
					</ListItem>
				))}
			</List>
		</section>
	);
}
