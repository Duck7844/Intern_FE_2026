import { Container } from "@/components/ui/container";
import { LOCATION_GROUPS } from "@/lib/data/home";
import { LocationTabs } from "./location-tabs";

/** Figma `re/ceo/1440px` ("Browse by Location") – H3, underline tabs, 5-column link grid. */
export function BrowseByLocation() {
  return (
    <section className="bg-white py-10 md:py-16 lg:py-20">
      <Container className="flex flex-col items-start gap-5">
        <h2 className="text-h3 text-ink">Browse by Location</h2>
        <LocationTabs groups={LOCATION_GROUPS} />
      </Container>
    </section>
  );
}
