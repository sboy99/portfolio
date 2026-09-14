const dateFormatter = new Intl.DateTimeFormat("en-US", {
	year: "numeric",
	month: "short",
});

function yearFromIso(isoDate: string): number {
	return Number(isoDate.slice(0, 4));
}

export function formatDate(isoDate: string): string {
	return dateFormatter.format(new Date(`${isoDate}T00:00:00`));
}

export function formatYearRange(start: string, end: string | null): string {
	const startYear = yearFromIso(start);

	if (end === null) {
		return `${startYear} — Present`;
	}

	const endYear = yearFromIso(end);
	return startYear === endYear ? `${startYear}` : `${startYear} — ${endYear}`;
}
