import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentProps } from "react";
import { Accordion, AccordionGroup } from "@/features/writings/components/accordion";
import { Bottle, Buoy, Lighthouse, Pirates } from "@/features/writings/components/callouts";
import { Card, CardGroup } from "@/features/writings/components/cards";
import { CodeBlock, CodeGroup } from "@/features/writings/components/code-block";
import { Figure, Kbd, Mark, PullQuote } from "@/features/writings/components/inline";
import { Step, Steps } from "@/features/writings/components/steps";

/** Site links stay client-side; everything else opens in a new tab. */
function Anchor({ href = "", ...props }: ComponentProps<"a">) {
	if (href.startsWith("/")) return <Link href={href} {...props} />;
	if (href.startsWith("#")) return <a href={href} {...props} />;
	return <a href={href} rel="noreferrer" target="_blank" {...props} />;
}

/** rehype-pretty-code wraps each fenced block in a figure; other figures pass through. */
function FigureOrCode(
	props: ComponentProps<"figure"> & { "data-rehype-pretty-code-figure"?: string },
) {
	if ("data-rehype-pretty-code-figure" in props) return <CodeBlock>{props.children}</CodeBlock>;
	return <figure {...props} />;
}

const components: MDXComponents = {
	a: Anchor,
	blockquote: ({ children }) => <PullQuote>{children}</PullQuote>,
	figure: FigureOrCode,
	Bottle,
	Lighthouse,
	Buoy,
	Pirates,
	CodeGroup,
	Steps,
	Step,
	AccordionGroup,
	Accordion,
	CardGroup,
	Card,
	Figure,
	Kbd,
	Mark,
};

export function useMDXComponents(inherited: MDXComponents): MDXComponents {
	return { ...inherited, ...components };
}
