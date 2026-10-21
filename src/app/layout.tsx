import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist_Mono, Newsreader, Noto_Serif_Bengali } from "next/font/google";
import { ThemeProvider } from "@/components/common/theme-provider";
import { themeInitScript } from "@/components/common/theme-script";
import { env } from "@/config/env";
import { siteConfig } from "@/config/site";
import "@/styles/globals.css";

const newsreader = Newsreader({
	variable: "--font-newsreader",
	subsets: ["latin"],
	style: ["normal", "italic"],
	axes: ["opsz"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

// Only used for the Bengali word in the notes, so it is not preloaded.
const notoBengali = Noto_Serif_Bengali({
	variable: "--font-noto-bengali",
	subsets: ["bengali"],
	weight: "400",
	preload: false,
});

export const metadata: Metadata = {
	metadataBase: new URL(env.SITE_URL ?? siteConfig.url),
	title: {
		default: siteConfig.title,
		template: `%s · ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: [
			{ url: "/favicon.ico", sizes: "48x48" },
			{ url: "/favicon.svg", type: "image/svg+xml" },
			{ url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
		],
		apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
		shortcut: "/favicon.ico",
	},
	manifest: "/site.webmanifest",
	appleWebApp: {
		title: siteConfig.name,
	},
	openGraph: {
		title: siteConfig.title,
		description: siteConfig.description,
		url: siteConfig.url,
		siteName: siteConfig.name,
		images: [siteConfig.ogImage],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.title,
		description: siteConfig.description,
		images: [siteConfig.ogImage],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${newsreader.variable} ${geistMono.variable} ${notoBengali.variable} h-full antialiased`}
			suppressHydrationWarning
		>
			<head>
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: blocking theme init before first paint
					dangerouslySetInnerHTML={{ __html: themeInitScript }}
				/>
			</head>
			<body className="flex min-h-full flex-col bg-bg text-fg">
				<ThemeProvider>{children}</ThemeProvider>
				<Analytics />
			</body>
		</html>
	);
}
