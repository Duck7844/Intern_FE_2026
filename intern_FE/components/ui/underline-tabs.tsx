"use client";

import { cn } from "@/lib/cn";

export type UnderlineTab<T extends string> = { id: T; label: string };

type UnderlineTabsProps<T extends string> = {
  tabs: UnderlineTab<T>[];
  value: T;
  onChange: (id: T) => void;
  label: string;
  className?: string;
  /**
   * `body` – Figma `item/tab/underline - body text/XS` (16/20, 8px below).
   * `heading` – Figma `item/tab/underline - heading text` (Bebas 20/24, 12px below).
   */
  variant?: "body" | "heading";
};

const variants = {
  body: {
    list: "gap-6",
    tab: "px-1 pb-2 text-btn",
  },
  heading: {
    list: "gap-5",
    tab: "pb-3 font-heading text-h5 tracking-[0.4px]",
  },
} as const;

/** Tabs on a 1px grey rule; the active tab carries a 2px brand underline. */
export function UnderlineTabs<T extends string>({
  tabs,
  value,
  onChange,
  label,
  className,
  variant = "body",
}: UnderlineTabsProps<T>) {
  const v = variants[variant];
  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn("flex w-full items-end border-b border-stroke-light", v.list, className)}
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
              "-mb-px shrink-0 whitespace-nowrap border-b-2 transition-colors",
              v.tab,
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
