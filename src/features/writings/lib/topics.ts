import type { TopicCount } from "../types";

/** Every topic the posts use, with how many posts use it: most used first, then by name. */
export function listTopics(posts: readonly { topic: string }[]): TopicCount[] {
	const counts = new Map<string, number>();
	for (const post of posts) {
		counts.set(post.topic, (counts.get(post.topic) ?? 0) + 1);
	}
	return [...counts]
		.map(([topic, count]) => ({ topic, count }))
		.sort((a, b) => b.count - a.count || a.topic.localeCompare(b.topic));
}
