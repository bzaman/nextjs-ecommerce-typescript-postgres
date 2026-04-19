---
name: react-use-client-boundary
description: Guide proper usage of "use client" directive in React/Next.js. Use when adding client components, troubleshooting Server Component errors, or deciding where to place the client boundary.
---

# React "use client" Directive

## Core Principle

**`"use client"` marks a *boundary* between server and client, not a label for individual components.**

Once a component crosses the boundary, everything it imports is automatically a client component. Adding `"use client"` to children that are already imported by a client component is redundant and misleading.

## When to Add It

Add `"use client"` only when **both** are true:

1. The component is imported directly by a Server Component (or is a page/layout entry point)
2. The component needs client-side features:
   - React hooks (`useState`, `useEffect`, `useContext`, etc.)
   - Event handlers (`onClick`, `onChange`, `onSubmit`)
   - Browser APIs (`window`, `document`, `localStorage`)
   - Third-party libraries that rely on any of the above

## When NOT to Add It

- The parent (importer) is already a client component — you're inside the boundary
- The component is pure presentation and just renders props
- "Just to be safe" — this fragments the boundary and confuses future readers
- The component accepts props — props work fine in server components

## The Redundant-Directive Mistake

```tsx
// components/form.tsx
"use client"
import { Input } from "./input"
import { Button } from "./button"

export function Form() {
  const [value, setValue] = useState("")
  return (
    <form>
      <Input value={value} onChange={setValue} />
      <Button type="submit">Send</Button>
    </form>
  )
}

// components/input.tsx
// Wrong — already inside a client boundary
"use client"
export function Input({ value, onChange }) {
  return <input value={value} onChange={e => onChange(e.target.value)} />
}

// components/button.tsx
// Wrong — already inside a client boundary
"use client"
export function Button({ children, type }) {
  return <button type={type}>{children}</button>
}
```

Correct: the directive lives only at the boundary entry. Children inherit client context automatically.

```tsx
// components/input.tsx — no directive needed
export function Input({ value, onChange }) {
  return <input value={value} onChange={e => onChange(e.target.value)} />
}
```

## Decision Rule

Walk the import chain upward from the component in question:

- If any ancestor in the chain already has `"use client"` → don't add it
- If the component is imported by a Server Component **and** needs client features → add it
- If the component is imported by a Server Component but is pure presentation → don't add it; keep it a server component

## Real-World Pattern: Page with Interactive Section

```tsx
// app/products/page.tsx — Server Component (no directive)
import { ProductList } from "@/components/product-list"
import { SearchFilters } from "@/components/search-filters"
import { getProducts } from "@/lib/api"

export default async function ProductsPage() {
  const products = await getProducts()
  return (
    <main>
      <h1>Products</h1>
      <SearchFilters />
      <ProductList data={products} />
    </main>
  )
}

// components/search-filters.tsx — boundary entry
"use client"
import { FilterDropdown } from "./filter-dropdown"
import { PriceSlider } from "./price-slider"

export function SearchFilters() {
  const [filters, setFilters] = useState({})
  return (
    <div>
      <FilterDropdown onSelect={...} />
      <PriceSlider onChange={...} />
    </div>
  )
}

// components/filter-dropdown.tsx — no directive, inherits client context
export function FilterDropdown({ onSelect }) {
  return <select onChange={e => onSelect(e.target.value)}>...</select>
}
```

## Shared Components

A pure-presentation component with no directive works in **both** server and client trees. Don't add `"use client"` preemptively — it unnecessarily forces the component to the client when a Server Component imports it.

```tsx
// components/card.tsx — no directive, works in either context
export function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  )
}
```

## Common Errors

**"useState only works in Client Components"**
A hook is being used in a component without `"use client"` that's imported by a server component. Add the directive, or move the hook to a parent client component.

**"Event handlers cannot be passed to Client Components from Server Components"**
A function prop is being passed across the boundary from server to client. Move the handler definition into the client component, or restructure so the handler is created on the client side.

**"async/await is not yet supported in Client Components"**
An async component is inside a client boundary. Keep data fetching in server components and pass resolved data as props into the client component.

## Rules

- Place `"use client"` at the highest point that genuinely needs it, not below and not above
- Keep the client boundary as small as possible — more server-rendered content means less JS shipped
- Let children inherit client context; don't re-declare the directive
- Fetch data in server components and pass it down, not the other way around