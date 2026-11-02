"use client";

import Image from "next/image";
import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons/ui-icons";
import { cn } from "@/lib/cn";

type CarouselProps = {
  children: ReactNode;
  /** Accessible name for the scroll region. */
  label: string;
  className?: string;
  /** Classes for each slide wrapper – set the card width here. */
  itemClassName?: string;
  /**
   * `overlay` – Figma homepage rows: round 40px buttons floating over the edges.
   * `header` – Figma article "Related learning resources": chevrons in a
   * header row, right of `heading`.
   */
  controls?: "overlay" | "header";
  heading?: ReactNode;
};

export function Carousel({
  children,
  label,
  className,
  itemClassName,
  controls = "overlay",
  heading,
}: CarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 2);
    setCanNext(el.scrollLeft < max - 2);
  }, []);

  useEffect(() => {
    update();
    const el = scrollerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update]);

  function scrollByOne(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap || "24") || 24;
    const step = first ? first.offsetWidth + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: step * direction, behavior: "smooth" });
  }

  const scroller = (
    <div
      ref={scrollerRef}
      onScroll={update}
      role="region"
      aria-label={label}
      tabIndex={0}
      className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
    >
      {Children.map(children, (child) => (
        <div className={cn("shrink-0 snap-start", itemClassName)}>{child}</div>
      ))}
    </div>
  );

  if (controls === "header") {
    return (
      <div className={cn("flex w-full flex-col gap-5", className)}>
        <div className="flex items-center justify-between gap-4">
          {heading}
          <div className="flex items-center gap-4">
            <HeaderArrow direction="prev" onClick={() => scrollByOne(-1)} disabled={!canPrev} />
            <HeaderArrow direction="next" onClick={() => scrollByOne(1)} disabled={!canNext} />
          </div>
        </div>
        {scroller}
      </div>
    );
  }

  return (
    <div className={cn("relative w-full", className)}>
      {scroller}
      <OverlayArrow direction="prev" onClick={() => scrollByOne(-1)} hidden={!canPrev} className="left-4" />
      <OverlayArrow direction="next" onClick={() => scrollByOne(1)} hidden={!canNext} className="right-4" />
    </div>
  );
}

function OverlayArrow({
  direction,
  onClick,
  hidden,
  className,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  hidden: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "next" ? "Next" : "Previous"}
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
      className={cn(
        "absolute top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-stroke-bold bg-white shadow-sm transition-opacity hover:bg-surface-a",
        hidden && "pointer-events-none opacity-0",
        className,
      )}
    >
      <Image
        src="/icons/arrow-right.svg"
        alt=""
        width={16}
        height={16}
        className={direction === "prev" ? "rotate-180" : undefined}
      />
    </button>
  );
}

function HeaderArrow({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  const Icon = direction === "next" ? ChevronRightIcon : ChevronLeftIcon;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "next" ? "Next" : "Previous"}
      className="flex size-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-a disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent"
    >
      <Icon size={16} />
    </button>
  );
}
