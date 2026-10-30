import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { siteConfig } from "@/config/site";
import { CoauthorByline, CoauthorCards } from "@/features/writings/components/co-authors";
import { PostToc } from "@/features/writings/components/post-toc";
import { Subtopics } from "@/features/writings/components/subtopics";
import { formatPostDate } from "@/features/writings/lib/format";
import { pageMetadata } from "@/lib/seo";
import { getWritingRepository } from "@/server/repositories";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
	const posts = await getWritingRepository().findAll();
	return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const post = await getWritingRepository().findBySlug(slug);
	if (post == null) return {};

	const base = pageMetadata({
		title: post.title,
		description: post.description,
		path: `/writing/${slug}`,
	});
	const images = post.cover ? [{ url: post.cover }] : [siteConfig.ogImage];
	return {
		...base,
		alternates: { canonical: post.canonical ?? `/writing/${slug}` },
		authors: [{ name: siteConfig.name }, ...post.coauthorDetails.map((a) => ({ name: a.name }))],
		keywords: post.tags,
		robots: post.draft ? { index: false } : undefined,
		openGraph: {
			...base.openGraph,
			type: "article",
			publishedTime: post.date,
			modifiedTime: post.updated ?? post.date,
			tags: post.tags,
			images,
		},
		twitter: { ...base.twitter, images },
	};
}

export default async function PostPage({ params }: Props) {
	const { slug } = await params;
	const writings = getWritingRepository();
	const [post, all] = await Promise.all([writings.findBySlug(slug), writings.findAll()]);
	if (post == null) notFound();

	const { default: Body } = (await import(`@content/writings/${slug}.mdx`)) as {
		default: ComponentType;
	};
	const index = all.findIndex((p) => p.slug === slug);
	const newer = all[index - 1];
	const older = all[index + 1];

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.description,
		datePublished: post.date,
		dateModified: post.updated ?? post.date,
		url: `${siteConfig.url}/writing/${slug}`,
		keywords: post.tags.join(", ") || undefined,
		author: [
			{ "@type": "Person", name: siteConfig.name, url: siteConfig.url },
			...post.coauthorDetails.map((a) => ({ "@type": "Person", name: a.name })),
		],
	};

	return (
		<div className="lg:grid lg:grid-cols-[minmax(0,680px)_220px] lg:gap-[60px]">
			<main className="pt-6 md:pt-8">
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD built from frontmatter
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
					type="application/ld+json"
				/>
				<p className="type-meta text-muted">
					<Link className="no-underline hover:text-accent" href="/writing">
						← back to the chest
					</Link>
				</p>
				<p className="type-meta mt-6 text-muted">
					<time dateTime={post.date}>{formatPostDate(post.date)}</time> · {post.topic} ·{" "}
					{post.readingTime} min read
					{post.draft ? <span className="text-sun"> · draft</span> : null}
				</p>
				<h1 className="type-display mt-3">{post.title}</h1>
				<p className="type-lead mt-5 text-body italic">{post.description}</p>
				<Subtopics className="mt-4" tags={post.tags} />
				<CoauthorByline authors={post.coauthorDetails} />
				<PostToc toc={post.toc} variant="fold" />

				<article className="post-body mt-10">
					<Body />
				</article>

				<CoauthorCards authors={post.coauthorDetails} />

				<p
					aria-hidden="true"
					className="mt-14 text-center font-mono tracking-[0.4em] text-line-strong"
				>
					~ ~ ~
				</p>
				<nav aria-label="More writing" className="mt-8 grid gap-6 md:grid-cols-2">
					{older ? (
						<p>
							<span className="type-meta block text-muted">← an older find</span>
							<Link className="type-small" href={`/writing/${older.slug}`}>
								{older.title}
							</Link>
						</p>
					) : (
						<span />
					)}
					{newer ? (
						<p className="md:text-right">
							<span className="type-meta block text-muted">a newer find →</span>
							<Link className="type-small" href={`/writing/${newer.slug}`}>
								{newer.title}
							</Link>
						</p>
					) : null}
				</nav>
				<p className="type-small mt-10 text-muted">
					Spotted a leak in the hull?{" "}
					<a href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(`Re: ${post.title}`)}`}>
						Send a message in a bottle
					</a>
					.
				</p>
			</main>
			<aside className="hidden lg:block lg:pt-[72px]">
				<PostToc toc={post.toc} variant="margin" />
			</aside>
		</div>
	);
}
