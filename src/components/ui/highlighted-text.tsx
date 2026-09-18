import { Metric } from "@/components/ui/metric";
import { parseHighlightedText } from "@/lib/parse-highlighted-text";

type HighlightedTextProps = {
	text: string;
};

export function HighlightedText({ text }: HighlightedTextProps) {
	const segments = parseHighlightedText(text);
	let offset = 0;

	return (
		<>
			{segments.map((segment) => {
				const key = offset;
				offset += segment.value.length;

				if (segment.type === "text") {
					return segment.value;
				}

				return <Metric delta={segment.delta} key={key} value={segment.value} />;
			})}
		</>
	);
}
