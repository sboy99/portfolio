import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";

type LanguagesListProps = {
	languages: string[];
};

export function LanguagesList({ languages }: LanguagesListProps) {
	return (
		<section aria-labelledby="languages-heading">
			<SectionHeading id="languages-heading">Languages</SectionHeading>
			<ul className="flex flex-col gap-1 px-3 py-3">
				{languages.map((language) => (
					<li key={language}>
						<Badge>{language}</Badge>
					</li>
				))}
			</ul>
		</section>
	);
}
