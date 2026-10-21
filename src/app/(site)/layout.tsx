import { FooterSea } from "@/components/shore/footer-sea";
import { HorizonBand } from "@/components/shore/horizon-band";
import { MotionProvider } from "@/components/shore/motion";
import { SiteHeader } from "@/components/shore/site-header";

export default function SiteLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<MotionProvider>
			<div className="flex min-h-full flex-1 flex-col overflow-x-clip">
				<HorizonBand />
				<div className="mx-auto w-full max-w-[960px] flex-1 px-5 lg:px-0">
					<SiteHeader />
					{children}
				</div>
				<FooterSea />
			</div>
		</MotionProvider>
	);
}
