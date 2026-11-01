import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Figma `Item/Label` – grey pill, 14/20 text. */
export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-full bg-stroke-light px-3 py-1 text-body3 text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
