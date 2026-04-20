import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  title?: string;
  ariaHidden?: boolean;
  strokeWidth?: number;
}

const IconUser = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      size = 20,
      style,
      title,
      className,
      ariaHidden = false,
      strokeWidth = 2,
      ...props
    },
    ref,
  ) => (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("pointer-events-none", "size-(--icon-size)", className)}
      // For square icons, `size-(--icon-size)` resolves to width/height: var(--icon-size) via Tailwind v4 CSS variable shorthand
      style={{ "--icon-size": `${size}px`, ...style } as React.CSSProperties}
      // For non-square icons, use CSS custom properties to preserve the viewBox aspect ratio:
      // style={
      //   {
      //     "--size": `calc(1px * ${size})`,
      //     "--vw": "24px",   // ← match viewBox width
      //     "--vh": "24px",   // ← match viewBox height
      //     width: "var(--size)",
      //     height: "calc((var(--vh) / var(--vw)) * var(--size))",
      //     ...style,
      //   } as React.CSSProperties
      // }
      aria-hidden={ariaHidden}
      {...props}
    >
      {title && <title>{title}</title>}
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
);

IconUser.displayName = "IconUser";
export default IconUser;
