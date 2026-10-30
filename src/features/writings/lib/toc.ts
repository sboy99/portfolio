import GithubSlugger from "github-slugger";
import type { TocEntry } from "../types";

/**
 * The post's `##` headings with the ids rehype-slug gives them,
 * so the contents can link to each section.
 */
export function buildToc(markdown: string): TocEntry[] {
	const slugger = new GithubSlugger();
	const withoutCode = markdown.replace(/```[\s\S]*?```/g, "");
	const entries: TocEntry[] = [];

	for (const line of withoutCode.split("\n")) {
		const heading = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
		if (heading == null) continue;
		// Every heading takes a slug, so later duplicates are numbered the same way rehype-slug numbers them.
		const id = slugger.slug(heading[2]);
		if (heading[1] === "##") {
			entries.push({ id, title: heading[2].replace(/[`*_]/g, "") });
		}
	}

	return entries;
}
