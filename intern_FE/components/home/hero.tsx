import Image from "next/image";
import { resolveMediaUrl } from "@/lib/api/config";
import { HeroSearch } from "./hero-search";
import type { SectionCopy } from "./section-copy";

/** Figma `re/hero/1440px` – 624px tall, skyline background, centered copy + search card. */
export function Hero({ copy }: { copy: SectionCopy }) {
  const background = resolveMediaUrl(copy.imageUrl);

  return (
    <section className="relative isolate overflow-hidden bg-ink px-4 py-16 sm:px-6 md:py-20 lg:py-[100px]">
      {background && (
        <Image
          src={background}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
      )}
      {/* top-to-bottom black 80% -> transparent, 524px tall in Figma */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[524px] bg-gradient-to-b from-black/80 to-transparent"
      />

      <div className="mx-auto flex w-full max-w-[640px] flex-col items-center gap-10 md:max-w-[760px] md:gap-[72px]">
        <div className="flex flex-col items-center gap-3 text-center text-white">
          <h1 className="text-h1-sm [text-wrap:balance] md:text-h1">{copy.title}</h1>
          {copy.content && (
            <p className="text-body1 [text-wrap:balance] md:text-hero-sub">{copy.content}</p>
          )}
        </div>
        <HeroSearch />
      </div>
    </section>
  );
}
