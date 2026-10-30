import { describe, expect, it } from "vitest";
import { themeModeSchema } from "./theme";

describe("themeModeSchema", () => {
	it("accepts light and dark", () => {
		expect(themeModeSchema.parse("light")).toBe("light");
		expect(themeModeSchema.parse("dark")).toBe("dark");
	});

	it("rejects an unknown mode", () => {
		expect(themeModeSchema.safeParse("system").success).toBe(false);
	});
});
