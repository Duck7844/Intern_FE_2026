import Image from "next/image";
import { HeroSearch } from "./hero-search";

/** Figma `re/hero/1440px` – 624px tall, skyline background, centered copy + search card. */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white px-4 py-16 sm:px-6 md:py-20 lg:py-[100px]">
      <Image
        src="/images/home/hero-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      {/* top-to-bottom black 80% -> transparent, 524px tall in Figma */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[524px] bg-gradient-to-b from-black/80 to-transparent"
      />

      <div className="mx-auto flex w-full max-w-[640px] flex-col items-center gap-10 md:w-fit md:min-w-[560px] md:max-w-full md:gap-[72px]">
        <div className="flex flex-col items-center gap-3 text-center text-white">
          <h1 className="text-h1-sm [text-wrap:balance] md:whitespace-nowrap md:text-h1 md:[text-wrap:initial]">
            Find homes you can afford
            <br className="hidden md:block" /> with instant payment estimates.
          </h1>
          <p className="text-body1 [text-wrap:balance] md:whitespace-nowrap md:text-hero-sub md:[text-wrap:initial]">
            Pacificwide combines Real estate and mortgage
            <br className="hidden md:block" /> in one team to help you close faster.
          </p>
        </div>
        <HeroSearch />
      </div>
    </section>
  );
}
