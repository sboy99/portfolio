import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";

export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="mt-auto border-t border-border">
			<Container className="flex flex-col gap-3 py-6 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
				<p>
					© {year} {siteConfig.name}
				</p>
				<div className="flex gap-4">
					<a className="hover:text-foreground" href={siteConfig.links.github}>
						GitHub
					</a>
					<a className="hover:text-foreground" href={siteConfig.links.linkedin}>
						LinkedIn
					</a>
					<a className="hover:text-foreground" href={siteConfig.links.x}>
						X
					</a>
				</div>
			</Container>
		</footer>
	);
}
