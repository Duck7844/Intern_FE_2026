import { Suspense } from "react";
import { HomeContent } from "@/components/home/home-content";
import { HomeSkeleton } from "@/components/home/home-states";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

/**
 * Header and footer form the prerendered shell; the CMS-driven sections
 * stream in per request so admin edits never need a rebuild.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <Suspense fallback={<HomeSkeleton />}>
          <HomeContent />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
