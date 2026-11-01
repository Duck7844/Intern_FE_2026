import type { SVGProps } from "react";

/**
 * Placeholder social glyphs for the footer (16px, currentColor).
 * TODO(figma): swap for the exported `icon/social/*` assets once quota resets.
 */
type Props = SVGProps<SVGSVGElement>;
const base: Props = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true };

export const SOCIAL_ICONS = {
  facebook: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.3c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.4H7.4V14h2.8v8h3.3z" />
    </svg>
  ),
  youtube: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-3.2.5-4.8s-.1-3.2-.5-4.8zM9.7 15.4V8.6l6 3.4-6 3.4z" />
    </svg>
  ),
  instagram: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm5.9-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM21 8.2c-.1-1.5-.4-2.8-1.5-3.9S17.1 2.9 15.6 2.8c-1.5-.1-6.1-.1-7.6 0C6.5 2.9 5.2 3.2 4.1 4.3S2.7 6.7 2.6 8.2c-.1 1.5-.1 6.1 0 7.6.1 1.5.4 2.8 1.5 3.9s2.4 1.4 3.9 1.5c1.5.1 6.1.1 7.6 0 1.5-.1 2.8-.4 3.9-1.5s1.4-2.4 1.5-3.9c.1-1.5.1-6.1 0-7.6zm-2 9.2a3 3 0 0 1-1.7 1.7c-1.2.5-4 .4-5.3.4s-4.1.1-5.3-.4A3 3 0 0 1 5 17.4c-.5-1.2-.4-4-.4-5.3s-.1-4.1.4-5.3A3 3 0 0 1 6.7 5c1.2-.5 4-.4 5.3-.4s4.1-.1 5.3.4A3 3 0 0 1 19 6.7c.5 1.2.4 4 .4 5.3s.1 4.1-.4 5.3z" />
    </svg>
  ),
  x: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L1.8 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.3 4.7H5.5l11.2 14.5z" />
    </svg>
  ),
  linkedin: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M20.4 2H3.6C2.7 2 2 2.7 2 3.6v16.8c0 .9.7 1.6 1.6 1.6h16.8c.9 0 1.6-.7 1.6-1.6V3.6c0-.9-.7-1.6-1.6-1.6zM8 19H5V9.5h3V19zM6.5 8.2a1.7 1.7 0 1 1 0-3.5 1.7 1.7 0 0 1 0 3.5zM19 19h-3v-4.6c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4V19h-3V9.5h2.9v1.3c.4-.8 1.4-1.5 2.8-1.5 3 0 3.6 2 3.6 4.6V19z" />
    </svg>
  ),
  tiktok: (p: Props) => (
    <svg {...base} {...p}>
      <path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-1.8-2.5V9.7a5.7 5.7 0 1 0 5 5.7V9.1a7.3 7.3 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.3-1.6z" />
    </svg>
  ),
} as const;

export type SocialId = keyof typeof SOCIAL_ICONS;
