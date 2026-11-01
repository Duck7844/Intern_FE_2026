import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

type ContainerProps<T extends ElementType> = {
  as?: T;
  className?: string;
  /**
   * `default` – homepage behaviour: 1142px max box with 16/24/32px gutters.
   * `fluid` – Figma multi-viewport pages (Blog): gutters scale with the
   * viewport (10% from `lg`) and the 1142px cap applies to the content box,
   * so 1366 → 1093px, 1440 → 1142px with 149px margins, 1920 → 1142px centred.
   */
  gutter?: "default" | "fluid";
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

const gutters = {
  default: "mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8",
  fluid: "mx-auto box-content max-w-content px-4 sm:px-6 lg:px-[10%]",
} as const;

export function Container<T extends ElementType = "div">({
  as,
  className,
  gutter = "default",
  ...props
}: ContainerProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  return <Tag className={cn(gutters[gutter], className)} {...props} />;
}
