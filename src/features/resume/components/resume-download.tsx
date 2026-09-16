import { DownloadIcon } from "@/components/common/icons";
import { buttonClassName } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function ResumeDownload() {
	const updatedLabel = new Intl.DateTimeFormat("en-US", {
		month: "short",
		year: "numeric",
	}).format(new Date(`${siteConfig.resume.updatedAt}T00:00:00`));

	return (
		<div className="flex flex-wrap items-center gap-3 print:hidden">
			<a
				className={buttonClassName("primary")}
				download={siteConfig.resume.fileName}
				href={siteConfig.resume.path}
			>
				<DownloadIcon className="mr-1.5 size-3.5" />
				Download PDF
			</a>
			<p className="font-mono text-[11px] text-muted-foreground">Updated {updatedLabel}</p>
		</div>
	);
}
