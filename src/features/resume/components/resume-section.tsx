import type { ReactNode } from "react";
import { WaveRule } from "@/components/shore/wave-rule";

type ResumeSectionProps = {
	id: string;
	label: string;
	seed: number;
	children: ReactNode;
};

export function ResumeSection({ id, label, seed, children }: ResumeSectionProps) {
	return (
		<section aria-labelledby={id} className="pt-[22px]">
			<div className="grid grid-cols-1 gap-2.5 md:grid-cols-[140px_minmax(0,1fr)] md:gap-6">
				<h2 className="type-label text-muted" id={id}>
					{label}
				</h2>
				<div>{children}</div>
			</div>
			<WaveRule className="mt-[22px] text-line-strong" seeds={[seed]} />
		</section>
	);
}
