import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { StepBottle } from "./icons";

type StepProps = {
	title: string;
	children?: ReactNode;
	/** Set by Steps. */
	n?: number;
	last?: boolean;
};

/** A walkthrough: numbered bottles knotted along one rope. */
export function Steps({ children }: { children?: ReactNode }) {
	const steps = Children.toArray(children).filter(isValidElement) as ReactElement<StepProps>[];
	return (
		<ol className="steps my-7 list-none p-0">
			{steps.map((step, i) => cloneElement(step, { n: i + 1, last: i === steps.length - 1 }))}
		</ol>
	);
}

export function Step({ title, children, n = 1, last = false }: StepProps) {
	return (
		<li className="grid grid-cols-[32px_minmax(0,1fr)] gap-x-4 md:gap-x-[18px]">
			<div className="flex flex-col items-center">
				<StepBottle n={n} />
				{last ? null : <span aria-hidden="true" className="step-rope min-h-1.5 w-[1.6px] flex-1" />}
			</div>
			<div className={last ? "pt-4" : "pt-4 pb-1"}>
				<p className="text-[20px] leading-7 text-fg">{title}</p>
				<div className="step-body mt-0.5 text-[16px] leading-6 text-body">{children}</div>
			</div>
		</li>
	);
}
