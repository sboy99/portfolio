import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectList } from "@/features/projects/components/project-list";
import type { Project } from "@/features/projects/types";

type FeaturedProjectsProps = {
	projects: Project[];
};

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
	return (
		<section aria-labelledby="featured-heading">
			<SectionHeading id="featured-heading">Featured work</SectionHeading>
			<ProjectList projects={projects} />
		</section>
	);
}
