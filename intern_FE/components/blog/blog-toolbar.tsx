"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { SearchField } from "@/components/ui/search-field";
import { UnderlineTabs } from "@/components/ui/underline-tabs";
import type { BlogCategory } from "@/lib/data/blog";
import { cn } from "@/lib/cn";

type BlogToolbarProps = {
  categories: BlogCategory[];
  className?: string;
};

/**
 * Figma `tab - action`: category tabs + search field.
 * 375px – stacked, search first, 12px apart.
 * ≥ lg  – one row, tabs fill, search fixed at 340px, 60px apart.
 * The tab strip overflows in every frame, so it scrolls horizontally with the
 * white chevron button Figma draws over its right edge.
 */
export function BlogToolbar({ categories, className }: BlogToolbarProps) {
  const [active, setActive] = useState(categories[0]?.id ?? "");
  const [query, setQuery] = useState("");

  function onSelect(id: string) {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className={cn("flex w-full flex-col gap-3 lg:flex-row lg:items-center lg:gap-[60px]", className)}>
      <CategoryTabs
        categories={categories}
        value={active}
        onChange={onSelect}
        className="order-2 lg:order-1 lg:min-w-0 lg:flex-1"
      />
      <SearchField
        label="Search articles"
        name="q"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="order-1 w-full lg:order-2 lg:w-[340px] lg:shrink-0"
      />
    </div>
  );
}

function CategoryTabs({
  categories,
  value,
  onChange,
  className,
}: {
  categories: BlogCategory[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScroll(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    update();
    const el = scrollerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update]);

  return (
    <div className={cn("relative h-11", className)}>
      <div
        ref={scrollerRef}
        onScroll={update}
        className="scrollbar-hide h-full overflow-x-auto overflow-y-hidden"
      >
        {/* min-w-full keeps the grey rule spanning the strip even when tabs are short */}
        <UnderlineTabs
          variant="heading"
          tabs={categories}
          value={value}
          onChange={onChange}
          label="Blog categories"
          className="h-full w-max min-w-full pr-8"
        />
      </div>

      {/* Figma `button position`: 32×44 white mask with a 32px round icon button */}
      <div
        aria-hidden={!canScroll}
        className={cn(
          "pointer-events-none absolute right-0 top-0 flex h-11 w-8 items-center bg-white pb-2.5 pt-0.5 transition-opacity",
          canScroll ? "opacity-100" : "opacity-0",
        )}
      >
        <button
          type="button"
          tabIndex={canScroll ? 0 : -1}
          aria-label="Scroll categories"
          onClick={() =>
            scrollerRef.current?.scrollBy({ left: scrollerRef.current.clientWidth * 0.6, behavior: "smooth" })
          }
          className="pointer-events-auto flex size-8 items-center justify-center rounded-full bg-white hover:bg-surface-a"
        >
          <Image src="/icons/chevron-right.svg" alt="" width={16} height={16} />
        </button>
      </div>
    </div>
  );
}
