import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "@/components/layout/site-footer";
import { SimpleHeader } from "@/components/layout/simple-header";
import { ContactCta } from "@/components/services/contact-cta";
import { PartnerLogos } from "@/components/services/partner-logos";
import { ServiceCard } from "@/components/services/service-card";
import { Container } from "@/components/ui/container";
import { PARTNERS, SERVICE_BLOCKS, SERVICES_HEADER, SERVICES_INTRO } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Pacificwide Services | Pacificwide",
  description: SERVICES_INTRO.description,
};

/**
 * Services page (design: 1440px frame). A 720px reading column holds the
 * intro, hero image, three service cards and the partner logos; the contact
 * CTA is full-bleed below.
 */
export default function ServicesPage() {
  return (
    <>
      <SimpleHeader nav={SERVICES_HEADER.nav} phone={SERVICES_HEADER.phone} accountLinks={SERVICES_HEADER.account} />
      <main className="flex flex-1 flex-col">
        <section className="bg-white pb-14 pt-14 md:pb-20 md:pt-20 lg:pb-[120px]">
          <Container size="narrow">
            <h1 className="text-h2-sm text-ink md:text-h2">{SERVICES_INTRO.title}</h1>
            <p className="mt-6 text-body2 text-ink">{SERVICES_INTRO.description}</p>

            <figure className="relative mt-8 aspect-video w-full overflow-hidden rounded-s bg-stroke-light">
              <Image
                src={SERVICES_INTRO.image}
                alt={SERVICES_INTRO.imageAlt}
                fill
                priority
                sizes="(min-width: 768px) 720px, 100vw"
                className="object-cover"
              />
            </figure>

            <div className="mt-14 flex flex-col gap-5 md:mt-24">
              {SERVICE_BLOCKS.map((block) => (
                <ServiceCard key={block.id} block={block} />
              ))}
            </div>

            <div className="mt-14 md:mt-20 lg:mt-[120px]">
              <PartnerLogos partners={PARTNERS} />
            </div>
          </Container>
        </section>

        <ContactCta />
      </main>
      <SiteFooter />
    </>
  );
}
