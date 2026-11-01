import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  /** Figma H2 (44/44) by default; "h3" uses the 28/32 style. */
  level?: "h2" | "h3";
  className?: string;
};

/** Figma `heading - description` group: title + optional body, 4px apart. */
export function SectionHeading({
  title,
  description,
  align = "center",
  level = "h2",
  className,
}: SectionHeadingProps) {
  const Tag = level;
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-1 text-ink",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <Tag className={cn(level === "h2" ? "text-h2-sm md:text-h2" : "text-h3", "[text-wrap:balance]")}>
        {title}
      </Tag>
      {description && <p className="text-body2 md:text-body1 [text-wrap:balance]">{description}</p>}
    </div>
  );
}
