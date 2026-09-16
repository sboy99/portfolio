import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/features/projects/types";

type ProjectCardProps = {
	project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
	const hasLinks = Boolean(project.links.github || project.links.live);

	return (
		<li
			className="border-b border-dashed border-border px-3 py-3 transition-colors duration-300 delay-75 last:border-b-0 hover:bg-muted/40 md:grid md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,1fr)] md:items-start md:gap-3 md:py-2"
			id={project.slug}
		>
			<p className="font-mono text-xs text-muted-foreground">{project.year}</p>
			<div className="mt-1 space-y-1 md:mt-0">
				<div className="flex flex-wrap items-center gap-2">
					<h3 className="text-sm font-medium">
						<ProjectTitleLink project={project} />
					</h3>
					<Badge>
						<span className="sr-only">Origin: </span>
						{project.origin}
					</Badge>
				</div>
				{hasLinks ? (
					<p className="mt-1 flex flex-wrap gap-x-3 font-mono text-xs text-muted-foreground">
						{project.links.github ? (
							<a
								className="hover:text-foreground"
								href={project.links.github}
								rel="noopener noreferrer"
								target="_blank"
							>
								GitHub
							</a>
						) : null}
						{project.links.live ? (
							<a
								className="hover:text-foreground"
								href={project.links.live}
								rel="noopener noreferrer"
								target="_blank"
							>
								Live
							</a>
						) : null}
					</p>
				) : null}
			</div>
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
