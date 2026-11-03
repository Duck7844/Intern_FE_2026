import Image from "next/image";
import type { Partner } from "@/lib/data/services";

/** "Trusted by our customer & partners": H4 heading and a row of greyscale logos. */
export function PartnerLogos({ partners }: { partners: Partner[] }) {
  return (
    <section aria-labelledby="partners-title" className="flex flex-col items-center gap-10 md:gap-12">
      <h2 id="partners-title" className="text-center text-h4 tracking-[0.24px] text-ink">
        Trusted by our customer &amp; partners
      </h2>
      <ul className="grid w-full grid-cols-2 items-center justify-items-center gap-x-6 gap-y-8 md:flex md:justify-between md:gap-10">
        {partners.map((p) => (
          <li key={p.name} className="flex items-center">
            <Image
              src={p.logo}
              alt={p.name}
              width={p.width}
              height={p.height}
              className="h-10 w-auto object-contain md:h-12"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
