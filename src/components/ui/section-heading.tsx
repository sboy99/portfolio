import type { ReactNode } from "react";
import { DashedRule } from "@/components/layout/dashed-rule";

type SectionHeadingProps = {
	id: string;
	children: ReactNode;
};

export function SectionHeading({ id, children }: SectionHeadingProps) {
	return (
		<div className="relative pb-4">
			<h2 className="px-3 text-sm font-semibold tracking-tight" id={id}>
				{children}
			</h2>
			<DashedRule edge="bottom" />
		</div>
	);
}
