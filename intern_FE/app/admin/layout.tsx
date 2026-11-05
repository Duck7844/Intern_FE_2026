import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin | Pacificwide",
  robots: { index: false, follow: false },
};

/** Shared by the login page and the signed-in dashboard. */
export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <div className="flex min-h-full flex-1 flex-col bg-surface-a text-ink">{children}</div>;
}
