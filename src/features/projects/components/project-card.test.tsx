import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { Project } from "@/features/projects/types";
import { ProjectCard } from "./project-card";

const project: Project = {
	slug: "kili-ai",
	title: "Kili AI",
	summary: "Ad network for AI products.",
	highlights: [
		"Developers keep [[50%]] of net ad revenue",
		"[[250+]] daily active users",
	],
	stack: ["TypeScript", "Next.js"],
	links: {
		github: null,
		live: "https://trykili.ai",
		demo: null,
		docker: null,
	},
	featured: true,
	year: 2026,
	origin: "ScribbleDao",
	image: null,
};

describe("ProjectCard", () => {
	afterEach(() => {
		cleanup();
	});

	it("renders year without origin in the year column", () => {
		render(
			<ul>
				<ProjectCard project={project} />
			</ul>,
		);

		const year = screen.getByText("2026");
		expect(year).toHaveTextContent("2026");
		expect(year).not.toHaveTextContent("ScribbleDao");
		expect(year).not.toHaveTextContent("·");
	});

	it("renders origin as a skill-style badge beside the project title", () => {
		render(
			<ul>
				<ProjectCard project={project} />
			</ul>,
		);

		const heading = screen.getByRole("heading", { name: /Kili AI/i });
		const nameColumn = heading.closest("div")?.parentElement;
		expect(nameColumn).not.toBeNull();

		expect(within(nameColumn as HTMLElement).getByText("ScribbleDao")).toBeInTheDocument();
		expect(screen.getByText("Origin:")).toHaveClass("sr-only");
	});

	it("renders Live and GitHub links when present", () => {
		render(
			<ul>
				<ProjectCard
					project={{
						...project,
						links: {
							github: "https://github.com/sboy99/kili",
							live: "https://trykili.ai",
							demo: null,
							docker: null,
						},
					}}
				/>
			</ul>,
		);

		const nameColumn = screen
			.getByRole("heading", { name: /Kili AI/i })
			.closest("div")?.parentElement;
		expect(nameColumn).not.toBeNull();

		const github = within(nameColumn as HTMLElement).getByRole("link", { name: "GitHub" });
		const live = within(nameColumn as HTMLElement).getByRole("link", { name: "Live" });

		expect(github).toHaveAttribute("href", "https://github.com/sboy99/kili");
		expect(live).toHaveAttribute("href", "https://trykili.ai");
	});

	it("renders a Docker link when present", () => {
		render(
			<ul>
				<ProjectCard
					project={{
						slug: "go-vault",
						title: "Go-Vault",
						summary: "CLI for PostgreSQL backups.",
						highlights: ["Interactive CLI for PostgreSQL dump and restore"],
						stack: ["Go", "Docker"],
						links: {
							github: "https://github.com/sboy99/go-vault",
							live: null,
							demo: null,
							docker: "https://hub.docker.com/repository/docker/sboy99/go-vault",
						},
						featured: false,
						year: 2025,
						origin: "Self",
						image: null,
					}}
				/>
			</ul>,
		);

		const nameColumn = screen
			.getByRole("heading", { name: /Go-Vault/i })
			.closest("div")?.parentElement;
		expect(nameColumn).not.toBeNull();

		const docker = within(nameColumn as HTMLElement).getByRole("link", { name: "Docker" });
		expect(docker).toHaveAttribute(
			"href",
			"https://hub.docker.com/repository/docker/sboy99/go-vault",
		);
	});

	it("renders highlights under the summary without highlight markers", () => {
		render(
			<ul>
				<ProjectCard project={project} />
			</ul>,
		);

		expect(screen.getByText("Ad network for AI products.")).toBeInTheDocument();
		expect(screen.getByText("50%")).toBeInTheDocument();
		expect(screen.getByText("250+")).toBeInTheDocument();
		expect(screen.queryByText("[[50%]]")).not.toBeInTheDocument();
		expect(screen.queryByText("[[250+]]")).not.toBeInTheDocument();
		expect(screen.queryByText("Details")).not.toBeInTheDocument();
	});

	it("hides the highlights list when empty", () => {
		render(
			<ul>
				<ProjectCard project={{ ...project, highlights: [] }} />
			</ul>,
		);

		expect(screen.getByText("Ad network for AI products.")).toBeInTheDocument();
		expect(screen.queryByText("50%")).not.toBeInTheDocument();
		expect(screen.queryByText("250+")).not.toBeInTheDocument();
		expect(screen.queryByText("Details")).not.toBeInTheDocument();
	});
});
