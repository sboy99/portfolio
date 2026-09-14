import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ProjectList } from "@/features/projects/components/project-list";
import { getProjectRepository } from "@/server/repositories";

export const metadata: Metadata = {
	title: "Projects",
	description: "Selected product and engineering work.",
};

export default async function ProjectsPage() {
	const projects = await getProjectRepository().findAll();

	return (
		<Container className="space-y-6 py-10">
			<header className="space-y-1.5">
				<h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
				<p className="text-sm text-muted-foreground">A selection of systems and product work.</p>
			</header>
			<ProjectList projects={projects} />
		</Container>
	);
}
