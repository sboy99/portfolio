import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ThemePanel } from "@/components/common/theme-panel";
import { ThemeProvider } from "@/components/common/theme-provider";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { THEME_STORAGE_KEY } from "@/config/theme";

function renderThemeControls() {
	return render(
		<ThemeProvider>
			<ThemeToggle />
			<ThemePanel />
		</ThemeProvider>,
	);
}

function storedTheme() {
	const raw = window.localStorage.getItem(THEME_STORAGE_KEY);

	if (raw == null) {
		return null;
	}

	return JSON.parse(raw) as {
		mode: string;
		primary: string;
		neutral: string;
	};
}

function radio(name: string) {
	return screen.getByRole("radio", { hidden: true, name });
}

async function waitForHydration() {
	await waitFor(() => {
		expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
		expect(document.documentElement.getAttribute("data-primary")).toBe("emerald");
		expect(document.documentElement.getAttribute("data-neutral")).toBe("zinc");
	});
}

describe("theme controls", () => {
	beforeEach(() => {
		window.localStorage.clear();
		document.documentElement.removeAttribute("data-theme");
		document.documentElement.removeAttribute("data-primary");
		document.documentElement.removeAttribute("data-neutral");
	});

	afterEach(() => {
		cleanup();
	});

	it("applies a primary swatch to html and localStorage", async () => {
		renderThemeControls();
		await waitForHydration();

		fireEvent.click(radio("Rose"));

		await waitFor(() => {
			expect(document.documentElement.getAttribute("data-primary")).toBe("rose");
			expect(storedTheme()).toMatchObject({ primary: "rose", mode: "dark", neutral: "zinc" });
		});
	});

	it("applies a neutral swatch to html and localStorage", async () => {
		renderThemeControls();
		await waitForHydration();

		fireEvent.click(radio("Slate"));

		await waitFor(() => {
			expect(document.documentElement.getAttribute("data-neutral")).toBe("slate");
			expect(storedTheme()).toMatchObject({ neutral: "slate" });
		});
	});

	it("toggles light and dark mode", async () => {
		renderThemeControls();
		await waitForHydration();

		fireEvent.click(screen.getByRole("button", { name: "Switch to light mode" }));

		await waitFor(() => {
			expect(document.documentElement.getAttribute("data-theme")).toBe("light");
			expect(storedTheme()).toMatchObject({ mode: "light" });
		});
	});

	it("restores a stored preference on mount", async () => {
		window.localStorage.setItem(
			THEME_STORAGE_KEY,
			JSON.stringify({ mode: "light", primary: "blue", neutral: "stone" }),
		);

		renderThemeControls();

		await waitFor(() => {
			expect(document.documentElement.getAttribute("data-theme")).toBe("light");
			expect(document.documentElement.getAttribute("data-primary")).toBe("blue");
			expect(document.documentElement.getAttribute("data-neutral")).toBe("stone");
		});

		expect(radio("Blue")).toBeChecked();
		expect(radio("Stone")).toBeChecked();
	});

	it("syncs from a storage event in another tab", async () => {
		renderThemeControls();
		await waitForHydration();

		const next = { mode: "light", primary: "violet", neutral: "olive" };
		window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(next));
		window.dispatchEvent(new StorageEvent("storage", { key: THEME_STORAGE_KEY }));

		await waitFor(() => {
			expect(document.documentElement.getAttribute("data-primary")).toBe("violet");
			expect(document.documentElement.getAttribute("data-neutral")).toBe("olive");
			expect(document.documentElement.getAttribute("data-theme")).toBe("light");
		});
	});
});
