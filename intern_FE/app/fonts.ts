import { Bebas_Neue } from "next/font/google";
import localFont from "next/font/local";

/**
 * Heading face – matches Figma "Bebas Neue Regular".
 */
export const headingFont = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

/**
 * Body face – Figma "Gilroy" (Medium 500 for body/buttons, Bold 700 for
 * emphasised text). Self-hosted from app/fonts/gilroy via next/font/local;
 * only the two weights the design uses are shipped.
 */
export const bodyFont = localFont({
  src: [
    { path: "./fonts/gilroy/Gilroy-Medium.woff", weight: "500", style: "normal" },
    { path: "./fonts/gilroy/Gilroy-Bold.woff", weight: "700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});
