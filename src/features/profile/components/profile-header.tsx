import type { Profile } from "@/features/profile/types";

type ProfileHeaderProps = {
	profile: Profile;
};

export function ProfileHeader({ profile }: ProfileHeaderProps) {
	return (
		<section className="space-y-3 px-3">
			<p className="font-mono text-xs text-muted-foreground">{profile.location}</p>
			<h1 className="max-w-2xl text-2xl font-semibold tracking-tight">{profile.headline}</h1>
			<p className="max-w-2xl text-sm leading-6 text-muted-foreground">{profile.bio}</p>
			<a
				className="inline-flex font-mono text-xs font-medium text-accent hover:underline"
				href={`mailto:${profile.email}`}
			>
				{profile.email}
			</a>
		</section>
	);
}
