import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ChipProps = {
  children: ReactNode;
  className?: string;
  /**
   * `label` – Figma `Item/Label`: grey pill, 12/4 padding (homepage chips).
   * `tag` – Figma blog `tag`: #ebebeb, 8/2 padding, 6px radius.
   */
  variant?: "label" | "tag";
};

const variants = {
  label: "rounded-full bg-stroke-light px-3 py-1",
  tag: "rounded-[6px] bg-surface px-2 py-0.5",
} as const;

export function Chip({ children, className, variant = "label" }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap text-body3 text-ink",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
