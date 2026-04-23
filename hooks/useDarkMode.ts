"use client"

import { useTheme } from "next-themes"
import { useIsClient } from "@/hooks/useIsClient"

export function useDarkMode(): boolean {
  const { resolvedTheme } = useTheme()
  const isClient = useIsClient()
  return isClient && resolvedTheme === "dark"
}
