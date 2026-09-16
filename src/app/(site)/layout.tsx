import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageGrid } from "@/components/layout/page-grid";
import { SectionGap } from "@/components/layout/section-gap";

export default function SiteLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<PageGrid>
			<Header />
			<SectionGap />
			<main className="flex-1">{children}</main>
			<SectionGap />
			<Footer />
		</PageGrid>
	);
}
