# Site Navbar

## Purpose

The primary navigation bar rendered inside the site header, containing the brand logo, navigation links, and a dark/light mode toggle.

## Requirements

### Requirement: Navbar renders inside the header
The system SHALL render a `<Navbar>` component inside the `<header>` tag, positioned below the announcement bar.

#### Scenario: Navbar is inside header
- **WHEN** any root-group page is loaded
- **THEN** the navbar SHALL be a direct child of the `<header>` element

### Requirement: Logo appears on the left side of the navbar
The navbar SHALL display the site logo (or brand name) aligned to the left.

#### Scenario: Logo is visible and left-aligned
- **WHEN** the navbar renders
- **THEN** the logo/brand element SHALL appear on the left side of the navbar row

### Requirement: Navigation links appear on the right side of the navbar
The navbar SHALL display at least one navigation link on the right side.

#### Scenario: Nav links are right-aligned
- **WHEN** the navbar renders
- **THEN** navigation links SHALL appear on the right side of the navbar row, to the left of the theme toggle

### Requirement: Dark/light mode toggle appears on the right side of the navbar
The navbar SHALL include a dark/light mode toggle button on the right side, after the nav links.

#### Scenario: Toggle button is visible
- **WHEN** the navbar renders
- **THEN** a theme toggle button SHALL be visible on the right side of the navbar

#### Scenario: Clicking toggle switches to dark mode
- **WHEN** the user is in light mode and clicks the theme toggle
- **THEN** the `.dark` class SHALL be applied to the `<html>` element, activating dark theme

#### Scenario: Clicking toggle switches to light mode
- **WHEN** the user is in dark mode and clicks the theme toggle
- **THEN** the `.dark` class SHALL be removed from the `<html>` element, restoring light theme

#### Scenario: Theme persists across navigation
- **WHEN** the user selects a theme and navigates to another page
- **THEN** the selected theme SHALL remain active on the new page

### Requirement: Navbar uses theme-aware styling
The navbar SHALL apply background and text colors using design tokens so it is readable in both light and dark mode.

#### Scenario: Navbar adapts to active theme
- **WHEN** the theme changes between light and dark
- **THEN** the navbar background and text colors SHALL update to match the active theme tokens
