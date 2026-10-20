type MetricDelta = {
	from: string;
	to: string;
};

type MetricProps = {
	value: string;
	delta?: MetricDelta;
};

const metricClassName = "font-semibold text-foreground tabular-nums";

export function Metric({ value, delta }: MetricProps) {
	if (delta) {
		return (
			<span className={metricClassName}>
				{delta.from} → {delta.to}
			</span>
		);
	}

	return <span className={metricClassName}>{value}</span>;
}
