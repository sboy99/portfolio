import type { Profile } from "@/features/resume/types";
import { ResumeDownload } from "./resume-download";

type ResumeHeaderProps = {
	profile: Profile;
};

export function ResumeHeader({ profile }: ResumeHeaderProps) {
	return (
		<header className="space-y-4 px-4 py-6 sm:px-6">
			<div className="space-y-2">
				<p className="font-mono text-xs text-muted-foreground">{profile.location}</p>
				<h1 className="text-2xl font-semibold tracking-tight">{profile.name}</h1>
				<p className="font-mono text-xs font-medium text-accent">{profile.title}</p>
			</div>
			<div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
				{profile.phone ? <span>{profile.phone}</span> : null}
				{profile.phone ? <span aria-hidden className="text-border">
						·
					</span> : null}
				<a className="hover:text-foreground" href={`mailto:${profile.email}`}>
					{profile.email}
				</a>
				{profile.socials.map((social) => (
					<span className="flex items-center gap-3" key={social.label}>
						<span aria-hidden className="text-border">
							·
						</span>
						<a
							className="hover:text-foreground"
							href={social.href}
							rel="noopener noreferrer"
							target="_blank"
						>
							{social.label}
						</a>
					</span>
				))}
			</div>
			<ResumeDownload />
		</header>
	);
}
