import type { TopicCount, Writing } from "@/features/writings/types";

export interface WritingRepository {
	/** Published posts, newest first. Drafts are included outside production. */
	findAll(): Promise<Writing[]>;
	findBySlug(slug: string): Promise<Writing | null>;
	findFeatured(): Promise<Writing[]>;
	listTopics(): Promise<TopicCount[]>;
}
