import type { Education } from "@/features/resume/types";
import { formatYearRange } from "@/lib/format-date";

type ResumeEducationProps = {
	education: Education[];
};

export function ResumeEducation({ education }: ResumeEducationProps) {
	return (
		<ul className="divide-y divide-dashed divide-border">
			{education.map((item) => (
				<li className="py-3 first:pt-0 last:pb-0" key={`${item.school}-${item.program}`}>
					<div className="flex flex-wrap items-baseline justify-between gap-2">
						<h3 className="text-sm font-medium">{item.program}</h3>
						<p className="font-mono text-xs text-muted-foreground">
							{formatYearRange(item.startDate, item.endDate)}
						</p>
					</div>
					<p className="mt-1 font-mono text-xs text-muted-foreground">{item.school}</p>
					{item.result ? (
						<p className="mt-1 font-mono text-xs text-muted-foreground">{item.result}</p>
					) : null}
				</li>
			))}
		</ul>
	);
}
