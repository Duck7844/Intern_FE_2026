import { ListingCard } from "@/components/cards/listing-card";
import { Carousel } from "@/components/ui/carousel";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PICKED_LISTINGS } from "@/lib/data/home";

/** Figma `re/your home/1440px` – "Picked For You" listing row. */
export function PickedForYou() {
  return (
    <section className="bg-white py-10 md:py-16 lg:py-20">
      <Container className="flex flex-col items-center gap-8 md:gap-10">
        <SectionHeading title="Picked For You" description="Based on what you've explored" />
        <Carousel label="Picked for you listings" itemClassName="w-[280px] sm:w-[320px]">
          {PICKED_LISTINGS.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
