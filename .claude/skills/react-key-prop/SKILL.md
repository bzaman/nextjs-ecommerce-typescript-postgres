---
name: react-key-prop
description: Guide proper usage of the key prop in React lists. Use when rendering lists, mapping arrays to components, or troubleshooting list-related state bugs.
---

# React: Key Prop Best Practices

## Core Principle

**Use stable, unique IDs from your data. Never use array index or generated-on-render values.**

The `key` prop gives React stable identity for reconciliation. Wrong keys cause state bugs, broken animations, and unnecessary remounts.

## The Right Pattern

Use a unique, stable ID from the data:

```jsx
{todos.map((todo) => (
  <li key={todo.id}>{todo.text}</li>
))}
```

If the data has no ID, generate one **once** when the data enters state — not during render:

```jsx
const itemsWithIds = data.map(item => ({
  ...item,
  _id: crypto.randomUUID(),
}));
setItems(itemsWithIds);
```

Use `crypto.randomUUID()` (built-in) or `nanoid` for shorter IDs.

## Anti-Patterns

Generated during render:

```jsx
// Wrong — new key every render forces full remount
<li key={Math.random()}>
<li key={Date.now()}>
```

Array index on dynamic lists:

```jsx
// Wrong — index breaks on reorder, insert, or filter
{items.map((item, index) => <li key={index}>...)}
```

The bug: index represents *position*, not *identity*. When items shift but indexes stay, React mutates the wrong components — form inputs keep old values, animations glitch, component state attaches to the wrong item.

`useId()` as a list key:

```jsx
// Wrong — useId() is for ARIA/form associations, not list keys
<li key={useId()}>
```

## When Index Is Actually Safe

Only when the list is truly static: never reordered, never filtered, items have no local state, and no insertions except at the end. In practice this is rare — default to generated IDs.