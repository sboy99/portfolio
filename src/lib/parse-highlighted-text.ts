export type HighlightSegment =
	| { type: "text"; value: string }
	| { type: "metric"; value: string; delta?: { from: string; to: string } };

const DELTA_PATTERN = /^(.+?)\s+(?:to|→)\s+(.+)$/u;

function parseMetricValue(value: string): HighlightSegment {
	const deltaMatch = value.match(DELTA_PATTERN);

	if (deltaMatch) {
		return {
			type: "metric",
			value,
			delta: {
				from: deltaMatch[1].trim(),
				to: deltaMatch[2].trim(),
			},
		};
	}

	return { type: "metric", value };
}

export function parseHighlightedText(input: string): HighlightSegment[] {
	const segments: HighlightSegment[] = [];
	let cursor = 0;

	while (cursor < input.length) {
		const open = input.indexOf("[[", cursor);

		if (open === -1) {
			segments.push({ type: "text", value: input.slice(cursor) });
			break;
		}

		const close = input.indexOf("]]", open + 2);

		if (close === -1) {
			segments.push({ type: "text", value: input.slice(cursor) });
			break;
		}

		if (open > cursor) {
			segments.push({ type: "text", value: input.slice(cursor, open) });
		}

		segments.push(parseMetricValue(input.slice(open + 2, close)));
		cursor = close + 2;
	}

	return segments;
}
