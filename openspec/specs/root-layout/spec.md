# Root Layout

## Purpose

Defines the shared layout structure for all pages in the root route group, including the header composition and top-level theme provider configuration.

## Requirements

### Requirement: Root route group layout includes a header element
The root route group layout (`app/(root)/layout.tsx`) SHALL render a `<header>` element containing the `AnnouncementBar` and `Navbar` components, above the `<main>` content area.

#### Scenario: Header renders above main content
- **WHEN** any page within the root route group is rendered
- **THEN** the `<header>` element SHALL appear before the `<main>` element in the DOM

#### Scenario: Header contains announcement bar and navbar
- **WHEN** the root layout renders
- **THEN** the `<header>` SHALL contain the `AnnouncementBar` as the first child and `Navbar` as the second child

### Requirement: ThemeProvider wraps the application
The top-level `app/layout.tsx` SHALL wrap `{children}` with a `ThemeProvider` (from `next-themes`) configured to use the `"class"` attribute strategy.

#### Scenario: ThemeProvider is present in the HTML tree
- **WHEN** the app renders
- **THEN** a `ThemeProvider` with `attribute="class"` SHALL be an ancestor of all page content, enabling class-based dark mode toggling
