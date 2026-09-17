export const siteConfig = {
	name: "Sagar Bera",
	title: "Sagar Bera — Backend and DevOps Engineer",
	description:
		"Backend and DevOps engineer shipping production TypeScript systems — NestJS, PostgreSQL, Docker, CI/CD, and GCP. Currently building Kili and Scribble.",
	url: "https://sboy99.xyz",
	ogImage: "/og.png",
	email: "contact.sagarbera@gmail.com",
	links: {
		github: "https://github.com/sboy99",
		linkedin: "https://www.linkedin.com/in/sagar-bera",
		x: "https://x.com/0xSagar_",
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
