import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/features/projects/types";

type ProjectCardProps = {
	project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
	return (
		<li
			className="border-b border-dashed border-border px-3 py-3 transition-colors duration-300 delay-75 last:border-b-0 hover:bg-muted/40 md:grid md:grid-cols-[4.5rem_minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,1fr)] md:items-start md:gap-3 md:py-2"
			id={project.slug}
		>
			<p className="font-mono text-xs text-muted-foreground">{project.year}</p>
			<h3 className="mt-1 text-sm font-medium md:mt-0">
				<ProjectTitleLink project={project} />
			</h3>
			<p className="mt-1.5 text-sm leading-6 text-muted-foreground md:mt-0">{project.summary}</p>
			<ul className="mt-2 flex flex-wrap gap-1 md:mt-0">
				{project.stack.map((item) => (
					<li key={item}>
						<Badge>{item}</Badge>
					</li>
				))}
			</ul>
		</li>
	);
}

function ProjectTitleLink({ project }: ProjectCardProps) {
	const externalHref = project.links.live ?? project.links.github;

	if (externalHref) {
		return (
			<a href={externalHref} rel="noopener noreferrer" target="_blank">
				{project.title}
				<span className="sr-only"> (opens in a new tab)</span>
			</a>
		);
	}

	return <Link href={`/projects#${project.slug}`}>{project.title}</Link>;
}
