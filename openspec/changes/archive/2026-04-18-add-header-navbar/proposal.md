## Why

The root route group layout currently lacks a site header, leaving users without navigation or brand identity. Adding a persistent header with an announcement bar and navbar establishes the core navigation structure needed for all pages in the app.

## What Changes

- Add an announcement bar component displayed above the navbar for site-wide messages
- Add a navbar component inside a `<header>` tag with logo on the left and nav links + dark/light mode toggle on the right
- Integrate both components into the root route group layout

## Capabilities

### New Capabilities
- `announcement-bar`: A full-width banner above the navbar for promotional or informational messages
- `site-navbar`: Responsive navigation bar with logo, nav links, and dark/light mode toggle

### Modified Capabilities
- `root-layout`: The root route group layout (`app/(root)/layout.tsx`) gains a `<header>` containing the announcement bar and navbar

## Impact

- **Files modified**: `app/(root)/layout.tsx`
- **New components**: `components/announcement-bar.tsx`, `components/navbar.tsx` (or colocated under a `header/` folder)
- **Dependencies**: None new; dark/light toggle will use Next.js-compatible theming (CSS variables or `next-themes` if already present)
