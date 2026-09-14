import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { DashedFrame } from "@/components/ui/dashed-frame";
import { ExperienceList } from "@/features/profile/components/experience-list";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { SkillsGrid } from "@/features/profile/components/skills-grid";
import { formatYearRange } from "@/lib/format-date";
import { getProfileRepository } from "@/server/repositories";

export const metadata: Metadata = {
	title: "About",
	description: "Background, experience, and the stack I work with.",
};

export default async function AboutPage() {
	const profile = await getProfileRepository().get();

	return (
		<Container className="space-y-10 py-10">
			<ProfileHeader profile={profile} />
			<ExperienceList experience={profile.experience} />
			<SkillsGrid skills={profile.skills} />
			<section aria-labelledby="education-heading" className="space-y-4">
				<h2 className="text-sm font-semibold tracking-tight" id="education-heading">
					Education
				</h2>
				<DashedFrame>
					<ul className="divide-y divide-dashed divide-border">
						{profile.education.map((item) => (
							<li
								className="px-3 py-3 transition-colors duration-300 delay-75 hover:bg-muted/40"
								key={`${item.school}-${item.program}`}
							>
								<p className="font-mono text-xs text-muted-foreground">
									{formatYearRange(item.startDate, item.endDate)}
								</p>
								<h3 className="mt-1 text-sm font-medium">{item.program}</h3>
								<p className="font-mono text-xs text-muted-foreground">{item.school}</p>
							</li>
						))}
					</ul>
				</DashedFrame>
			</section>
		</Container>
	);
}
