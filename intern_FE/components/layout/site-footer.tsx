import Image from "next/image";
import Link from "next/link";
import { SOCIAL_ICONS } from "@/components/icons/social";
import { Container } from "@/components/ui/container";
import {
  FOOTER_BRAND_BLOCKS,
  FOOTER_COLUMNS,
  FOOTER_CONTACT,
  FOOTER_LEGAL,
  FOOTER_SOCIAL,
} from "@/lib/data/home";

/**
 * Figma `re/footer/1440px`. Layout inferred from the screenshot
 * (quota-limited): dark 4-column footer, dashed rule, centered legal text.
 */
export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <Container className="flex flex-col gap-10 py-14 md:py-20 lg:gap-[60px] lg:py-[120px]">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-6 sm:col-span-2 lg:col-span-1">
            <Link href="/" aria-label="Pacificwide home" className="inline-flex">
              <Image
                src="/icons/logo-pacificwide-light.svg"
                alt="Pacificwide"
                width={151}
                height={24}
                className="h-6 w-auto"
              />
            </Link>
            <div className="flex flex-col gap-5">
              {FOOTER_BRAND_BLOCKS.map((b) => (
                <div key={b.heading} className="flex flex-col gap-1">
                  <h3 className="text-h5 text-white">{b.heading}</h3>
                  <p className="max-w-[320px] text-body3 text-ink-tertiary">{b.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((groups, i) => (
            <div key={i} className="flex flex-col gap-8">
              {groups.map((g) => (
                <nav key={g.heading} aria-label={g.heading} className="flex flex-col gap-3">
                  <h3 className="font-sans text-body2 font-bold text-white">{g.heading}</h3>
                  <ul className="flex flex-col gap-3">
                    {g.links.map((l) => (
                      <li key={l.label}>
                        <Link href={l.href} className="text-body3 text-stroke-bold hover:text-white">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          ))}

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h3 className="font-sans text-body2 font-bold text-white">{FOOTER_CONTACT.heading}</h3>
            <address className="flex flex-col gap-3 text-body3 not-italic text-stroke-bold">
              <p>
                {FOOTER_CONTACT.addressLines.map((line, i) => (
                  <span key={line}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </p>
              <a href={`tel:${FOOTER_CONTACT.phone.replace(/\D/g, "")}`} className="hover:text-white">
                {FOOTER_CONTACT.phone}
              </a>
              <a href={`mailto:${FOOTER_CONTACT.email}`} className="hover:text-white">
                {FOOTER_CONTACT.email}
              </a>
            </address>
            <div className="mt-3 flex flex-col gap-3">
              <p className="font-sans text-body2 font-bold text-white">Follow us</p>
              <ul className="flex items-center gap-3">
                {FOOTER_SOCIAL.map((s) => {
                  const Icon = SOCIAL_ICONS[s.id];
                  return (
                    <li key={s.id}>
                      <a
                        href={s.href}
                        aria-label={s.label}
                        className="flex size-6 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                      >
                        <Icon width={14} height={14} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-dashed border-white/20 pt-6 text-center">
          {FOOTER_LEGAL.map((line) => (
            <p key={line} className="text-caption text-ink-tertiary sm:text-body3">
              {line}
            </p>
          ))}
        </div>
      </Container>
    </footer>
  );
}
