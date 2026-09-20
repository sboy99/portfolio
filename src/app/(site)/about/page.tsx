import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { DashedFrame, DashedSection } from "@/components/ui/dashed-frame";
import { AchievementsList } from "@/features/profile/components/achievements-list";
import { EducationList } from "@/features/profile/components/education-list";
import { ExperienceList } from "@/features/profile/components/experience-list";
import { LanguagesList } from "@/features/profile/components/languages-list";
import { OpenSourceList } from "@/features/profile/components/open-source-list";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { SkillsGrid } from "@/features/profile/components/skills-grid";
import { getProfileRepository } from "@/server/repositories";

export const metadata: Metadata = {
	title: "About",
	description: "Background, experience, and the stack I work with.",
};

export default async function AboutPage() {
	const profile = await getProfileRepository().get();

	return (
		<Container>
			<DashedFrame>
				<DashedSection>
					<ProfileHeader profile={profile} />
				</DashedSection>
				<DashedSection>
					<ExperienceList experience={profile.experience} />
				</DashedSection>
				<DashedSection>
					<SkillsGrid skills={profile.skills} />
				</DashedSection>
				<DashedSection>
					<EducationList education={profile.education} />
				</DashedSection>
				<DashedSection>
					<LanguagesList languages={profile.languages} />
				</DashedSection>
				<DashedSection>
					<OpenSourceList openSource={profile.openSource} />
				</DashedSection>
				<DashedSection>
					<AchievementsList achievements={profile.achievements} />
				</DashedSection>
			</DashedFrame>
		</Container>
	);
}
