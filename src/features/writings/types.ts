import type { Author, WritingFrontmatter } from "@/schemas/writing";

export type TocEntry = {
	id: string;
	title: string;
};

export type Writing = WritingFrontmatter & {
	slug: string;
	/** Minutes, rounded up. */
	readingTime: number;
	toc: TocEntry[];
	coauthorDetails: (Author & { id: string })[];
};

export type TopicCount = {
	topic: string;
	count: number;
};
