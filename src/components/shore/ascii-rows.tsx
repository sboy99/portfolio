import type { Row } from "@/lib/shore/engine";

/** Rows of coloured runs; colours come from the theme through data-c. */
export function AsciiRows({ rows }: { rows: Row[] }) {
	return rows.map((row, r) => (
		// biome-ignore lint/suspicious/noArrayIndexKey: rows are positional and never reorder
		<div key={r}>
			{row.map((run, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: runs are positional and never reorder
				<span data-c={run.c} key={i}>
					{run.t}
				</span>
			))}
		</div>
	));
}
