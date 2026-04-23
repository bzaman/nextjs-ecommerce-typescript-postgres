import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  title?: string;
  ariaHidden?: boolean;
  strokeWidth?: number;
}

const IconMenu = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      size = 30,
      style,
      title,
      className,
      ariaHidden = false,
      strokeWidth = 1.8,
      ...props
    },
    ref,
  ) => (
    <svg
      ref={ref}
      viewBox="0 0 44 44"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("pointer-events-none svg-icon-menu", "size-(--icon-size)", className)}
      style={{ "--icon-size": `${size}px`, ...style } as React.CSSProperties}
      aria-hidden={ariaHidden}
      {...props}
    >
      {title && <title>{title}</title>}
      <path d="M13 14.5H31" stroke="currentColor"></path>
      <path d="M13 19.5H22.47" stroke="currentColor"></path>
      <path d="M13 24.5H31" stroke="currentColor"></path>
      <path d="M13 29.5H22.47" stroke="currentColor"></path>
    </svg>
  ),
);

IconMenu.displayName = "IconMenu";
export default IconMenu;
