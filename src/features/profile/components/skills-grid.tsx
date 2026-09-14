import { Badge } from "@/components/ui/badge";
import { DashedFrame } from "@/components/ui/dashed-frame";
import type { SkillGroup } from "@/features/profile/types";

type SkillsGridProps = {
	skills: SkillGroup[];
};

export function SkillsGrid({ skills }: SkillsGridProps) {
	return (
		<section aria-labelledby="skills-heading" className="space-y-4">
			<h2 className="text-sm font-semibold tracking-tight" id="skills-heading">
				Skills
			</h2>
			<ul className="columns-1 gap-x-8 sm:columns-2">
				{skills.map((group) => (
					<li className="mb-8 break-inside-avoid" key={group.category}>
						<DashedFrame className="p-3">
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
						</DashedFrame>
					</li>
				))}
			</ul>
		</section>
	);
}
