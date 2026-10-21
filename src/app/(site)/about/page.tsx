import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageColumns } from "@/components/shore/page-columns";
import { Mark, Sagar, SectionHead } from "@/components/shore/prose";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
	title: "About",
	description: "Background, experience, and the stack I work with.",
};

function Para({ children, first = false }: { children: ReactNode; first?: boolean }) {
	return (
		<p className={first ? "type-lead mt-[18px] text-body" : "type-lead mt-5 text-body"}>
			{children}
		</p>
	);
}

export default function AboutPage() {
	return (
		<PageColumns
			notes={[
				{
					n: "1",
					body: (
						<>
							<Sagar /> (sha·gor) is Bengali for ocean, which is why this site is mostly water.
						</>
					),
				},
				{ n: "2", offset: 160, body: "Scribble's products are used by 50,000+ creators." },
			]}
		>
			<h1 className="type-display">
				My name means <em>ocean</em>.
				<Mark large n="1" />
			</h1>
			<p className="type-lead mt-6 text-body">
				I'm Sagar Bera, a backend and DevOps engineer in Bengaluru. Most of what I build is the part
				people don't see: schemas, queues, deploy pipelines and the logs you read when something
				goes wrong.
			</p>
			<Para>
				Since February 2024 I've worked at Scribble Network, where I joined as the first backend
				hire. I moved our core data from MongoDB to PostgreSQL and our production from AWS to GCP
				while the product stayed live.
				<Mark n="2" />
			</Para>
			<Para>
				Before that I was at BuidlersTribe, rebuilding a Drupal site as a MERN app so the team could
				ship features about 30% faster.
			</Para>

			<SectionHead>How I like to work</SectionHead>
			<Para first>
				Boring infrastructure is good infrastructure. I'd rather write a small, well-understood
				service than a clever one, and I like being the person who knows where to look when it
				breaks. One late-night outage took us 5–10 minutes to fix instead of the hour or two we
				expected.
			</Para>

			<SectionHead>Off the clock</SectionHead>
			<Para first>
				I write small Go tools for my own servers, like Go-Vault for Postgres backups and Tusk for
				systemd timers. I've contributed to open source projects like Mintlify and WeMakeDevs, and I
				run a YouTube channel that earned a silver play button.
			</Para>

			<SectionHead>Say hello</SectionHead>
			<Para first>
				The best way to reach me is <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
			</Para>
		</PageColumns>
	);
}
