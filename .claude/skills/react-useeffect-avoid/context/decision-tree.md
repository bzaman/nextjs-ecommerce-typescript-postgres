# useEffect Decision Tree and Quick Reference

## Decision Tree: useEffect vs Alternatives

```
Need to sync with external system?
├─ Yes (browser APIs, websockets, timers)
│  └─ Use useEffect
│
└─ No (pure React application logic)
   ├─ Derived state calculation?
   │  ├─ Yes → Calculate during render
   │  └─ No → Continue...
   │
   ├─ User action triggered?
   │  ├─ Yes → Use event handler
   │  └─ No → Continue...
   │
   ├─ State reset needed?
   │  ├─ Yes → Use key prop
   │  └─ No → Continue...
   │
   └─ Really need effect after re-think?
      └─ Yes → Use useState/useReducer/setState pattern
```

## DON'T use useEffect for:

| Scenario | Problem | Alternative |
|----------|---------|-------------|
| **Derived state** | Double render | Calculate during render |
| **State resets** | Stale data | Use `key` prop |
| **User actions** | Lost intent | Event handlers |
| **List filtering** | Extra renders | Filter in render |
| **Browser APIs** | Tearing bugs (concurrent) | `useSyncExternalStore` |
| **Form submission** | Fragile flag pattern | Direct async handler |
| **Data fetching** | Manual cache management | React Query, SWR, Suspense |

## DO use useEffect for:

- Subscribing to external systems (websockets, browser APIs, etc.)
- Setting up timers with cleanup
- Managing third-party library integration
- Document title changes
- Analytics/telemetry when rendering completes

## React 19: New Alternatives

React 19 introduces the `use` API for reading resources in render:

```jsx
// React 19+ - Direct resource reading
function UserProfile({ userId }) {
  const user = use(fetchUser(userId)); // Reads promise directly

  return <div>{user.name}</div>;
}
```

This eliminates many data-fetching useEffect patterns entirely.

## Key Principles

1. **Effects are escape hatches** - use only when stepping outside React
2. **Event-driven over Effect-driven** - prefer handlers for user actions
3. **Render-time over Effect-time** - calculate values during render
4. **Single source of truth** - avoid duplicating state in effects
5. **Concurrent-safe** - use specialized hooks for external subscriptions