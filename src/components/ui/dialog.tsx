"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DialogProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Dialog({ open, onClose, title, children, className }: DialogProps) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative w-full max-w-md rounded-t-3xl bg-paper p-6 shadow-2xl sm:rounded-3xl",
          className
        )}
      >
        {onClose && (
          <button
            onClick={onClose}
            className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-bg text-muted hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {title && (
          <h2 className="mb-4 text-center text-lg font-bold text-ink">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}