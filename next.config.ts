import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import { codeTheme } from "./src/features/writings/lib/code-theme";

const nextConfig: NextConfig = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

// Plugins are named as strings with plain-data options so Turbopack can load them.
const withMDX = createMDX({
	extension: /\.(md|mdx)$/,
	options: {
		remarkPlugins: ["remark-frontmatter", "remark-gfm"],
		rehypePlugins: [
			"rehype-slug",
			["rehype-pretty-code", { theme: codeTheme, keepBackground: false, defaultLang: "plaintext" }],
		],
	},
});

export default withMDX(nextConfig);
