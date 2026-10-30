import type { MetadataRoute } from "next";
import { env } from "@/config/env";
import { siteConfig } from "@/config/site";
import { getWritingRepository } from "@/server/repositories";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = env.SITE_URL ?? siteConfig.url;
	const posts = await getWritingRepository().findAll();

	return [
		{ url: baseUrl, changeFrequency: "monthly", priority: 1 },
		{ url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
		{ url: `${baseUrl}/projects`, changeFrequency: "monthly", priority: 0.8 },
		{
			url: `${baseUrl}/writing`,
			lastModified: posts[0]?.date,
			changeFrequency: "weekly",
			priority: 0.8,
		},
		...posts.map((post) => ({
			url: `${baseUrl}/writing/${post.slug}`,
			lastModified: post.updated ?? post.date,
			changeFrequency: "yearly" as const,
			priority: 0.6,
		})),
		{
			url: `${baseUrl}/resume`,
			lastModified: siteConfig.resume.updatedAt,
			changeFrequency: "monthly",
			priority: 0.7,
		},
	];
}
