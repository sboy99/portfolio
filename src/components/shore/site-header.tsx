"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

export function SiteHeader() {
	const pathname = usePathname();

	return (
		<header className="flex flex-wrap items-center justify-between gap-3 pt-7">
			<Link className="text-[22px] italic no-underline" href="/">
				sagar
			</Link>
			<nav
				aria-label="Primary"
				className="flex items-center gap-3.5 text-[15px] md:gap-[22px] md:text-[17px]"
			>
				{siteConfig.nav.map((item) => {
					const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
					return (
						<Link
							aria-current={current ? "page" : undefined}
							className={cn(current ? "text-accent" : "no-underline hover:underline")}
							href={item.href}
							key={item.href}
						>
							{item.label}
						</Link>
					);
				})}
			</nav>
		</header>
	);
}
