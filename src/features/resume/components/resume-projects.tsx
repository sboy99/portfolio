import { Badge } from "@/components/ui/badge";
import { HighlightedText } from "@/components/ui/highlighted-text";
import type { Project } from "@/features/projects/types";

type ResumeProjectsProps = {
	projects: Project[];
};

export function ResumeProjects({ projects }: ResumeProjectsProps) {
	return (
		<ul className="divide-y divide-dashed divide-border">
			{projects.map((project) => (
				<li className="py-3 first:pt-0 last:pb-0" key={project.slug}>
					<div className="flex flex-wrap items-baseline justify-between gap-2">
						<h3 className="text-sm font-medium">{project.title}</h3>
						<p className="font-mono text-xs text-muted-foreground">{project.year}</p>
					</div>
					<p className="mt-1.5 text-sm leading-6 text-muted-foreground">
						<HighlightedText text={project.summary} />
					</p>
					<ul aria-label={`Stack for ${project.title}`} className="mt-2 flex flex-wrap gap-1">
						{project.stack.map((item) => (
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
