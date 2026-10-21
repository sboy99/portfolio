import { z } from "zod";
import { THEME_MODES } from "@/config/theme";

export const themeModeSchema = z.enum(THEME_MODES);

export type ThemeMode = z.infer<typeof themeModeSchema>;
