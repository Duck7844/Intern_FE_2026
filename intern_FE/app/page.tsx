import { Affordability } from "@/components/home/affordability";
import { Agents } from "@/components/home/agents";
import { BrowseByLocation } from "@/components/home/browse-by-location";
import { FindHomes } from "@/components/home/find-homes";
import { Hero } from "@/components/home/hero";
import { HomeEstimate } from "@/components/home/home-estimate";
import { PickedForYou } from "@/components/home/picked-for-you";
import { PreApproval } from "@/components/home/pre-approval";
import { Services } from "@/components/home/services";
import { Testimonials } from "@/components/home/testimonials";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Services />
        <PickedForYou />
        <FindHomes />
        <Affordability />
        <HomeEstimate />
        <PreApproval />
        <Testimonials />
        <Agents />
        <BrowseByLocation />
      </main>
      <SiteFooter />
    </>
  );
}
