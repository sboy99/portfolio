import type { MetadataRoute } from "next";
import { env } from "@/config/env";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = env.SITE_URL ?? siteConfig.url;

	return [
		{ url: baseUrl, changeFrequency: "monthly", priority: 1 },
		{ url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
		{ url: `${baseUrl}/projects`, changeFrequency: "monthly", priority: 0.8 },
		{
			url: `${baseUrl}/resume`,
			lastModified: siteConfig.resume.updatedAt,
			changeFrequency: "monthly",
			priority: 0.7,
		},
	];
}
