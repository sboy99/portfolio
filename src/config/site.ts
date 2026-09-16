export const siteConfig = {
	name: "Sagar Bera",
	title: "Sagar Bera — Backend and DevOps Engineer",
	description:
		"Backend and DevOps engineer shipping production TypeScript systems — NestJS, PostgreSQL, Docker, CI/CD, and GCP. Currently building Kili and Scribble.",
	url: "https://sboy99.dev",
	ogImage: "/og.png",
	email: "hello@sboy99.dev",
	links: {
		github: "https://github.com/sboy99",
		linkedin: "https://www.linkedin.com/in/sboy99",
		x: "https://x.com/sboy99",
	},
	nav: [
		{ href: "/projects", label: "Projects" },
		{ href: "/resume", label: "Resume" },
		{ href: "/about", label: "Me" },
	],
	resume: {
		path: "/sagar-bera-resume.pdf",
		fileName: "Sagar_Bera_Resume.pdf",
		updatedAt: "2026-09-01",
	},
} as const;
