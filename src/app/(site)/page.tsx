import Link from "next/link";
import { PageColumns } from "@/components/shore/page-columns";
import { Mark, Sagar, SectionHead } from "@/components/shore/prose";
import { WorkList } from "@/components/shore/work-list";
import { toWorkItem } from "@/features/projects/lib/to-work-item";
import { sortProjectsByYearDesc } from "@/lib/resume-order";
import { getProjectRepository } from "@/server/repositories";

export default async function HomePage() {
	const projects = getProjectRepository();
	const [all, featured] = await Promise.all([projects.findAll(), projects.findFeatured()]);
	const work = sortProjectsByYearDesc(featured).map((project) => ({
		...toWorkItem(project, "/projects"),
		stack: undefined,
	}));

	return (
		<PageColumns
			notes={[
				{
					n: "1",
					body: (
						<>
							<Sagar /> (sha·gor) is Bengali for ocean. Hence the water.
						</>
					),
				},
				{
					n: "2",
					offset: 120,
					body: "Also: moved core data from MongoDB to Postgres, and production from AWS to GCP, with no downtime.",
				},
			]}
		>
			<h1 className="type-display">
				Hi, I'm Sagar.
				<Mark large n="1" /> I look after the parts of a product that live{" "}
				<em>below the waterline.</em>
			</h1>
			<p className="type-lead mt-6 text-body">
				I'm a backend and DevOps engineer at Scribble Network, where I joined as the first backend
				hire. I own the APIs, the PostgreSQL schemas and the Docker and CI/CD setup that keep them
				running, for products used by 50,000+ creators.
				<Mark n="2" />
			</p>
			<p className="type-lead mt-5 text-body">
				Before that I rebuilt BuidlersTribe's Drupal site as a MERN app. Outside work I write small
				Go tools, like a Postgres backup CLI and a systemd timer helper.
			</p>

			<SectionHead>Selected work</SectionHead>
			<WorkList items={work} />
			<p className="type-small pt-6">
				<Link href="/projects">All {all.length} projects</Link>
			</p>
		</PageColumns>
	);
}
