import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "outline" | "ghost" | "neutral";
export type ButtonSize = "md" | "sm" | "xs";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans transition-colors " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "rounded-xs bg-brand text-white hover:bg-brand-dark",
  outline: "rounded-xs border border-brand bg-transparent text-brand hover:bg-brand/5",
  ghost: "rounded-none bg-transparent text-ink hover:underline",
  neutral: "rounded-full border border-stroke-bold bg-white text-ink hover:bg-surface-a",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-11 min-w-20 px-5 text-btn",
  sm: "h-10 min-w-20 px-5 text-btn",
  xs: "h-7 min-w-16 px-3 text-btn-xs",
};

/** Ghost buttons in Figma have no fixed height, only 4px vertical padding. */
const ghostSizes: Record<ButtonSize, string> = {
  md: "py-1 text-btn",
  sm: "py-1 text-btn",
  xs: "py-1 text-btn-xs",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(
    base,
    variants[variant],
    variant === "ghost" ? ghostSizes[size] : sizes[size],
    className,
  );

  if (rest.href !== undefined) {
    const { href, target, rel, "aria-label": ariaLabel } = rest;
    return (
      <Link href={href} target={target} rel={rel} aria-label={ariaLabel} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
