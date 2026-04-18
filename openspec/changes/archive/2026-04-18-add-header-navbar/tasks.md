## 1. Dependencies

- [x] 1.1 Install `next-themes` package

## 2. ThemeProvider Setup

- [x] 2.1 Create `components/layout/theme-provider.tsx` — thin wrapper re-exporting `ThemeProvider` from `next-themes` as a Client Component
- [x] 2.2 Wrap `{children}` in `app/layout.tsx` with `ThemeProvider` using `attribute="class"` and `defaultTheme="system"` with `enableSystem`

## 3. ModeToggle Component

- [x] 3.1 Create `components/layout/mode-toggle.tsx` as a Client Component that uses `useTheme()` to toggle between `"light"` and `"dark"`
- [x] 3.2 Render a button with sun/moon icon (or text label) that calls `setTheme` on click

## 4. AnnouncementBar Component

- [x] 4.1 Create `components/layout/announcement-bar.tsx` — a full-width bar with centered text using theme-aware background/foreground colors

## 5. Navbar Component

- [x] 5.1 Create `components/layout/navbar.tsx` as a Server Component
- [x] 5.2 Render logo/brand name on the left side (link to `/`)
- [x] 5.3 Render nav links on the right side (at minimum a placeholder "Home" link)
- [x] 5.4 Render `<ModeToggle />` on the right side, after nav links

## 6. Root Route Group Layout

- [x] 6.1 Update `app/(root)/layout.tsx` to add a `<header>` containing `<AnnouncementBar />` and `<Navbar />` above the existing `<main>` element
