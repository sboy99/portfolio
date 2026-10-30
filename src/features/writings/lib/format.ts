const dayFormatter = new Intl.DateTimeFormat("en-GB", {
	day: "numeric",
	month: "short",
	year: "numeric",
	timeZone: "UTC",
});

/** "12 Oct 2026" from "2026-10-12". */
export function formatPostDate(isoDate: string): string {
	return dayFormatter.format(new Date(`${isoDate}T00:00:00Z`));
}
