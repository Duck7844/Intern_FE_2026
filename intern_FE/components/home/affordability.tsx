import { ListingCard } from "@/components/cards/listing-card";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import { CheckList } from "@/components/ui/check-list";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { AFFORDABILITY_CHIPS, AFFORDABILITY_POINTS, AFFORDABLE_LISTINGS } from "@/lib/data/home";

/** Figma `re/home affordability/1440px` – pitch + chips + affordable listings. */
export function Affordability() {
  return (
    <section className="bg-surface-a py-14 md:py-20 lg:py-[120px]">
      <Container className="flex flex-col items-center gap-10 md:gap-[60px]">
        {/* Pitch */}
        <div className="flex flex-col items-center gap-6 md:gap-8">
          <div className="flex flex-col items-center gap-5 md:gap-6">
            <SectionHeading
              title="Find home you can afford"
              description={
                <>
                  Get instant matches for homes in your price range
                  <br className="hidden md:block" /> with no guesswork and only real options.
                </>
              }
            />
            <CheckList items={AFFORDABILITY_POINTS} className="self-start md:self-center" />
          </div>
          <Button href="#" size="sm">
            Calculate Your Affordability
          </Button>
        </div>

        {/* Matches */}
        <div className="flex w-full flex-col items-center gap-6 md:gap-8">
          <div className="flex flex-col items-center gap-3">
            <h3 className="text-h3 text-center text-ink">Homes You Can Afford</h3>
            <ul className="flex flex-wrap items-center justify-center gap-2">
              {AFFORDABILITY_CHIPS.map((c) => (
                <li key={c}>
                  <Chip>{c}</Chip>
                </li>
              ))}
            </ul>
          </div>
          <Carousel label="Homes you can afford" itemClassName="w-[280px] sm:w-[320px]">
            {AFFORDABLE_LISTINGS.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </Carousel>
        </div>
      </Container>
    </section>
  );
}
