import { Children, isValidElement, type ReactElement, type ReactNode } from "react";

type ElementWithChildren = ReactElement<{ children?: ReactNode; "data-language"?: string }>;

/** The plain text inside a rendered node, for the copy button. */
export function textOf(node: ReactNode): string {
	if (typeof node === "string" || typeof node === "number") return String(node);
	if (Array.isArray(node)) return node.map(textOf).join("");
	if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
	return "";
}

export type CodeMeta = {
	/** From ```lang title="file.sql" */
	title: string | null;
	language: string | null;
	pre: ReactNode;
	text: string;
};

/** Pulls the file name, language, `<pre>` and text out of a rehype-pretty-code figure's children. */
export function codeMeta(children: ReactNode): CodeMeta {
	let title: string | null = null;
	let pre: ElementWithChildren | null = null;

	for (const child of Children.toArray(children)) {
		if (!isValidElement(child)) continue;
		const element = child as ElementWithChildren;
		if (element.type === "figcaption") title = textOf(element.props.children).trim() || null;
		if (element.type === "pre") pre = element;
	}

	const language = pre?.props["data-language"] ?? null;
	return {
		title,
		language: language === "plaintext" ? null : language,
		pre,
		text: pre ? textOf(pre.props.children).replace(/\n$/, "") : "",
	};
}
