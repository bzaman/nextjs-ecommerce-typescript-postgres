import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  title?: string;
  ariaHidden?: boolean;
  strokeWidth?: number;
}

const IconMoon = forwardRef<SVGSVGElement, IconProps>(
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
      <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
    </svg>
  ),
);

IconMoon.displayName = "IconMoon";
export default IconMoon;
