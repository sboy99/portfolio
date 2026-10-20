import { Badge } from "@/components/ui/badge";
import { HighlightedText } from "@/components/ui/highlighted-text";
import { List, ListItem } from "@/components/ui/list";
import type { Project } from "@/features/projects/types";

type ResumeProjectsProps = {
	projects: Project[];
};

export function ResumeProjects({ projects }: ResumeProjectsProps) {
	return (
		<List>
			{projects.map((project) => (
				<ListItem key={project.slug} variant="flush">
					<div className="flex flex-wrap items-baseline justify-between gap-2">
						<h3 className="type-title">{project.title}</h3>
						<p className="type-meta text-muted-foreground">{project.year}</p>
					</div>
					<p className="type-body mt-1.5 text-muted-foreground">
						<HighlightedText text={project.summary} />
					</p>
					<ul aria-label={`Stack for ${project.title}`} className="mt-2 flex flex-wrap gap-1">
						{project.stack.map((item) => (
							<li key={item}>
								<Badge>{item}</Badge>
							</li>
						))}
					</ul>
				</ListItem>
			))}
		</List>
	);
}
