import type { WorkItem } from "@/components/shore/work-list";
import type { Project } from "@/schemas/project";

export function projectHref(project: Project): string | undefined {
	return project.links.live ?? project.links.github ?? undefined;
}

export function toWorkItem(project: Project, href = projectHref(project)): WorkItem {
	return {
		slug: project.slug,
		title: project.title,
		year: project.year,
		summary: project.summary,
		note: project.note,
		stack: project.stack.slice(0, 4).join(" · ").toLowerCase(),
		highlights: project.highlights,
		href,
	};
}
