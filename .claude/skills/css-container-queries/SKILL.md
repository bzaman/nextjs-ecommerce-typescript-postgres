---
name: css-container-queries
description: Apply CSS container queries for component-based responsive design. Use when building reusable components that should adapt to their container size rather than viewport size.
---

# CSS Container Queries

## When to Use

Use container queries for:
- Reusable components (cards, widgets, forms) appearing in multiple contexts
- Components that must adapt to parent size, not viewport

Use media queries for:
- Page-level layout (nav, sidebar placement, main grid)
- Global typography scaling
- Viewport-specific features

## Core Pattern

**CSS:**
```css
.wrapper {
  container-type: inline-size;
  container-name: card; /* optional but recommended when multiple containers exist */
}

@container card (min-width: 400px) {
  .title { font-size: 2rem; }
}
```

**Tailwind:**
```html
<div class="@container">
  <div class="@lg:grid-cols-2 @xl:grid-cols-3">...</div>
</div>
```

Named containers (when nesting):
```html
<div class="@container/sidebar">
  <nav class="@lg/sidebar:flex-col">...</nav>
</div>
```

## Rules

- Always define `@container` on a parent before using `@lg:`, `@md:` variants
- Use `inline-size` unless you specifically need height-based queries
- Name containers when nesting or when multiple containers exist in the same tree
- Don't use container queries for page-level layouts — use media queries
- Don't set fixed heights on containers with responsive content
- Keep nesting shallow; prefer named containers over deep nesting

## Decision Example

Component appears in sidebar (narrow) AND main area (wide)?
→ Container query. `md:` breakpoints would break in the sidebar.

Page switches from single-column mobile to three-column desktop?
→ Media query. This is page structure, not component adaptation.