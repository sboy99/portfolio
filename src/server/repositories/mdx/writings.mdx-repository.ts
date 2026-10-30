import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { parse as parseYaml } from "yaml";
import { readingTime } from "@/features/writings/lib/reading-time";
import { buildToc } from "@/features/writings/lib/toc";
import { listTopics } from "@/features/writings/lib/topics";
import type { Writing } from "@/features/writings/types";
import { authorsSchema, writingFrontmatterSchema } from "@/schemas/writing";
import { parseContent, readContentFile, resolveContentPath } from "../json/read-content";
import type { WritingRepository } from "../writings.repository";

const WRITINGS_DIRECTORY = "writings";
const AUTHORS_FILE = "authors.json";
const FRONTMATTER = /^---\n([\s\S]*?)\n---\n/;

/** File names become URLs; files starting with an underscore are kept out. */
const POST_FILE = /^([a-z0-9]+(?:-[a-z0-9]+)*)\.mdx$/;

type LoadOptions = { includeDrafts: boolean };

export async function loadWritings({ includeDrafts }: LoadOptions): Promise<Writing[]> {
	const directory = resolveContentPath(WRITINGS_DIRECTORY);
	const authors = parseContent(AUTHORS_FILE, authorsSchema, await readContentFile(AUTHORS_FILE));
	const files = (await readdir(directory)).filter((file) => POST_FILE.test(file));

	const posts = await Promise.all(
		files.map(async (file): Promise<Writing> => {
			const slug = file.replace(/\.mdx$/, "");
			const source = await readFile(path.join(directory, file), "utf8");
			const yaml = FRONTMATTER.exec(source)?.[1];
			if (yaml == null) {
				throw new Error(`${WRITINGS_DIRECTORY}/${file} has no frontmatter block`);
			}
			const frontmatter = parseContent(
				`${WRITINGS_DIRECTORY}/${file}`,
				writingFrontmatterSchema,
				parseYaml(yaml),
			);
			const coauthorDetails = frontmatter.coauthors.map((id) => {
				const author = authors[id];
				if (author == null) {
					throw new Error(`${WRITINGS_DIRECTORY}/${file} names an unknown co-author "${id}"`);
				}
				return { id, ...author };
			});
			return {
				...frontmatter,
				slug,
				readingTime: readingTime(source),
				toc: buildToc(source.replace(FRONTMATTER, "")),
				coauthorDetails,
			};
		}),
	);

	return posts
		.filter((post) => includeDrafts || !post.draft)
		.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

const loadAll = cache(() => loadWritings({ includeDrafts: process.env.NODE_ENV !== "production" }));

export class MdxWritingRepository implements WritingRepository {
	async findAll() {
		return loadAll();
	}

	async findBySlug(slug: string) {
		const posts = await loadAll();
		return posts.find((post) => post.slug === slug) ?? null;
	}

	async findFeatured() {
		const posts = await loadAll();
		return posts.filter((post) => post.featured);
	}

	async listTopics() {
		return listTopics(await loadAll());
	}
}
