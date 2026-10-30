import { describe, expect, it } from "vitest";
import { writingFrontmatterSchema } from "@/schemas/writing";
import type { Writing } from "../types";
import { formatPostDate } from "./format";
import { readingTime } from "./reading-time";
import { buildToc } from "./toc";
import { listTopics } from "./topics";

describe("writingFrontmatterSchema", () => {
	it("fills the defaults", () => {
		const parsed = writingFrontmatterSchema.parse({
			title: "Moving to Postgres",
			description: "How we did it.",
			date: "2026-10-12",
			topic: "databases",
		});
		expect(parsed).toMatchObject({ tags: [], coauthors: [], draft: false, featured: false });
	});

	it("rejects a date that is not ISO", () => {
		const result = writingFrontmatterSchema.safeParse({
			title: "t",
			description: "d",
			date: "12/10/2026",
			topic: "x",
		});
		expect(result.success).toBe(false);
	});
});

describe("readingTime", () => {
	it("counts prose at 220 words a minute and skips code", () => {
		const prose = Array.from({ length: 440 }, () => "word").join(" ");
		const code = `\`\`\`ts\n${Array.from({ length: 1000 }, () => "x").join(" ")}\n\`\`\``;
		expect(readingTime(`---\ntitle: t\n---\n${prose}\n\n${code}`)).toBe(2);
	});

	it("never says zero", () => {
		expect(readingTime("hi")).toBe(1);
	});
});

describe("buildToc", () => {
	it("keeps ## headings with the ids rehype-slug gives them", () => {
		const toc = buildToc(
			"# Title\n\n## The plan\n\n### Detail\n\n```md\n## not a heading\n```\n\n## The plan",
		);
		expect(toc).toEqual([
			{ id: "the-plan", title: "The plan" },
			{ id: "the-plan-1", title: "The plan" },
		]);
	});
});

describe("listTopics", () => {
	it("counts each topic, most used first", () => {
		const posts = [{ topic: "ops" }, { topic: "databases" }, { topic: "ops" }, { topic: "ci" }];
		expect(listTopics(posts as Writing[])).toEqual([
			{ topic: "ops", count: 2 },
			{ topic: "ci", count: 1 },
			{ topic: "databases", count: 1 },
		]);
	});
});

describe("formatPostDate", () => {
	it("writes the day, short month and year", () => {
		expect(formatPostDate("2026-10-12")).toBe("12 Oct 2026");
	});
});
