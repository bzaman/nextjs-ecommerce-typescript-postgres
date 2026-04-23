import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  title?: string;
  ariaHidden?: boolean;
  strokeWidth?: number;
}

const IconX = forwardRef<SVGSVGElement, IconProps>(
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
      aria-hidden={ariaHidden}
      {...props}
    >
      {title && <title>{title}</title>}
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  ),
);

IconX.displayName = "IconX";
export default IconX;
