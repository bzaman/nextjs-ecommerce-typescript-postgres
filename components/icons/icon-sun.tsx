import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  title?: string;
  ariaHidden?: boolean;
  strokeWidth?: number;
}

const IconSun = forwardRef<SVGSVGElement, IconProps>(
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
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  ),
);

IconSun.displayName = "IconSun";
export default IconSun;
