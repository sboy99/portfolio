import type { Metadata } from "next";
import { PageColumns } from "@/components/shore/page-columns";
import { WritingList } from "@/features/writings/components/writing-list";
import { formatPostDate } from "@/features/writings/lib/format";
import { pageMetadata } from "@/lib/seo";
import { getWritingRepository } from "@/server/repositories";

export const metadata: Metadata = {
	...pageMetadata({
		title: "Writing",
		description:
			"Treasure Sagar Bera found below the waterline: databases, migrations, CI/CD and the backend work behind them.",
		path: "/writing",
	}),
	alternates: { canonical: "/writing", types: { "application/rss+xml": "/writing/feed.xml" } },
};

export default async function WritingPage() {
	const writings = getWritingRepository();
	const [posts, topics] = await Promise.all([writings.findAll(), writings.listTopics()]);
	const items = posts.map((post) => ({
		slug: post.slug,
		title: post.title,
		description: post.description,
		date: post.date,
		dateLabel: formatPostDate(post.date),
		topic: post.topic,
		readingTime: post.readingTime,
	}));

	return (
		<PageColumns
			notes={[
				{
					n: "1",
					body: (
						<>
							New finds also wash up by <a href="/writing/feed.xml">RSS</a>.
						</>
					),
				},
			]}
		>
			<h1 className="type-display">
				Treasure I found <em>below the waterline</em>
			</h1>
			<p className="type-lead mt-5 text-body">
				What broke, what I hauled back up, and what I'd dive for again.
			</p>
			<WritingList items={items} topics={topics} />
		</PageColumns>
	);
}
