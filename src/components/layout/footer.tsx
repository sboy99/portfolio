import { Container } from "@/components/layout/container";
import { DashedRule } from "@/components/layout/dashed-rule";
import { siteConfig } from "@/config/site";

export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="relative z-0 mt-auto">
			<DashedRule edge="top" />
			<DashedRule edge="bottom" />
			<Container>
				<div className="flex flex-col gap-3 px-3 py-4 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
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
				</div>
			</Container>
		</footer>
	);
}
