import { ProjectList } from "@/features/projects/components/project-list";
import type { Project } from "@/features/projects/types";

type FeaturedProjectsProps = {
	projects: Project[];
};

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
	return (
		<section aria-labelledby="featured-heading" className="space-y-4">
			<h2 className="text-sm font-semibold tracking-tight" id="featured-heading">
				Featured work
			</h2>
			<ProjectList projects={projects} />
		</section>
	);
}
