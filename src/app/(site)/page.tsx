import Link from "next/link";
import { PageColumns } from "@/components/shore/page-columns";
import { Mark, Sagar, SectionHead } from "@/components/shore/prose";
import { WorkList } from "@/components/shore/work-list";
import { siteConfig } from "@/config/site";
import { toWorkItem } from "@/features/projects/lib/to-work-item";
import { FeaturedWriting } from "@/features/writings/components/featured-writing";
import { sortProjectsByYearDesc } from "@/lib/resume-order";
import { getProjectRepository, getWritingRepository } from "@/server/repositories";

/** Tells search engines who the site is about, for richer results on a name search. */
const PERSON_JSON_LD = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: siteConfig.name,
	url: siteConfig.url,
	image: `${siteConfig.url}/avatar.png`,
	jobTitle: "Backend & DevOps Engineer",
	worksFor: { "@type": "Organization", name: "Scribble Network" },
	address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
	email: `mailto:${siteConfig.email}`,
	sameAs: Object.values(siteConfig.links),
	knowsAbout: ["NestJS", "PostgreSQL", "Docker", "CI/CD", "GCP", "AWS", "Go"],
};

export default async function HomePage() {
	const projects = getProjectRepository();
	const writings = getWritingRepository();
	const [all, featured, posts, featuredPosts] = await Promise.all([
		projects.findAll(),
		projects.findFeatured(),
		writings.findAll(),
		writings.findFeatured(),
	]);
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
			<script
				// biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD built from site config
				dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
				type="application/ld+json"
			/>
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

			<FeaturedWriting posts={featuredPosts.slice(0, 3)} total={posts.length} />
		</PageColumns>
	);
}
