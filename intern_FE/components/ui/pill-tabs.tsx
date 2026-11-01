"use client";

import { cn } from "@/lib/cn";

export type PillTab<T extends string> = { id: T; label: string };

type PillTabsProps<T extends string> = {
  tabs: PillTab<T>[];
  value: T;
  onChange: (id: T) => void;
  label: string;
  className?: string;
};

/** Figma `item/tab/pill/XS` – dark pill for the active tab, grey for the rest. */
export function PillTabs<T extends string>({ tabs, value, onChange, label, className }: PillTabsProps<T>) {
  return (
    <div role="tablist" aria-label={label} className={cn("flex flex-wrap items-center gap-3", className)}>
      {tabs.map((t) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t.id)}
            className={cn(
              "rounded-full px-4 py-1 text-body2 transition-colors",
              active ? "bg-ink text-white" : "bg-surface text-ink hover:bg-stroke-light",
            )}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
