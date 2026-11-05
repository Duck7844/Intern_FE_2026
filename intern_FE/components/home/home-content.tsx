import { getHomeSections, indexSections } from "@/lib/api/public";
import type { HomeSection } from "@/types/api";
import { Affordability } from "./affordability";
import { Agents } from "./agents";
import { BrowseByLocation } from "./browse-by-location";
import { FindHomes } from "./find-homes";
import { Hero } from "./hero";
import { HomeEmpty, HomeError } from "./home-states";
import { HomeEstimate } from "./home-estimate";
import { PickedForYou } from "./picked-for-you";
import { PreApproval } from "./pre-approval";
import { toCopy } from "./section-copy";
import { Services } from "./services";
import { Testimonials } from "./testimonials";

/**
 * Server Component that renders the homepage from the CMS. It runs on every
 * request (inside the page's Suspense boundary) so edits made in /admin are
 * visible immediately. Blocks whose key is missing from the API are simply
 * not rendered; the static "Services" cards have no CMS copy yet.
 */
export async function HomeContent() {
  let sections: HomeSection[];
  try {
    sections = await getHomeSections();
  } catch (error) {
    return <HomeError detail={error instanceof Error ? error.message : undefined} />;
  }
  if (sections.length === 0) return <HomeEmpty />;

  const byKey = indexSections(sections);
  const copy = (key: string) => {
    const section = byKey.get(key);
    return section ? toCopy(section) : null;
  };

  const hero = copy("hero");
  const picked = copy("picked_for_you");
  const findHomes = copy("find_homes");
  const affordability = copy("affordability");
  const estimate = copy("home_estimate");
  const preApproval = copy("pre_approval");
  const testimonials = copy("testimonials");
  const agents = copy("agents");
  const browse = copy("browse_by_location");

  return (
    <>
      {hero && <Hero copy={hero} />}
      <Services />
      {picked && <PickedForYou copy={picked} />}
      {findHomes && <FindHomes copy={findHomes} />}
      {affordability && <Affordability copy={affordability} />}
      {estimate && <HomeEstimate copy={estimate} />}
      {preApproval && <PreApproval copy={preApproval} />}
      {testimonials && <Testimonials copy={testimonials} />}
      {agents && <Agents copy={agents} />}
      {browse && <BrowseByLocation copy={browse} />}
    </>
  );
}
