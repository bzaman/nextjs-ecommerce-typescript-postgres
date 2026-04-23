# VANTAGE STORE

> Curated Wear & Wares — Bridging the gap between functional fashion and lifestyle design through a seamless blend of clothing, accessories, and everyday objects.

A full-stack e-commerce application built with Next.js 16 (App Router), TypeScript, and PostgreSQL.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) — App Router, Server Components, Server Actions |
| Runtime | [React 19](https://react.dev) |
| Language | [TypeScript 5](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) + [tw-animate-css](https://github.com/jamiebuilds/tailwindcss-animate) |
| UI Components | [shadcn/ui](https://ui.shadcn.com) (radix-nova style) |
| Primitives | [Radix UI](https://www.radix-ui.com) |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) — system, light, dark |
| Fonts | [Open Sans](https://fonts.google.com/specimen/Open+Sans) (body), [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue) (headings) via `next/font` |
| Variant utility | [class-variance-authority](https://cva.style) |
| Class merging | [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) |
| Build | [Turbopack](https://turbo.build/pack) |
| Linting | [ESLint 9](https://eslint.org) |
| Database | PostgreSQL (coming soon) |

---

## Project Structure

```
app/                    # App Router — layouts, pages, loading & not-found UI
  (root)/               # Route group for storefront pages
  globals.css           # Global styles and Tailwind theme tokens
  layout.tsx            # Root layout with font setup and ThemeProvider

components/
  icons/                # Custom SVG icon components (menu, moon, sun, user, cart, x)
  layout/               # Navbar, Footer, AnnouncementBar, OffCanvasNav
  providers/            # ThemeProvider wrapper
  ui/                   # shadcn/ui components (Button, Sheet, ThemeToggle, Spinner, LogoMark)

hooks/
  useDarkMode.ts        # Returns current dark mode boolean (SSR-safe)
  useIsClient.ts        # useSyncExternalStore-based client-only guard

lib/
  constants/            # APP_NAME, APP_DESC, SERVER_URL
  utils.ts              # cn() helper (clsx + tailwind-merge)

actions/                # Next.js Server Actions
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm / pnpm / bun

### Install dependencies

```bash
npm install
```

### Environment variables

Copy the example and fill in values:

```bash
cp .env.example .env.local
```

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_APP_NAME` | `VANTAGE STORE` | Displayed app name |
| `NEXT_PUBLIC_DESC` | *(see constants)* | Meta description |
| `NEXT_PUBLIC_SERVER_URL` | `http://localhost:3000/` | Canonical base URL |

### Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The dev server uses **Turbopack** for fast HMR.

### Other scripts

```bash
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

---

## UI Components (shadcn/ui)

Components live in `components/ui/` and follow the shadcn/ui pattern — owned source files, not a package import. The config is in [components.json](components.json).

| Component | Notes |
|---|---|
| `Button` | CVA-based with `default`, `secondary`, `ghost`, `destructive`, `link` variants |
| `Sheet` | Radix Dialog-based drawer (left/right/top/bottom sides) |
| `ThemeToggle` | Icon-only or labelled toggle; SSR-safe via `useIsClient` |
| `Spinner` | CSS-module animated loading indicator |
| `LogoMark` | SVG wordmark wrapped in a `next/link` |

To add more shadcn components:

```bash
npx shadcn@latest add <component>
```

---

## Theming

Dark/light mode is handled by `next-themes` with `attribute="class"`. The default is `system`. CSS variables for colors, typography, and spacing are defined in `app/globals.css` under `@theme`.

The `ThemeToggle` component is SSR-safe — it uses `useSyncExternalStore` (via `useIsClient`) instead of `useEffect` to avoid hydration mismatches and layout shift.

---

## Author

**Badiuzzaman** — [Upwork](https://www.upwork.com/freelancers/~01dc1a347430f5ff7c)
