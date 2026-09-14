import { describe, expect, it } from "vitest";
import { slugify } from "./slugify";

describe("slugify", () => {
	it("lowercases and hyphenates words", () => {
		expect(slugify("Hello World")).toBe("hello-world");
	});

	it("strips leading and trailing hyphens", () => {
		expect(slugify("  --Next.js App--  ")).toBe("next-js-app");
	});
});
