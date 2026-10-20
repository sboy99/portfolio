import { BeamField } from "@/components/ui/beam-field";
import { HighlightedText } from "@/components/ui/highlighted-text";
import { TextLink } from "@/components/ui/text-link";
import type { Profile } from "@/features/profile/types";

type ProfileHeaderProps = {
	profile: Profile;
};

export function ProfileHeader({ profile }: ProfileHeaderProps) {
	return (
		<section className="relative isolate space-y-3 px-gutter">
			<BeamField />
			<p className="type-meta text-muted-foreground">{profile.location}</p>
			<h1 className="type-display max-w-2xl">{profile.headline}</h1>
			<p className="type-body max-w-2xl text-muted-foreground">
				<HighlightedText text={profile.bio} />
			</p>
			<TextLink
				className="type-meta inline-flex font-medium"
				href={`mailto:${profile.email}`}
				variant="accent"
			>
				{profile.email}
			</TextLink>
		</section>
	);
}
