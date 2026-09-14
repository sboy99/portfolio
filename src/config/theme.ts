export const THEME_STORAGE_KEY = "portfolio-theme";

export const PRIMARY_IDS = [
	"black",
	"red",
	"orange",
	"amber",
	"yellow",
	"lime",
	"green",
	"emerald",
	"teal",
	"cyan",
	"sky",
	"blue",
	"indigo",
	"violet",
	"purple",
	"fuchsia",
	"pink",
	"rose",
] as const;

export const NEUTRAL_IDS = [
	"slate",
	"gray",
	"zinc",
	"neutral",
	"stone",
	"taupe",
	"mauve",
	"mist",
	"olive",
] as const;

export const THEME_MODES = ["light", "dark"] as const;

type PrimaryId = (typeof PRIMARY_IDS)[number];
type NeutralId = (typeof NEUTRAL_IDS)[number];
type ThemeMode = (typeof THEME_MODES)[number];

type SwatchOption<Id extends string> = {
	id: Id;
	label: string;
	swatch: string;
};

export const PRIMARY_OPTIONS = [
	{ id: "black", label: "Black", swatch: "var(--foreground)" },
	{ id: "red", label: "Red", swatch: "var(--color-red-500)" },
	{ id: "orange", label: "Orange", swatch: "var(--color-orange-500)" },
	{ id: "amber", label: "Amber", swatch: "var(--color-amber-500)" },
	{ id: "yellow", label: "Yellow", swatch: "var(--color-yellow-500)" },
	{ id: "lime", label: "Lime", swatch: "var(--color-lime-500)" },
	{ id: "green", label: "Green", swatch: "var(--color-green-500)" },
	{ id: "emerald", label: "Emerald", swatch: "var(--color-emerald-500)" },
	{ id: "teal", label: "Teal", swatch: "var(--color-teal-500)" },
	{ id: "cyan", label: "Cyan", swatch: "var(--color-cyan-500)" },
	{ id: "sky", label: "Sky", swatch: "var(--color-sky-500)" },
	{ id: "blue", label: "Blue", swatch: "var(--color-blue-500)" },
	{ id: "indigo", label: "Indigo", swatch: "var(--color-indigo-500)" },
	{ id: "violet", label: "Violet", swatch: "var(--color-violet-500)" },
	{ id: "purple", label: "Purple", swatch: "var(--color-purple-500)" },
	{ id: "fuchsia", label: "Fuchsia", swatch: "var(--color-fuchsia-500)" },
	{ id: "pink", label: "Pink", swatch: "var(--color-pink-500)" },
	{ id: "rose", label: "Rose", swatch: "var(--color-rose-500)" },
] as const satisfies readonly SwatchOption<PrimaryId>[];

export const NEUTRAL_OPTIONS = [
	{ id: "slate", label: "Slate", swatch: "var(--color-slate-500)" },
	{ id: "gray", label: "Gray", swatch: "var(--color-gray-500)" },
	{ id: "zinc", label: "Zinc", swatch: "var(--color-zinc-500)" },
	{ id: "neutral", label: "Neutral", swatch: "var(--color-neutral-500)" },
	{ id: "stone", label: "Stone", swatch: "var(--color-stone-500)" },
	{ id: "taupe", label: "Taupe", swatch: "var(--color-taupe-500)" },
	{ id: "mauve", label: "Mauve", swatch: "var(--color-mauve-500)" },
	{ id: "mist", label: "Mist", swatch: "var(--color-mist-500)" },
	{ id: "olive", label: "Olive", swatch: "var(--color-olive-500)" },
] as const satisfies readonly SwatchOption<NeutralId>[];

export const DEFAULT_THEME = {
	mode: "dark",
	primary: "emerald",
	neutral: "zinc",
} as const satisfies {
	mode: ThemeMode;
	primary: PrimaryId;
	neutral: NeutralId;
};
