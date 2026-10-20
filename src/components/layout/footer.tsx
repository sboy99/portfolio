import { Container } from "@/components/layout/container";
import { DashedRule } from "@/components/layout/dashed-rule";
import { TextLink } from "@/components/ui/text-link";
import { siteConfig } from "@/config/site";

export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="relative z-0 mt-auto">
			<DashedRule edge="top" />
			<DashedRule edge="bottom" />
			<Container>
				<div className="type-meta flex flex-col gap-3 px-gutter py-4 text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
					<p>
						© {year} {siteConfig.name}
					</p>
					<div className="flex gap-4">
						<TextLink href={siteConfig.links.github}>GitHub</TextLink>
						<TextLink href={siteConfig.links.linkedin}>LinkedIn</TextLink>
						<TextLink href={siteConfig.links.x}>X</TextLink>
					</div>
				</div>
			</Container>
		</footer>
	);
}
