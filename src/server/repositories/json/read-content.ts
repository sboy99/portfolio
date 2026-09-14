import { readFile } from "node:fs/promises";
import path from "node:path";
import type { z } from "zod";

const contentDirectory = path.resolve(process.cwd(), "content");

export class ContentParseError extends Error {
	constructor(
		fileName: string,
		readonly issues: z.core.$ZodIssue[],
	) {
		super(`Invalid content in ${fileName}: ${issues.map((issue) => issue.message).join("; ")}`);
		this.name = "ContentParseError";
	}
}

export function resolveContentPath(fileName: string): string {
	const filePath = path.resolve(contentDirectory, fileName);

	if (!filePath.startsWith(`${contentDirectory}${path.sep}`)) {
		throw new Error(`Illegal content file name: ${fileName}`);
	}

	return filePath;
}

export async function readContentFile(fileName: string): Promise<unknown> {
	const filePath = resolveContentPath(fileName);
	const raw = await readFile(filePath, "utf8");

	try {
		return JSON.parse(raw) as unknown;
	} catch (cause) {
		throw new Error(`Unable to parse ${fileName} as JSON`, { cause });
	}
}

export function parseContent<T>(fileName: string, schema: z.ZodType<T>, data: unknown): T {
	const result = schema.safeParse(data);

	if (!result.success) {
		throw new ContentParseError(fileName, result.error.issues);
	}

	return result.data;
}
