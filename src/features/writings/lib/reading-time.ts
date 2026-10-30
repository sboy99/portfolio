const WORDS_PER_MINUTE = 220;

/** Minutes to read a post's markdown, ignoring frontmatter, code fences and tags. */
export function readingTime(markdown: string): number {
	const prose = markdown
		.replace(/^---\n[\s\S]*?\n---\n/, "")
		.replace(/```[\s\S]*?```/g, "")
		.replace(/<[^>]+>/g, " ");
	const words = prose.split(/\s+/).filter((word) => /\w/.test(word)).length;
	return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
