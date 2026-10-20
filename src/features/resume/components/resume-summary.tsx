import { HighlightedText } from "@/components/ui/highlighted-text";

type ResumeSummaryProps = {
	bio: string;
};

export function ResumeSummary({ bio }: ResumeSummaryProps) {
	return (
		<p className="type-body text-muted-foreground">
			<HighlightedText text={bio} />
		</p>
	);
}
