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
			"Notes from below the waterline: databases, migrations, CI/CD and the backend work behind them, by Sagar Bera.",
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
							New posts also go out by <a href="/writing/feed.xml">RSS</a>.
						</>
					),
				},
			]}
		>
			<h1 className="type-display">Writing</h1>
			<p className="type-lead mt-5 text-body">
				Notes from below the waterline: what broke, what I changed, and what I'd do again.
			</p>
			<WritingList items={items} topics={topics} />
		</PageColumns>
	);
}
