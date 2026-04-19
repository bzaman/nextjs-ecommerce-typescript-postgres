---
name: react-use-callback
description: Guide proper usage of the useCallback hook in React. Use when optimizing function references, passing callbacks to memoized components, or preventing unnecessary re-renders.
---

# React: useCallback Best Practices

## Core Principle

**`useCallback` caches a function definition between re-renders until its dependencies change. Use it only for specific performance reasons — not by default.**

Most callbacks don't need it. Reach for `useCallback` when you have a concrete reason, not as a habit.

## When to Use

### Passing Callbacks to Memoized Children

When the child is wrapped in `memo()`, a new function on every render defeats the memoization:

```jsx
const ExpensiveChild = memo(function ExpensiveChild({ onClick }) {
  return <button onClick={onClick}>Click me</button>;
});

function Parent({ productId }) {
  const handleClick = useCallback(() => {
    console.log('Clicked:', productId);
  }, [productId]);

  return <ExpensiveChild onClick={handleClick} />;
}
```

### Function as an Effect Dependency

If a function must be referenced in `useEffect`'s dependency array, stabilize it:

```jsx
const createOptions = useCallback(() => {
  return { serverUrl: 'https://localhost:1234', roomId };
}, [roomId]);

useEffect(() => {
  const connection = createConnection(createOptions());
  connection.connect();
  return () => connection.disconnect();
}, [createOptions]);
```

Better: move the function *inside* the effect and skip `useCallback` entirely:

```jsx
useEffect(() => {
  function createOptions() {
    return { serverUrl: 'https://localhost:1234', roomId };
  }
  const connection = createConnection(createOptions());
  connection.connect();
  return () => connection.disconnect();
}, [roomId]);
```

### Custom Hook Return Values

Functions returned from custom hooks should be stable so consumers can safely use them in effects or pass them to memoized components:

```jsx
function useRouter() {
  const { dispatch } = useContext(RouterStateContext);

  const navigate = useCallback((url) => {
    dispatch({ type: 'navigate', url });
  }, [dispatch]);

  const goBack = useCallback(() => {
    dispatch({ type: 'back' });
  }, [dispatch]);

  return { navigate, goBack };
}
```

### Reducing Dependencies with Updater Functions

Prefer state updater form to eliminate the state itself from the dependency array:

```jsx
// Before — todos in deps causes the callback to change on every update
const handleAddTodo = useCallback((text) => {
  setTodos([...todos, { id: nextId++, text }]);
}, [todos]);

// After — no todos dependency needed
const handleAddTodo = useCallback((text) => {
  setTodos(prev => [...prev, { id: nextId++, text }]);
}, []);
```

## When NOT to Use

### Child Is Not Memoized

Without `memo()` on the child, stabilizing the callback does nothing — the child re-renders regardless:

```jsx
function Parent() {
  // Pointless — Child will re-render anyway
  const handleClick = useCallback(() => console.log('clicked'), []);
  return <Child onClick={handleClick} />;
}
```

### Coarse Interactions

Page-level actions like navigation re-render the world anyway. Memoization adds complexity without measurable benefit:

```jsx
function App() {
  const [page, setPage] = useState('home');
  // Unnecessary — page transitions are inherently expensive
  const navigate = useCallback((page) => setPage(page), []);
  return <Navigation onNavigate={navigate} />;
}
```

### When Restructuring Is Better

Accept JSX as children to let React skip re-rendering subtrees:

```jsx
function Panel({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      {isOpen && children}
    </div>
  );
}

// ExpensiveComponent is not re-created when Panel's state changes
<Panel><ExpensiveComponent /></Panel>
```

Keep state local to the component that needs it instead of lifting it and memoizing callbacks:

```jsx
function SearchForm() {
  const [query, setQuery] = useState('');
  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}
```

## Anti-Patterns

Missing dependency array:

```jsx
// Wrong — returns a new function every render
const handleClick = useCallback(() => {
  doSomething();
});

// Correct
const handleClick = useCallback(() => {
  doSomething();
}, []);
```

Calling hooks inside loops:

```jsx
// Wrong — hooks can't be called in loops
function List({ items }) {
  return items.map(item => {
    const handleClick = useCallback(() => sendReport(item), [item]);
    return <Chart key={item.id} onClick={handleClick} />;
  });
}
```

Fix by extracting to a child component:

```jsx
function List({ items }) {
  return items.map(item => <Report key={item.id} item={item} />);
}

const Report = memo(function Report({ item }) {
  const handleClick = useCallback(() => sendReport(item), [item]);
  return <Chart onClick={handleClick} />;
});
```

## useCallback vs useMemo

`useCallback(fn, deps)` caches the function itself. `useMemo(() => fn, deps)` caches the result of calling a function. For functions, they're equivalent:

```jsx
const memoized = useCallback(fn, deps);
const memoized = useMemo(() => fn, deps);
```

Use `useCallback` for callbacks, `useMemo` for computed values.

## Note on React Compiler

React Compiler automatically memoizes values and functions, removing the need for most manual `useCallback` calls. If the project is on a React Compiler-enabled setup, prefer letting the compiler handle memoization.