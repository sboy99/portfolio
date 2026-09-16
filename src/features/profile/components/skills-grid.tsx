import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import type { SkillGroup } from "@/features/profile/types";

type SkillsGridProps = {
	skills: SkillGroup[];
};

export function SkillsGrid({ skills }: SkillsGridProps) {
	return (
		<section aria-labelledby="skills-heading">
			<SectionHeading id="skills-heading">Skills</SectionHeading>
			<ul className="grid sm:grid-cols-2">
				{skills.map((group) => (
					<li
						className="border-b border-dashed border-border p-3 max-sm:last:border-b-0 sm:border-r sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0"
						key={group.category}
					>
						<h3 className="font-mono text-xs font-medium text-muted-foreground">
							{group.category}
						</h3>
						<ul className="mt-2 flex flex-wrap gap-1">
							{group.items.map((item) => (
								<li key={item}>
									<Badge>{item}</Badge>
								</li>
							))}
						</ul>
					</li>
				))}
			</ul>
		</section>
	);
}
