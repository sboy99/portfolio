import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BeamField } from "@/components/ui/beam-field";
import { DashedFrame, DashedSection } from "@/components/ui/dashed-frame";
import { ResumeAchievements } from "@/features/resume/components/resume-achievements";
import { ResumeBlock } from "@/features/resume/components/resume-block";
import { ResumeEducation } from "@/features/resume/components/resume-education";
import { ResumeExperience } from "@/features/resume/components/resume-experience";
import { ResumeHeader } from "@/features/resume/components/resume-header";
import { ResumeProjects } from "@/features/resume/components/resume-projects";
import { ResumeSheet } from "@/features/resume/components/resume-sheet";
import { ResumeSkills } from "@/features/resume/components/resume-skills";
import { ResumeSummary } from "@/features/resume/components/resume-summary";
import { sortExperienceDesc, sortProjectsByYearDesc } from "@/lib/resume-order";
import { getProfileRepository, getProjectRepository } from "@/server/repositories";

export const metadata: Metadata = {
	title: "Resume",
	description: "Professional resume for Sagar Bera — backend and DevOps engineer.",
};

export default async function ResumePage() {
	const [profile, featuredProjects] = await Promise.all([
		getProfileRepository().get(),
		getProjectRepository().findFeatured(),
	]);

	const experience = sortExperienceDesc(profile.experience);
	const projects = sortProjectsByYearDesc(featuredProjects);

	return (
		<Container>
			<DashedFrame>
				<DashedSection>
					<div className="relative isolate px-3">
						<BeamField />
						<ResumeSheet>
							<ResumeHeader profile={profile} />
							<ResumeBlock id="resume-summary" label="Summary">
								<ResumeSummary bio={profile.bio} />
							</ResumeBlock>
							<ResumeBlock id="resume-experience" label="Experience">
								<ResumeExperience experience={experience} />
							</ResumeBlock>
							<ResumeBlock id="resume-projects" label="Projects">
								<ResumeProjects projects={projects} />
							</ResumeBlock>
							<ResumeBlock id="resume-skills" label="Skills">
								<ResumeSkills skills={profile.skills} />
							</ResumeBlock>
							<ResumeBlock id="resume-education" label="Education">
								<ResumeEducation education={profile.education} />
							</ResumeBlock>
							<ResumeBlock id="resume-achievements" label="Achievements">
								<ResumeAchievements achievements={profile.achievements} />
							</ResumeBlock>
						</ResumeSheet>
					</div>
				</DashedSection>
			</DashedFrame>
		</Container>
	);
}
