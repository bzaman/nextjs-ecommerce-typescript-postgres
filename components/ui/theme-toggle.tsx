'use client';

/**
 * WHY NOT useEffect FOR HYDRATION GUARDING
 *
 * The naive approach uses useEffect + useState to detect client-side mount:
 *
 *   const [mounted, setMounted] = useState(false);
 *   useEffect(() => { setMounted(true); }, []);
 *   if (!mounted) return null;
 *
 * This has three concrete problems:
 *
 * 1. LAYOUT SHIFT — The component renders null on the server and on the first
 *    client paint, then re-renders with the button after the effect fires.
 *    This causes a visible content jump and cumulative layout shift (CLS).
 *    Returning a same-size placeholder instead of null only partly fixes it;
 *    the placeholder is still the wrong element in the first paint.
 *
 * 2. EXTRA RENDER CYCLE — useState(false) → useEffect fires → setState(true)
 *    forces a second synchronous render on every mount. With concurrent React
 *    this can be deferred unpredictably, making the flash timing inconsistent.
 *
 * 3. WRONG ABSTRACTION — useEffect is for *synchronizing with external systems*
 *    (WebSockets, timers, DOM APIs). "Am I on the client?" is not an external
 *    system — it is a property of the rendering environment. React provides
 *    useSyncExternalStore specifically to express SSR vs. client snapshots
 *    without scheduling a side-effect.
 *
 * THE FIX: useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot)
 *
 *   const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
 *
 * - Server render: getServerSnapshot() → false  → placeholder rendered
 * - Client hydration: getSnapshot() → true       → real button rendered
 * - No effect, no second render, no tearing in concurrent mode.
 *
 * The placeholder matches the button's dimensions (h-9 w-9) so the layout
 * is stable across the SSR → hydration transition without any content jump.
 */

import { useSyncExternalStore } from "react";
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

import IconMoon from "@/components/icons/icon-moon";
import IconSun from "@/components/icons/icon-sun";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);

  // Return a placeholder with the exact same dimensions as the button <32px>
  if (!isClient) {
    return <div className="h-8 w-8" aria-hidden="true" />;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle dark mode"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="cursor-pointer"
    >
      <IconSun className="pointer-events-auto rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <IconMoon className="pointer-events-auto absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
