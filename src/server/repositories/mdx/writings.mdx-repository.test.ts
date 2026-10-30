import { describe, expect, it } from "vitest";
import { loadWritings } from "./writings.mdx-repository";

describe("loadWritings", () => {
	it("keeps drafts out unless asked for", async () => {
		const published = await loadWritings({ includeDrafts: false });
		expect(published.every((post) => !post.draft)).toBe(true);

		const all = await loadWritings({ includeDrafts: true });
		const guide = all.find((post) => post.slug === "field-guide");
		expect(guide?.draft).toBe(true);
		expect(guide?.toc.map((entry) => entry.id)).toContain("callouts");
		expect(guide?.readingTime).toBeGreaterThan(0);
	});
});
