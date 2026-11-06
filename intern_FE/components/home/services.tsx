import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SERVICES } from "@/lib/data/home";

/** Figma `re/services/1440px` – three equal cards, 320px tall on desktop. */
export function Services() {
  return (
    <section className="bg-white py-10 md:py-16 lg:py-20">
      <Container>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <li
              key={s.title}
              className="flex min-h-[260px] flex-col justify-between gap-6 rounded-sm border border-stroke-bold bg-surface-a px-6 pb-6 pt-8 sm:last:col-span-2 lg:last:col-span-1 lg:min-h-[320px]"
            >
              <div className="flex flex-col gap-2 text-ink">
                <h2 className="text-h2a-sm md:text-h2a">{s.title}</h2>
                <p className="text-body1">{s.description}</p>
              </div>
              <Button href={s.href} size="sm" className="self-start">
                {s.cta}
              </Button>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
