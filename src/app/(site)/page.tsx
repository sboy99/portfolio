import Link from "next/link";
import { Container } from "@/components/layout/container";
import { buttonClassName } from "@/components/ui/button";
import { DashedFrame, DashedSection } from "@/components/ui/dashed-frame";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { FeaturedProjects } from "@/features/projects/components/featured-projects";
import { getProfileRepository, getProjectRepository } from "@/server/repositories";

export default async function HomePage() {
	const [profile, featuredProjects] = await Promise.all([
		getProfileRepository().get(),
		getProjectRepository().findFeatured(),
	]);

	return (
		<Container>
			<DashedFrame>
				<DashedSection>
					<ProfileHeader profile={profile} />
				</DashedSection>
				<DashedSection>
					<FeaturedProjects projects={featuredProjects} />
				</DashedSection>
				<DashedSection>
					<p className="px-3">
						<Link className={buttonClassName("secondary")} href="/projects">
							View all projects
						</Link>
					</p>
				</DashedSection>
			</DashedFrame>
		</Container>
	);
}
