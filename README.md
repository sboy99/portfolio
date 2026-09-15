# Portfolio

Personal site for [Sagar Bera](https://sboy99.dev) — profile, projects, and about pages built with Next.js App Router.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4**
- **Zod** for content validation
- **Biome** for lint/format
- **Vitest** + Testing Library
- **Husky** pre-commit hooks

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Optional env:

| Variable   | Description                          | Default              |
| ---------- | ------------------------------------ | -------------------- |
| `SITE_URL` | Canonical site URL for metadata      | `https://sboy99.dev` |

## Scripts

| Command              | Description                |
| -------------------- | -------------------------- |
| `npm run dev`        | Dev server                 |
| `npm run build`      | Production build           |
| `npm start`          | Serve production build     |
| `npm run lint`       | Biome lint                 |
| `npm run format`     | Biome format               |
| `npm test`           | Run tests                  |
| `npm run test:watch` | Vitest watch mode          |

## Content

Site data lives in JSON under `content/` and is validated with Zod:

- [`content/profile.json`](content/profile.json) — bio, socials, skills, experience, education
- [`content/projects.json`](content/projects.json) — project list (slug, summary, stack, links, featured)

Repositories in `src/server/repositories/` read and cache this content for pages and `/api/projects`.

## Structure

```
src/
  app/(site)/          # Home, projects, about
  components/          # Layout, UI (badge, button, dashed-frame), theme
  features/            # Profile + projects feature modules
  schemas/             # Zod schemas
  server/repositories/ # JSON-backed data access
content/               # Editable profile + projects JSON
```

## Theme

Header theme controls support light/dark, primary accent, and neutral palette. Preferences persist in `localStorage` and apply via `data-theme`, `data-primary`, and `data-neutral` on `<html>` before first paint.
