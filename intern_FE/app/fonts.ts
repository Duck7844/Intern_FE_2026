import { Bebas_Neue, Outfit } from "next/font/google";

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
 * Body face – Figma uses Gilroy (Medium 500 / Bold 700), a commercial font.
 * Outfit is a close geometric stand-in until licensed Gilroy files are added.
 *
 * To switch to Gilroy, drop the .woff2 files in app/fonts/gilroy/ and replace
 * the export below with:
 *
 *   import localFont from "next/font/local";
 *   export const bodyFont = localFont({
 *     src: [
 *       { path: "./fonts/gilroy/Gilroy-Medium.woff2", weight: "500", style: "normal" },
 *       { path: "./fonts/gilroy/Gilroy-Bold.woff2", weight: "700", style: "normal" },
 *     ],
 *     variable: "--font-body",
 *     display: "swap",
 *   });
 */
export const bodyFont = Outfit({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
