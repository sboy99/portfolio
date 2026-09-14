import Link from "next/link";
import { ThemePanel } from "@/components/common/theme-panel";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";

export function Header() {
	return (
		<header className="border-b border-border">
			<Container className="flex h-12 items-center justify-between gap-4">
				<Link
					className="flex items-center gap-2 font-mono text-xs font-medium tracking-tight"
					href="/"
				>
					<span>@sboy99</span>
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
			</Container>
		</header>
	);
}
