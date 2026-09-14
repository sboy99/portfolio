"use client";

import type { CSSProperties } from "react";
import { CheckIcon } from "@/components/common/icons";
import { cn } from "@/lib/cn";

export type SwatchOption<Id extends string = string> = {
	id: Id;
	label: string;
	swatch: string;
};

type SwatchGridProps<Id extends string> = {
	label: string;
	value: Id;
	options: readonly SwatchOption<Id>[];
	onChange: (id: Id) => void;
};

export function SwatchGrid<Id extends string>({
	label,
	value,
	options,
	onChange,
}: SwatchGridProps<Id>) {
	return (
		<fieldset className="space-y-2">
			<legend className="text-xs font-medium text-muted-foreground">{label}</legend>
			<div className="grid grid-cols-3 gap-1">
				{options.map((option) => {
					const selected = option.id === value;
					const inputId = `${label}-${option.id}`;

					return (
						<label
							className={cn(
								"flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-xs text-foreground hover:bg-muted",
								"has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
								selected && "bg-muted",
							)}
							htmlFor={inputId}
							key={option.id}
						>
							<input
								checked={selected}
								className="sr-only"
								id={inputId}
								name={label}
								onChange={() => onChange(option.id)}
								type="radio"
								value={option.id}
							/>
							<span
								className="size-2.5 shrink-0 rounded-full bg-(--swatch) ring-1 ring-border"
								style={{ "--swatch": option.swatch } as CSSProperties}
							/>
							<span className="min-w-0 flex-1 truncate">{option.label}</span>
							{selected ? <CheckIcon className="size-3 text-accent" /> : null}
						</label>
					);
				})}
			</div>
		</fieldset>
	);
}
