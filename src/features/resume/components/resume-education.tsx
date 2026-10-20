import { List, ListItem } from "@/components/ui/list";
import type { Education } from "@/features/resume/types";
import { formatYearRange } from "@/lib/format-date";

type ResumeEducationProps = {
	education: Education[];
};

export function ResumeEducation({ education }: ResumeEducationProps) {
	return (
		<List>
			{education.map((item) => (
				<ListItem key={`${item.school}-${item.program}`} variant="flush">
					<div className="flex flex-wrap items-baseline justify-between gap-2">
						<h3 className="type-title">{item.program}</h3>
						<p className="type-meta text-muted-foreground">
							{formatYearRange(item.startDate, item.endDate)}
						</p>
					</div>
					<p className="type-meta mt-1 text-muted-foreground">{item.school}</p>
					{item.result ? (
						<p className="type-meta mt-1 text-muted-foreground">{item.result}</p>
					) : null}
				</ListItem>
			))}
		</List>
	);
}
