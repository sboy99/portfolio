import { z } from "zod";
import { NEUTRAL_IDS, PRIMARY_IDS, THEME_MODES } from "@/config/theme";

export const themeModeSchema = z.enum(THEME_MODES);
export const primaryIdSchema = z.enum(PRIMARY_IDS);
export const neutralIdSchema = z.enum(NEUTRAL_IDS);

export const themePreferenceSchema = z.object({
	mode: themeModeSchema,
	primary: primaryIdSchema,
	neutral: neutralIdSchema,
});

export type ThemeMode = z.infer<typeof themeModeSchema>;
export type PrimaryId = z.infer<typeof primaryIdSchema>;
export type NeutralId = z.infer<typeof neutralIdSchema>;
export type ThemePreference = z.infer<typeof themePreferenceSchema>;
