/**
 * Syntax colours for rehype-pretty-code. Each colour is a CSS variable, so one
 * theme follows day and dusk (see the --code-* tokens in globals.css).
 * Plain data: Turbopack can only pass serializable plugin options.
 */
export const codeTheme = {
	name: "shoreline",
	type: "light",
	colors: {
		"editor.foreground": "var(--fg)",
		"editor.background": "transparent",
	},
	tokenColors: [
		{ settings: { foreground: "var(--fg)" } },
		{
			scope: ["comment", "punctuation.definition.comment"],
			settings: { foreground: "var(--muted)" },
		},
		{
			scope: [
				"keyword",
				"storage",
				"storage.type",
				"storage.modifier",
				"constant.language",
				"support.type.primitive",
				"variable.language",
			],
			settings: { foreground: "var(--code-key)" },
		},
		{
			scope: [
				"entity.name.function",
				"support.function",
				"meta.function-call",
				"entity.name.type",
				"entity.name.class",
				"support.type",
				"support.class",
			],
			settings: { foreground: "var(--code-fn)" },
		},
		{
			scope: ["string", "string.quoted", "string.template", "markup.inline.raw"],
			settings: { foreground: "var(--code-str)" },
		},
		{
			scope: [
				"constant.numeric",
				"constant.other",
				"variable.parameter",
				"variable.other.constant",
			],
			settings: { foreground: "var(--code-num)" },
		},
	],
};
