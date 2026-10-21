import type { Metadata } from "next";
import { PageColumns } from "@/components/shore/page-columns";
import { Mark } from "@/components/shore/prose";
import { ProjectBrowser, type ProjectGroup } from "@/features/projects/components/project-browser";
import { toWorkItem } from "@/features/projects/lib/to-work-item";
import { sortProjectsByYearDesc } from "@/lib/resume-order";
import type { Project } from "@/schemas/project";
import { getProjectRepository } from "@/server/repositories";

export const metadata: Metadata = {
	title: "Projects",
	description: "From Kili and Scribble to the CLIs and services underneath.",
};

function groupOf(project: Project): ProjectGroup {
	if (project.origin === "Self") return "personal";
	if (project.origin === "Open Source") return "open-source";
	return "scribble";
}

export default async function ProjectsPage() {
	const projects = sortProjectsByYearDesc(await getProjectRepository().findAll());
	const items = projects.map((project) => ({ ...toWorkItem(project), group: groupOf(project) }));

	return (
		<PageColumns
			notes={[
				{
					n: "1",
					body: "Scribble work is a team effort. These are the parts where I owned the backend, data and infrastructure.",
				},
				{
					n: "2",
					offset: 40,
					body: "Personal tools are small Go CLIs I wrote for my own servers and still use.",
				},
			]}
		>
			<h1 className="type-display">Things I've built</h1>
			<p className="type-lead mt-5 text-body">
				Mostly at Scribble Network, where I was the first backend hire.
				<Mark n="1" /> A few are my own, and one is an open source project from before.
			</p>
			<ProjectBrowser items={items} />
		</PageColumns>
	);
}
