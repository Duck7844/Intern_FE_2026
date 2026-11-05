import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { BUDGET_TILES } from "@/lib/data/home";
import type { SectionCopy } from "./section-copy";

/** Figma `re/find home/1440px` – four budget tiles with "View Homes" links. */
export function FindHomes({ copy }: { copy: SectionCopy }) {
  return (
    <section className="bg-white py-14 md:py-20 lg:py-[120px]">
      <Container className="flex flex-col items-center gap-8 md:gap-10">
        <SectionHeading title={copy.title} description={copy.content} />
        <ul className="grid w-full grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {BUDGET_TILES.map((tile) => (
            <li key={tile.label} className="flex flex-col gap-3 md:gap-4">
              <Link
                href={tile.href}
                aria-label={tile.label}
                className="relative block h-[180px] w-full overflow-hidden rounded-s bg-brand sm:h-[240px] lg:h-[293px]"
              >
                <Image
                  src={tile.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 268px, 50vw"
                  className="object-cover"
                />
              </Link>
              <div className="flex flex-col gap-1">
                <p className="text-body3 text-ink sm:text-body2">{tile.label}</p>
                <Link
                  href={tile.href}
                  className="inline-flex items-center gap-1 text-body3 text-brand underline underline-offset-2 sm:text-body2"
                >
                  View Homes
                  <Image src="/icons/arrow-up-right.svg" alt="" width={16} height={16} />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
