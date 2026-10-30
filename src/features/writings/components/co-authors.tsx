import type { Writing } from "../types";

type Coauthor = Writing["coauthorDetails"][number];

function initials(name: string) {
	return name
		.split(/\s+/)
		.map((part) => part[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();
}

function Avatar({ author, size }: { author: Coauthor; size: number }) {
	return author.avatar ? (
		// biome-ignore lint/performance/noImgElement: tiny avatars from content/, no need for the image optimiser
		<img
			alt=""
			className="flex-none rounded-full object-cover"
			height={size}
			src={author.avatar}
			width={size}
		/>
	) : (
		<span
			aria-hidden="true"
			className="flex flex-none items-center justify-center rounded-full bg-code-bg font-mono text-[11px] text-muted"
			style={{ width: size, height: size }}
		>
			{initials(author.name)}
		</span>
	);
}

function names(authors: Coauthor[]) {
	const list = authors.map((author) => author.name);
	return list.length > 1 ? `${list.slice(0, -1).join(", ")} and ${list.at(-1)}` : list[0];
}

/** "dived with …" under the title. Solo posts show nothing. */
export function CoauthorByline({ authors }: { authors: Coauthor[] }) {
	if (authors.length === 0) return null;
	return (
		<p className="mt-5 flex items-center gap-2.5 font-mono text-[12px] text-muted">
			<span className="flex -space-x-2">
				{authors.map((author) => (
					<Avatar author={author} key={author.id} size={28} />
				))}
			</span>
			<span>
				dived with <span className="text-fg">{names(authors)}</span>
			</span>
		</p>
	);
}

/** Who else wrote the post, at its end between two rules. */
export function CoauthorCards({ authors }: { authors: Coauthor[] }) {
	if (authors.length === 0) return null;
	return (
		<section aria-label="Co-authors" className="mt-14 border-y border-line py-6">
			<h2 className="type-label text-muted">Crew on this dive</h2>
			{authors.map((author) => (
				<div className="mt-4 grid grid-cols-[56px_minmax(0,1fr)] gap-x-4" key={author.id}>
					<Avatar author={author} size={56} />
					<div>
						<p className="text-[20px] leading-7 text-fg">{author.name}</p>
						{author.role ? <p className="font-mono text-[12px] text-muted">{author.role}</p> : null}
						{author.bio ? (
							<p className="mt-2 text-[16px] leading-[26px] text-body">{author.bio}</p>
						) : null}
						{Object.keys(author.links).length > 0 ? (
							<p className="mt-2 flex flex-wrap gap-x-4 font-mono text-[12px]">
								{Object.entries(author.links).map(([label, href]) => (
									<a href={href} key={label} rel="noreferrer" target="_blank">
										{label}
									</a>
								))}
							</p>
						) : null}
					</div>
				</div>
			))}
		</section>
	);
}
