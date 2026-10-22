import { describe, expect, it } from "vitest";
import { parseStoredSound } from "@/lib/shore/surf";

describe("parseStoredSound", () => {
	it("stays off unless the visitor turned it on", () => {
		expect(parseStoredSound(null)).toBe(false);
		expect(parseStoredSound("off")).toBe(false);
		expect(parseStoredSound("garbage")).toBe(false);
		expect(parseStoredSound("on")).toBe(true);
	});
});
