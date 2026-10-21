import type { Metadata } from "next";
import { PageColumns } from "@/components/shore/page-columns";
import { Mark } from "@/components/shore/prose";
import { WaveRule } from "@/components/shore/wave-rule";
import { HighlightedText } from "@/components/ui/highlighted-text";
import { siteConfig } from "@/config/site";
import { ResumeSection } from "@/features/resume/components/resume-section";
import { formatDate } from "@/lib/format-date";
import { sortExperienceDesc } from "@/lib/resume-order";
import { getProfileRepository } from "@/server/repositories";

export const metadata: Metadata = {
	title: "Resume",
	description: "Professional resume for Sagar Bera — backend and DevOps engineer.",
};

function span(start: string, end: string | null): string {
	return `${formatDate(start)} → ${end == null ? "now" : formatDate(end)}`;
}

function years(start: string, end: string | null): string {
	return `${start.slice(0, 4)} → ${end == null ? "now" : end.slice(0, 4)}`;
}

export default async function ResumePage() {
	const profile = await getProfileRepository().get();
	const experience = sortExperienceDesc(profile.experience);

	return (
		<PageColumns
			notes={[
				{
					n: "1",
					body: "Since May 2023: BuidlersTribe, then Scribble Network from February 2024.",
				},
				{
					n: "2",
					offset: 40,
					body: (
						<>
							The quickest way to reach me is <a href={`mailto:${siteConfig.email}`}>email</a>.
						</>
					),
				},
			]}
		>
			<h1 className="type-display">Résumé</h1>
			<p className="type-lead mt-4 text-body">
				Backend &amp; DevOps engineer in Bengaluru, about three years in.
				<Mark n="1" />
			</p>
			<p className="mt-4 font-mono text-[13px]">
				<a download={siteConfig.resume.fileName} href={siteConfig.resume.path}>
					Download the PDF ↓
				</a>
			</p>
			<WaveRule className="mt-7 text-line-strong" seeds={[4, 5.85]} />

			<ResumeSection id="resume-experience" label="Experience" seed={0.5}>
				{experience.map((job) => (
					<div className="mb-[22px] last:mb-0" key={`${job.company}-${job.startDate}`}>
						<h3 className="type-title font-normal">
							{job.role} <span className="text-muted">at</span> {job.company}
						</h3>
						<p className="type-meta mt-1 text-muted">{span(job.startDate, job.endDate)}</p>
						<p className="type-small mt-2.5 text-body">
							<HighlightedText text={job.summary} />
						</p>
						<ul className="mt-2.5 flex list-none flex-col gap-1.5 p-0">
							{job.highlights.map((item) => (
								<li className="type-small grid grid-cols-[20px_minmax(0,1fr)] text-body" key={item}>
									<span aria-hidden="true" className="font-mono text-accent">
										~
									</span>
									<span>
										<HighlightedText text={item} />
									</span>
								</li>
							))}
						</ul>
					</div>
				))}
			</ResumeSection>

			<ResumeSection id="resume-skills" label="Skills" seed={1.5}>
				<dl className="m-0 flex flex-col gap-2.5">
					{profile.skills.map((group) => (
						<div
							className="grid grid-cols-1 gap-x-3 gap-y-1 md:grid-cols-[96px_minmax(0,1fr)]"
							key={group.category}
						>
							<dt className="font-mono text-[12px] leading-[26px] text-muted lowercase">
								{group.category}
							</dt>
							<dd className="type-small m-0 text-body">{group.items.join(" · ")}</dd>
						</div>
					))}
				</dl>
			</ResumeSection>

			<ResumeSection id="resume-open-source" label="Open source" seed={2.5}>
				{profile.openSource.map((project) => (
					<p className="type-small mb-3 text-body last:mb-0" key={project.name}>
						<a className="text-fg" href={project.href}>
							{project.name}
						</a>
						. {project.description}
					</p>
				))}
			</ResumeSection>

			<ResumeSection id="resume-recognition" label="Recognition" seed={3.5}>
				{profile.achievements.map((item) => (
					<p className="type-small mb-2 last:mb-0" key={item.title}>
						<a href={item.href}>{item.title}</a>{" "}
						<span className="font-mono text-[12px] text-muted">{item.issuer}</span>
					</p>
				))}
			</ResumeSection>

			<ResumeSection id="resume-education" label="Education" seed={4.5}>
				{profile.education.map((item) => (
					<div className="mb-3.5 last:mb-0" key={item.program}>
						<p className="type-small">{item.program}</p>
						<p className="type-meta mt-1 text-muted">
							{[years(item.startDate, item.endDate), item.result, item.school]
								.filter(Boolean)
								.join(" · ")}
						</p>
					</div>
				))}
			</ResumeSection>
		</PageColumns>
	);
}
