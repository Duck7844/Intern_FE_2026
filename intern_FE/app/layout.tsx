import type { Metadata } from "next";
import { bodyFont, headingFont } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
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
