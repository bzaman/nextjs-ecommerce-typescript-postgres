"use client"

import { useTheme } from "next-themes"

// useTheme from next-themes is preferred over window.matchMedia because it
// respects the user's manual theme override, not just the OS preference.
// ThemeProvider in app/layout.tsx must be an ancestor for this to work.
export function useDarkMode(): boolean {
  const { resolvedTheme } = useTheme()
  return resolvedTheme === "dark"
}
