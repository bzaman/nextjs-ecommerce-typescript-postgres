## Context

The app uses Next.js 16, Tailwind CSS v4, and shadcn/ui. Dark mode is implemented via the `.dark` class on the `<html>` element, controlled by the custom variant `@custom-variant dark (&:is(.dark *))` in `globals.css`. The root route group layout (`app/(root)/layout.tsx`) currently renders only a `<main>` with no header.

The site already has `--color-background`, `--color-foreground`, and all design tokens in place for both light and dark themes. `next-themes` is not yet installed but is the idiomatic choice for class-based theme toggling in Next.js.

## Goals / Non-Goals

**Goals:**
- Add a persistent `<header>` at the top of the root route group layout
- Include an `AnnouncementBar` above the `<Navbar>` inside the header
- Navbar: logo on the left, nav links + dark/light toggle on the right
- Theme toggle persists across page navigation via `next-themes`

**Non-Goals:**
- Mobile hamburger menu (responsive collapse) — post-MVP
- Authentication-aware nav links (sign in/out in nav) — separate change
- Animated announcement bar or dismissibility — post-MVP
- Server-side theme resolution beyond preventing flash — not required now

## Decisions

### 1. Use `next-themes` for dark/light toggle
`next-themes` adds a `ThemeProvider` that wraps the app and manages class toggling on `<html>`. Configured with `attribute="class"` to match the `.dark` class expected by Tailwind's custom variant.

**Alternatives considered:**
- Manual `localStorage` + `useEffect` — achieves the same but requires reinventing theme persistence, system preference detection, and SSR hydration safety that `next-themes` already handles.
- CSS `prefers-color-scheme` media query only — no user toggle support.

### 2. `ThemeProvider` lives in the root `app/layout.tsx`, not the route group
The `ThemeProvider` must wrap the entire `<body>` so theme class is set on `<html>` before any content renders. The `(root)` group layout adds the `<header>`; the top-level layout handles the provider.

### 3. Component co-location under `components/layout/`
`AnnouncementBar` and `Navbar` are layout-level shared components, not page-specific. Placing them in `components/layout/` (e.g., `components/layout/announcement-bar.tsx`, `components/layout/navbar.tsx`) keeps them distinct from UI primitives in `components/ui/`.

### 4. `ModeToggle` as a separate client component
The theme toggle button must be a Client Component (`"use client"`) because it uses `useTheme()` from `next-themes`. Extracting it to `components/layout/mode-toggle.tsx` keeps `Navbar` itself as a Server Component.

## Risks / Trade-offs

- **Flash of incorrect theme (FOIT)** → `next-themes` suppresses this via a blocking script injected into `<head>` when `enableSystem` is set. Risk is low.
- **`next-themes` package addition** → Minor dependency; well-maintained and purpose-built for this stack. No significant risk.
- **Announcement bar content is hardcoded** → Acceptable for now; content can be made data-driven later without changing the component contract.
