type MetricDelta = {
	from: string;
	to: string;
};

type MetricProps = {
	value: string;
	delta?: MetricDelta;
};

export function Metric({ value, delta }: MetricProps) {
	if (delta) {
		return (
			<span className="font-semibold tabular-nums">
				{delta.from} → {delta.to}
			</span>
		);
	}

	return <span className="font-semibold tabular-nums">{value}</span>;
}
