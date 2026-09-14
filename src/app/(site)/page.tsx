import Link from "next/link";
import { Container } from "@/components/layout/container";
import { buttonClassName } from "@/components/ui/button";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { FeaturedProjects } from "@/features/projects/components/featured-projects";
import { getProfileRepository, getProjectRepository } from "@/server/repositories";

export default async function HomePage() {
	const [profile, featuredProjects] = await Promise.all([
		getProfileRepository().get(),
		getProjectRepository().findFeatured(),
	]);

	return (
		<Container className="space-y-10 py-10">
			<ProfileHeader profile={profile} />
			<FeaturedProjects projects={featuredProjects} />
			<p>
				<Link className={buttonClassName("secondary")} href="/projects">
					View all projects
				</Link>
			</p>
		</Container>
	);
}
