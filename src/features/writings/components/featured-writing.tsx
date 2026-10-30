import Link from "next/link";
import { SectionHead } from "@/components/shore/prose";
import { WaveRule } from "@/components/shore/wave-rule";
import { formatPostDate } from "../lib/format";
import type { Writing } from "../types";

/** The home page's pick of posts. Hidden until a post is marked featured. */
export function FeaturedWriting({ posts, total }: { posts: Writing[]; total: number }) {
	if (posts.length === 0) return null;
	return (
		<>
			<SectionHead>Featured writing</SectionHead>
			<ol className="m-0 list-none p-0">
				{posts.map((post, i) => (
					<li className="group first:pt-5" key={post.slug}>
						{i > 0 ? <WaveRule className="mt-2 mb-5 text-line-strong" seeds={[i + 30]} /> : null}
						<p className="type-meta text-muted">
							{formatPostDate(post.date)} · {post.topic} · {post.readingTime} min
						</p>
						<p className="type-title mt-1 transition-transform duration-[220ms] ease-tide group-hover:translate-x-2">
							<Link href={`/writing/${post.slug}`}>{post.title}</Link>
						</p>
						<p className="type-small mt-1.5 text-body">{post.description}</p>
					</li>
				))}
			</ol>
			<p className="type-small pt-6">
				<Link href="/writing">All {total} posts</Link>
			</p>
		</>
	);
}
