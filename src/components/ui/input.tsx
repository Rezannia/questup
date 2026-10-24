import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-ink"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(
            "flex h-11 w-full rounded-xl border border-line bg-paper px-4 py-2 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-violet/40 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-cherry focus:ring-cherry/40",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-cherry">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };