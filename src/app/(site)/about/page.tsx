import type { Metadata } from "next";
import { ExternalLinkIcon } from "@/components/common/icons";
import { Container } from "@/components/layout/container";
import { DashedFrame, DashedSection } from "@/components/ui/dashed-frame";
import { SectionHeading } from "@/components/ui/section-heading";
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
					<section aria-labelledby="education-heading">
						<SectionHeading id="education-heading">Education</SectionHeading>
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
									{item.result ? (
										<p className="mt-1 font-mono text-xs text-muted-foreground">{item.result}</p>
									) : null}
								</li>
							))}
						</ul>
					</section>
				</DashedSection>
				<DashedSection>
					<section aria-labelledby="open-source-heading">
						<SectionHeading id="open-source-heading">Open Source</SectionHeading>
						<ul className="divide-y divide-dashed divide-border">
							{profile.openSource.map((item) => (
								<li
									className="px-3 py-3 transition-colors duration-300 delay-75 hover:bg-muted/40"
									key={item.name}
								>
									<h3 className="text-sm font-medium">{item.name}</h3>
									<p className="mt-1.5 text-sm leading-6 text-muted-foreground">
										{item.description}
									</p>
									<p className="mt-1 font-mono text-xs text-muted-foreground">
										<a
											className="hover:text-foreground"
											href={item.href}
											rel="noopener noreferrer"
											target="_blank"
										>
											GitHub
										</a>
									</p>
								</li>
							))}
						</ul>
					</section>
				</DashedSection>
				<DashedSection>
					<section aria-labelledby="achievements-heading">
						<SectionHeading id="achievements-heading">Achievements</SectionHeading>
						<ul className="divide-y divide-dashed divide-border">
							{profile.achievements.map((item) => (
								<li
									className="px-3 py-3 transition-colors duration-300 delay-75 hover:bg-muted/40"
									key={`${item.title}-${item.issuer}`}
								>
									<div className="flex flex-wrap items-center gap-2">
										<h3 className="text-sm font-medium">{item.title}</h3>
										<a
											aria-label={`View ${item.title} credential (opens in a new tab)`}
											className="text-muted-foreground transition-colors hover:text-foreground"
											href={item.href}
											rel="noopener noreferrer"
											target="_blank"
										>
											<ExternalLinkIcon className="size-3.5" />
										</a>
									</div>
									<p className="font-mono text-xs text-muted-foreground">{item.issuer}</p>
								</li>
							))}
						</ul>
					</section>
				</DashedSection>
			</DashedFrame>
		</Container>
	);
}
