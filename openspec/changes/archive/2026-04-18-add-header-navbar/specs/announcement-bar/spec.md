## ADDED Requirements

### Requirement: Announcement bar renders above the navbar
The system SHALL render a full-width announcement bar as the topmost element inside the `<header>` tag, above the `<Navbar>` component.

#### Scenario: Announcement bar is visible on all root-group pages
- **WHEN** any page within the root route group is loaded
- **THEN** the announcement bar SHALL appear at the very top of the page header, spanning the full viewport width

### Requirement: Announcement bar displays a text message
The announcement bar SHALL display a short promotional or informational text message centered within the bar.

#### Scenario: Message is centered
- **WHEN** the announcement bar renders
- **THEN** the message text SHALL be horizontally centered within the bar

#### Scenario: Bar uses theme-aware styling
- **WHEN** the page is in light mode
- **THEN** the bar SHALL use foreground/background colors consistent with the site's light theme tokens

#### Scenario: Bar uses dark theme styling
- **WHEN** the page is in dark mode
- **THEN** the bar SHALL adapt its colors using dark theme tokens so it remains readable
