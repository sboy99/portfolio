import { fail, ok } from "@/lib/api-response";
import { getProjectRepository } from "@/server/repositories";

export async function GET() {
	try {
		const projects = await getProjectRepository().findAll();
		return Response.json(ok(projects));
	} catch (cause) {
		const message = cause instanceof Error ? cause.message : "Unable to load projects";
		return Response.json(fail(message), { status: 500 });
	}
}
