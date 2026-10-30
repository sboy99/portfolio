import { env } from "@/config/env";
import { siteConfig } from "@/config/site";
import { getWritingRepository } from "@/server/repositories";

export const dynamic = "force-static";

function escapeXml(text: string) {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

/** RSS 2.0 for every published post. */
export async function GET() {
	const baseUrl = env.SITE_URL ?? siteConfig.url;
	const posts = await getWritingRepository().findAll();
	const items = posts
		.map((post) => {
			const url = `${baseUrl}/writing/${post.slug}`;
			return `<item><title>${escapeXml(post.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate><category>${escapeXml(post.topic)}</category><description>${escapeXml(post.description)}</description></item>`;
		})
		.join("");

	const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${escapeXml(`Writing · ${siteConfig.name}`)}</title><link>${baseUrl}/writing</link><atom:link href="${baseUrl}/writing/feed.xml" rel="self" type="application/rss+xml"/><description>${escapeXml(siteConfig.description)}</description><language>en</language>${items}</channel></rss>`;

	return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
