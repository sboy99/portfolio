import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Accordion } from "./accordion";
import { Bottle, Pirates } from "./callouts";
import { CodeTabs } from "./code-tabs";
import { WritingList } from "./writing-list";

describe("writing components", () => {
	afterEach(() => {
		cleanup();
	});

	it("labels callouts by kind unless given a title", () => {
		render(
			<>
				<Bottle>kept</Bottle>
				<Pirates title="Data loss">gone</Pirates>
			</>,
		);
		expect(screen.getByText("Message in a bottle")).toBeInTheDocument();
		expect(screen.getByText("Data loss")).toBeInTheDocument();
	});

	it("opens the accordion and lets the answer be focused", () => {
		render(<Accordion title="Why batch?">Locks.</Accordion>);
		const button = screen.getByRole("button", { name: "Why batch?" });
		expect(button).toHaveAttribute("aria-expanded", "false");
		expect(screen.getByText("Locks.")).toHaveAttribute("inert");

		fireEvent.click(button);
		expect(button).toHaveAttribute("aria-expanded", "true");
		expect(screen.getByText("Locks.")).not.toHaveAttribute("inert");
	});

	it("switches code tabs", () => {
		render(
			<CodeTabs
				tabs={[
					{ label: "a.ts", language: "ts", text: "a", pre: <pre>first</pre> },
					{ label: "b.sh", language: "bash", text: "b", pre: <pre>second</pre> },
				]}
			/>,
		);
		expect(screen.getByText("first")).toBeInTheDocument();
		fireEvent.click(screen.getByRole("tab", { name: "b.sh" }));
		expect(screen.getByRole("tab", { name: "b.sh" })).toHaveAttribute("aria-selected", "true");
		expect(screen.getByText("second")).toBeInTheDocument();
	});

	it("shows an empty log when there are no posts", () => {
		render(<WritingList items={[]} topics={[]} />);
		expect(screen.getByText(/Nothing in the log yet/)).toBeInTheDocument();
	});

	it("filters posts by topic", () => {
		const post = { description: "d", dateLabel: "1 Oct 2026", readingTime: 3 };
		render(
			<WritingList
				items={[
					{ ...post, slug: "a", title: "Postgres move", date: "2026-10-01", topic: "databases" },
					{ ...post, slug: "b", title: "Runner cache", date: "2025-03-01", topic: "ci" },
				]}
				topics={[
					{ topic: "ci", count: 1 },
					{ topic: "databases", count: 1 },
				]}
			/>,
		);
		fireEvent.click(screen.getByRole("button", { name: "ci 1" }));
		expect(screen.queryByText("Postgres move")).not.toBeInTheDocument();
		expect(screen.getByText("Runner cache")).toBeInTheDocument();
	});
});
