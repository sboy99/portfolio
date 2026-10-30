import { parseHighlightedText } from "@/lib/parse-highlighted-text";

type HighlightedTextProps = {
	text: string;
	/** Classes for the marked figures. */
	markClassName?: string;
};

/** Renders [[marked]] figures in the foreground colour so they stand out of body text. */
export function HighlightedText({ text, markClassName = "text-fg" }: HighlightedTextProps) {
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

				return (
					<span className={markClassName} key={key}>
						{segment.value}
					</span>
				);
			})}
		</>
	);
}
