import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { HighlightedText } from "@/components/ui/highlighted-text";
import { TextLink } from "@/components/ui/text-link";
import type { Project } from "@/features/projects/types";

type ProjectCardProps = {
	project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
	const hasLinks = Boolean(project.links.github || project.links.live || project.links.docker);

	return (
		<li
			className="border-b border-dashed border-border px-gutter py-3 transition-colors duration-300 delay-75 ease-standard last:border-b-0 hover:bg-surface-hover md:grid md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,1fr)] md:items-start md:gap-3 md:py-2"
			id={project.slug}
		>
			<p className="type-meta text-muted-foreground">{project.year}</p>
			<div className="mt-1 space-y-1 md:mt-0">
				<div className="flex flex-wrap items-center gap-2">
					<h3 className="type-title">
						<ProjectTitleLink project={project} />
					</h3>
					<Badge variant="accent">
						<span className="sr-only">Origin: </span>
						{project.origin}
					</Badge>
				</div>
				{hasLinks ? <ProjectLinks links={project.links} /> : null}
			</div>
			<div className="mt-1.5 md:mt-0">
				<p className="type-body text-muted-foreground">
					<HighlightedText text={project.summary} />
				</p>
				{project.highlights.length > 0 ? (
					<ul className="type-body mt-1.5 list-disc space-y-1 pl-4 text-muted-foreground marker:text-border-strong">
						{project.highlights.map((item) => (
							<li key={item}>
								<HighlightedText text={item} />
							</li>
						))}
					</ul>
				) : null}
			</div>
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

function ProjectLinks({ links }: { links: Project["links"] }) {
	return (
		<p className="type-meta mt-1 flex flex-wrap gap-x-3">
			{links.github ? (
				<TextLink external href={links.github}>
					GitHub
				</TextLink>
			) : null}
			{links.live ? (
				<TextLink external href={links.live}>
					Live
				</TextLink>
			) : null}
			{links.docker ? (
				<TextLink external href={links.docker}>
					Docker
				</TextLink>
			) : null}
		</p>
	);
}

function ProjectTitleLink({ project }: ProjectCardProps) {
	const externalHref = project.links.live ?? project.links.github;

	if (externalHref) {
		return (
			<a
				className="transition-colors duration-150 ease-standard hover:text-accent"
				href={externalHref}
				rel="noopener noreferrer"
				target="_blank"
			>
				{project.title}
				<span className="sr-only"> (opens in a new tab)</span>
			</a>
		);
	}

	return (
		<Link
			className="transition-colors duration-150 ease-standard hover:text-accent"
			href={`/projects#${project.slug}`}
		>
			{project.title}
		</Link>
	);
}
