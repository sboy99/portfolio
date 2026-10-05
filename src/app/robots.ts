import type { MetadataRoute } from "next";
import { env } from "@/config/env";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
	const baseUrl = env.SITE_URL ?? siteConfig.url;

	return {
		rules: { userAgent: "*", allow: "/", disallow: "/api/" },
		sitemap: `${baseUrl}/sitemap.xml`,
	};
}
