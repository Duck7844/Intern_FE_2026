import type { Metadata } from "next";
import { bodyFont, headingFont } from "./fonts";
import "./globals.css";

/** Public URL of this site; used to resolve Open Graph image URLs. */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Pacificwide | Find homes you can afford",
  description:
    "Pacificwide combines real estate and mortgage in one team to help you close faster.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
