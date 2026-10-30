import { Children, isValidElement, type ReactNode } from "react";
import { type CodeMeta, codeMeta } from "../lib/code-meta";
import { CodeTabs } from "./code-tabs";
import { CopyButton } from "./copy-button";

/** The file name and language above a block, with the copy icon. */
export function CodeHeader({ meta, children }: { meta: CodeMeta; children?: ReactNode }) {
	return (
		<div className="flex min-h-8 items-center gap-4 pb-1 font-mono text-[11px] text-muted">
			{children ?? <span className="truncate text-fg">{meta.title}</span>}
			<span className="flex-1" />
			{meta.language ? <span>{meta.language}</span> : null}
			<CopyButton text={meta.text} />
		</div>
	);
}

/** One fenced block: rehype-pretty-code's figure, given the Shoreline header. */
export function CodeBlock({ children }: { children?: ReactNode }) {
	const meta = codeMeta(children);
	return (
		<figure className="code-block my-7">
			<CodeHeader meta={meta} />
			{meta.pre}
		</figure>
	);
}

/** Several fenced blocks behind file tabs. Each block needs a title="…". */
export function CodeGroup({ children }: { children?: ReactNode }) {
	const tabs = Children.toArray(children)
		.filter(isValidElement<{ children?: ReactNode }>)
		.map((child, i) => {
			const meta = codeMeta(child.props.children);
			return { ...meta, label: meta.title ?? meta.language ?? `file ${i + 1}` };
		});

	return <CodeTabs tabs={tabs} />;
}
