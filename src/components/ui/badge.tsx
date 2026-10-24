import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "destructive" | "violet" | "amber" | "lime" | "cherry";
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-violet text-white",
      secondary: "bg-bg text-ink border border-line",
      outline: "bg-transparent border border-line text-ink",
      success: "bg-lime/10 text-lime-deep",
      warning: "bg-amber/10 text-amber-deep",
      destructive: "bg-cherry/10 text-cherry",
      violet: "bg-violet/10 text-violet",
      amber: "bg-amber/10 text-amber-deep",
      lime: "bg-lime/10 text-lime-deep",
      cherry: "bg-cherry/10 text-cherry",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };