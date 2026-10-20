import { ProjectCard } from "@/features/projects/components/project-card";
import type { Project } from "@/features/projects/types";

type ProjectListProps = {
	projects: Project[];
};

export function ProjectList({ projects }: ProjectListProps) {
	return (
		<ul>
			<li className="type-eyebrow hidden border-b border-dashed border-border bg-muted px-gutter py-2 text-muted-foreground md:grid md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,1fr)] md:gap-3">
				<span>Year</span>
				<span>Name</span>
				<span>Summary</span>
				<span>Stack</span>
			</li>
			{projects.map((project) => (
				<ProjectCard key={project.slug} project={project} />
			))}
		</ul>
	);
}
