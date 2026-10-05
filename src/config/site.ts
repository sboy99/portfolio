export const siteConfig = {
	name: "Sagar Bera",
	title: "Sagar Bera — Backend & DevOps Engineer",
	description:
		"Backend and DevOps engineer building and running the systems behind products used by 50,000+ creators — NestJS, PostgreSQL, Docker, CI/CD, and GCP.",
	url: "https://sboy99.xyz",
	ogImage: {
		url: "/og-image.png",
		width: 1200,
		height: 630,
		alt: "SBOY99 — Backend & DevOps",
	},
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
