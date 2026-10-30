import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type PageSeo = {
	title: string;
	description: string;
	/** Path from the site root, such as "/projects". */
	path: string;
};

/**
 * A page's title, description and canonical URL, with matching share cards.
 * Next.js replaces rather than merges `openGraph`, so each page repeats the image.
 */
export function pageMetadata({ title, description, path }: PageSeo): Metadata {
	const shareTitle = `${title} · ${siteConfig.name}`;
	return {
		title,
		description,
		alternates: { canonical: path },
		openGraph: {
			title: shareTitle,
			description,
			url: path,
			siteName: siteConfig.name,
			locale: "en_US",
			type: "website",
			images: [siteConfig.ogImage],
		},
		twitter: {
			card: "summary_large_image",
			title: shareTitle,
			description,
			creator: siteConfig.twitterHandle,
			images: [siteConfig.ogImage],
		},
	};
}
