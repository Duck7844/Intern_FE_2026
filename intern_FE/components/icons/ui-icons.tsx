import type { SVGProps } from "react";

/**
 * Small UI glyphs drawn inline (currentColor) for the article page.
 * TODO(figma): swap for the exported icon assets when they are available.
 */
type Props = SVGProps<SVGSVGElement>;

const base = (size: number): Props => ({
  width: size,
  height: size,
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
});

export function ArrowLeftIcon({ size = 16, ...p }: Props & { size?: number }) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M16 10H4M9 5l-5 5 5 5" />
    </svg>
  );
}

export function ChevronLeftIcon({ size = 16, ...p }: Props & { size?: number }) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M12.5 4.5 7 10l5.5 5.5" />
    </svg>
  );
}

export function ChevronRightIcon({ size = 16, ...p }: Props & { size?: number }) {
  return (
    <svg {...base(size)} {...p}>
      <path d="m7.5 4.5 5.5 5.5-5.5 5.5" />
    </svg>
  );
}

export function LinkIcon({ size = 20, ...p }: Props & { size?: number }) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M8.5 11.5a3.5 3.5 0 0 0 4.95 0l2.3-2.3a3.5 3.5 0 0 0-4.95-4.95l-1.1 1.1" />
      <path d="M11.5 8.5a3.5 3.5 0 0 0-4.95 0l-2.3 2.3a3.5 3.5 0 0 0 4.95 4.95l1.1-1.1" />
    </svg>
  );
}

export function MailIcon({ size = 20, ...p }: Props & { size?: number }) {
  return (
    <svg {...base(size)} {...p}>
      <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
      <path d="m3 6 7 5 7-5" />
    </svg>
  );
}

export function SparkleIcon({ size = 16, ...p }: Props & { size?: number }) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M10 2.5 11.6 7l4.4 1.5-4.4 1.5L10 14.5 8.4 10 4 8.5 8.4 7 10 2.5Z" />
      <path d="M15.5 13.5 16 15l1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5.5-1.5Z" />
    </svg>
  );
}

export function CheckIcon({ size = 12, ...p }: Props & { size?: number }) {
  return (
    <svg {...base(size)} strokeWidth={2.2} {...p}>
      <path d="m4 10.5 3.8 3.8L16 6.3" />
    </svg>
  );
}
