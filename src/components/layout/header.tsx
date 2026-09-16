import Link from "next/link";
import { ThemePanel } from "@/components/common/theme-panel";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Container } from "@/components/layout/container";
import { DashedRule } from "@/components/layout/dashed-rule";
import { siteConfig } from "@/config/site";
import { getProfileRepository } from "@/server/repositories";

export async function Header() {
	const profile = await getProfileRepository().get();

	return (
		<header className="relative z-0">
			<DashedRule edge="top" />
			<DashedRule edge="bottom" />
			<Container>
				<div className="flex items-center justify-between gap-4 px-3 py-2">
					<Link
						className="flex items-center gap-2 font-mono text-xs font-medium tracking-tight"
						href="/"
					>
						<span>{profile.handle}</span>
					</Link>
					<nav aria-label="Primary" className="flex items-center gap-3">
						{siteConfig.nav.map((item) => (
							<Link
								className="text-xs text-muted-foreground transition-colors hover:text-foreground"
								href={item.href}
								key={item.href}
							>
								{item.label}
							</Link>
						))}
						<div className="flex items-center gap-0.5">
							<ThemeToggle />
							<ThemePanel />
						</div>
					</nav>
				</div>
			</Container>
		</header>
	);
}
