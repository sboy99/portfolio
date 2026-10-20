import { TextLink } from "@/components/ui/text-link";
import type { Profile } from "@/features/resume/types";
import { ResumeDownload } from "./resume-download";

type ResumeHeaderProps = {
	profile: Profile;
};

export function ResumeHeader({ profile }: ResumeHeaderProps) {
	return (
		<header className="space-y-4 px-4 py-6 sm:px-6">
			<div className="space-y-2">
				<p className="type-meta text-muted-foreground">{profile.location}</p>
				<h1 className="type-display">{profile.name}</h1>
				<p className="type-meta font-medium text-accent">{profile.title}</p>
			</div>
			<div className="type-meta flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground">
				{profile.phone ? <span>{profile.phone}</span> : null}
				{profile.phone ? (
					<span aria-hidden className="text-border">
						·
					</span>
				) : null}
				<TextLink href={`mailto:${profile.email}`}>{profile.email}</TextLink>
				{profile.socials.map((social) => (
					<span className="flex items-center gap-3" key={social.label}>
						<span aria-hidden className="text-border">
							·
						</span>
						<TextLink external href={social.href}>
							{social.label}
						</TextLink>
					</span>
				))}
			</div>
			<ResumeDownload />
		</header>
	);
}
