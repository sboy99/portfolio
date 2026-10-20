import { Badge } from "@/components/ui/badge";
import type { SkillGroup } from "@/features/resume/types";

type ResumeSkillsProps = {
	skills: SkillGroup[];
};

export function ResumeSkills({ skills }: ResumeSkillsProps) {
	return (
		<ul className="space-y-3">
			{skills.map((group) => (
				<li key={group.category}>
					<h3 className="type-eyebrow text-muted-foreground">{group.category}</h3>
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
	);
}
