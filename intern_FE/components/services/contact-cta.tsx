import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { CONTACT_CTA } from "@/lib/data/services";

/**
 * Full-bleed photo section with a centred white contact card (≈440px,
 * 32px padding): two-line Bebas title, Body 1 copy, name/phone/email/
 * message fields and a full-width primary button.
 *
 * TODO(figma): export the pool photo to /images/services/cta-bg.jpg and use
 * it as the background; a dark warm gradient stands in for now.
 */
export function ContactCta() {
  return (
    <section className="relative isolate overflow-hidden bg-[#2a221d] py-14 md:py-20 lg:py-[120px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_50%_at_50%_0%,#8a6a45_0%,transparent_60%),radial-gradient(60%_50%_at_50%_100%,#2f6b6a_0%,transparent_65%)]"
      />
      <div className="mx-auto w-full max-w-[440px] px-4 sm:px-0">
        <div className="flex flex-col gap-6 rounded-s bg-white p-6 md:p-8">
          <div className="flex flex-col gap-3 text-center text-ink">
            <h2 className="text-h2a-sm md:text-h2a">
              {CONTACT_CTA.title.map((line, i) => (
                <span key={line} className="block">
                  {line}
                  {i === 0 ? " " : ""}
                </span>
              ))}
            </h2>
            <p className="text-body2 md:text-body1">{CONTACT_CTA.description}</p>
          </div>

          <form action="#" className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <Input name="firstName" placeholder="First name" autoComplete="given-name" required />
              <Input name="lastName" placeholder="Last name" autoComplete="family-name" required />
            </div>
            <Input name="phone" type="tel" placeholder="Phone number" autoComplete="tel" />
            <Input name="email" type="email" placeholder="Enter your email" autoComplete="email" required />
            <Textarea name="message" placeholder="Leave me a message ..." />
            <Button type="submit" size="md" className="mt-3 w-full">
              {CONTACT_CTA.cta}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
