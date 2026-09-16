type ResumeSummaryProps = {
	bio: string;
};

export function ResumeSummary({ bio }: ResumeSummaryProps) {
	return <p className="text-sm leading-6 text-muted-foreground">{bio}</p>;
}
