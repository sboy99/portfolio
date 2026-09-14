import { describe, expect, it } from "vitest";
import { z } from "zod";
import { ContentParseError, parseContent, resolveContentPath } from "./read-content";

const itemSchema = z.object({ name: z.string() });

describe("parseContent", () => {
	it("returns parsed data when the payload matches", () => {
		expect(parseContent("items.json", itemSchema, { name: "alpha" })).toEqual({ name: "alpha" });
	});

	it("throws ContentParseError when the payload is invalid", () => {
		expect(() => parseContent("items.json", itemSchema, { name: 1 })).toThrow(ContentParseError);
	});
});

describe("resolveContentPath", () => {
	it("rejects path traversal", () => {
		expect(() => resolveContentPath("../package.json")).toThrow(/Illegal content file name/);
	});
});
