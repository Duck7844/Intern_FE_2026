"use client";

import { cn } from "@/lib/cn";

export type UnderlineTab<T extends string> = { id: T; label: string };

type UnderlineTabsProps<T extends string> = {
  tabs: UnderlineTab<T>[];
  value: T;
  onChange: (id: T) => void;
  label: string;
  className?: string;
};

/** Figma `item/tab/underline - body text/XS` on a 1px grey rule, active tab has a 2px brand underline. */
export function UnderlineTabs<T extends string>({ tabs, value, onChange, label, className }: UnderlineTabsProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn("flex w-full items-end gap-6 border-b border-stroke-light", className)}
    >
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
              "-mb-px whitespace-nowrap border-b-2 px-1 pb-2 text-btn transition-colors",
              active ? "border-brand text-ink" : "border-transparent text-ink hover:text-brand",
            )}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
