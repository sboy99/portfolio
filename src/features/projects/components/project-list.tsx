import { ProjectCard } from "@/features/projects/components/project-card";
import type { Project } from "@/features/projects/types";

type ProjectListProps = {
	projects: Project[];
};

export function ProjectList({ projects }: ProjectListProps) {
	return (
		<ul>
			<li className="hidden border-b border-dashed border-border bg-muted px-3 py-2 text-xs text-muted-foreground md:grid md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,1fr)] md:gap-3">
				<span className="font-mono font-medium">Year</span>
				<span className="font-medium">Name</span>
				<span className="font-medium">Summary</span>
				<span className="font-medium">Stack</span>
			</li>
			{projects.map((project) => (
				<ProjectCard key={project.slug} project={project} />
			))}
		</ul>
	);
}
