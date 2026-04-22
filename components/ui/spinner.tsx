"use client"
// "use client" is required because this component reads window.matchMedia via
// useDarkMode. Server components cannot access browser APIs.

import type { CSSProperties } from "react"
import styles from "./spinner.module.css"
import { cn } from "@/lib/utils"
import { useDarkMode } from "@/hooks/useDarkMode"

interface SpinnerProps {
  size?: number
  speed?: number
  color?: string
  className?: string
}

/**
 * Spinner
 *
 * An animated, accessible loading indicator built from eight orbiting dots.
 *
 * ## Why spinner.module.css (CSS Modules)
 * The animation requires ::before pseudo-elements, :nth-child() selectors, and
 * @keyframes — none of which are expressible as React inline styles. CSS Modules
 * compile each class to a unique hashed name (e.g. .dot → .dot_x7k2), so these
 * styles are guaranteed never to collide with other .dot classes elsewhere in the
 * app, even if another component uses the same name. The scoping is zero-cost:
 * no runtime, no wrapper element, just a build-time rename.
 *
 * ## How the animation works
 * The dots are stacked on top of each other and rotated by 45° increments (0°–315°)
 * via CSS in spinner.module.css. Each dot's ::before pseudo-element oscillates
 * in and out using a keyframe animation with a staggered animation-delay,
 * creating the orbiting pulse effect. The outer container rotates continuously.
 *
 * ## Why CSS variables as inline styles
 * The animation is driven by three CSS custom properties (--uib-size, --uib-color,
 * --uib-speed) that are consumed by spinner.module.css. Injecting them as inline
 * styles on the container is the standard pattern for passing dynamic JS values
 * into CSS without generating a new class at runtime. `as React.CSSProperties` is
 * needed because TypeScript's CSSProperties type does not cover custom properties.
 *
 * ## Why useDarkMode instead of a useEffect + useState pair
 * useSyncExternalStore (used inside useDarkMode) subscribes directly to the
 * MediaQueryList "change" event and re-renders only when the match result changes.
 * It also accepts a server snapshot (false = light) which prevents hydration
 * mismatches — something a useEffect approach cannot guarantee because effects
 * never run on the server.
 *
 * ## Accessibility
 * - role="status" on the container announces the spinner as a live region;
 *   screen readers will read aria-label="Loading" when the element appears.
 * - aria-hidden="true" on each dot suppresses the eight decorative divs from
 *   the accessibility tree — they carry no semantic meaning.
 */
export default function Spinner({ size = 40, speed = 0.9, color, className }: SpinnerProps) {
  const isDark = useDarkMode()
  // Fall back to a contrast-safe color only when the caller has not specified one.
  const resolvedColor = color ?? (isDark ? "white" : "black")

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("relative flex items-center justify-start", className)}
      style={
        {
          "--uib-size": `${size}px`,
          "--uib-color": resolvedColor,
          "--uib-speed": `${speed}s`,
          // Precomputed once on the container so every dot's ::before can reference
          // it without duplicating the calc() expression in CSS.
          "--uib-center": "calc(var(--uib-size) / 2 - var(--uib-size) / 5 / 2)",
          width: "var(--uib-size)",
          height: "var(--uib-size)",
          animation: "rotate calc(var(--uib-speed) * 3) linear infinite",
        } as CSSProperties
      }
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className={cn(styles.dot, "flex items-center justify-start absolute top-0 left-0 w-full h-full")}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}
