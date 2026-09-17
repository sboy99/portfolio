import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { DashedFrame, DashedSection } from "@/components/ui/dashed-frame";
import { ProjectList } from "@/features/projects/components/project-list";
import { getProjectRepository } from "@/server/repositories";

export const metadata: Metadata = {
	title: "Projects",
	description: "From Kili and Scribble to the CLIs and services underneath.",
};

export default async function ProjectsPage() {
	const projects = await getProjectRepository().findAll();

	return (
		<Container>
			<DashedFrame>
				<DashedSection>
					<header className="space-y-1.5 px-3">
						<h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
						<p className="text-sm text-muted-foreground">
							From Kili and Scribble to the CLIs and services underneath.
						</p>
					</header>
				</DashedSection>
				<DashedSection className="py-0">
					<ProjectList projects={projects} />
				</DashedSection>
			</DashedFrame>
		</Container>
	);
}
