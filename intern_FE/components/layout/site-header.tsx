import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { ACCOUNT_LINKS, AGENT_LINK, NAV_ITEMS, PHONE } from "@/lib/data/home";
import { MobileMenu } from "./mobile-menu";

/**
 * Two-row header from Figma `re/header-menu/1440px` (93px tall on desktop):
 *  - top bar: logo + phone / sign in / sign up / agent sign in
 *  - 1px divider
 *  - 40px nav row, centered
 * Below `lg` the nav collapses into a hamburger drawer.
 */
type SiteHeaderProps = {
  /** href of the nav item for the current page – rendered in brand red. */
  activeHref?: string;
};

export function SiteHeader({ activeHref }: SiteHeaderProps = {}) {
  return (
    <header
      className="sticky top-0 z-50 border-b border-stroke-light bg-surface [--header-h:56px] lg:[--header-h:93px]"
    >
      {/* Top bar */}
      <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:h-auto lg:px-8 lg:py-3">
        <Link href="/" aria-label="Pacificwide home" className="flex items-center">
          <Image
            src="/icons/logo-pacificwide.svg"
            alt="Pacificwide"
            width={151}
            height={24}
            priority
            className="h-6 w-auto"
          />
        </Link>

        {/* Desktop account links */}
        <div className="hidden items-center gap-6 lg:flex">
          <a href={`tel:${PHONE.replace(/\D/g, "")}`} className="py-1 text-btn text-ink hover:underline">
            {PHONE}
          </a>
          <Divider />
          {ACCOUNT_LINKS.map((l) => (
            <Link key={l.label} href={l.href} className="py-1 text-btn text-ink hover:underline">
              {l.label}
            </Link>
          ))}
          <Divider />
          <Link href={AGENT_LINK.href} className="py-1 text-btn text-ink hover:underline">
            {AGENT_LINK.label}
          </Link>
        </div>

        {/* Mobile: phone shortcut + hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={`tel:${PHONE.replace(/\D/g, "")}`}
            className="hidden py-1 text-btn text-ink sm:inline"
          >
            {PHONE}
          </a>
          <MobileMenu
            nav={NAV_ITEMS}
            accountLinks={ACCOUNT_LINKS}
            agentLink={AGENT_LINK}
            phone={PHONE}
          />
        </div>
      </div>

      {/* Desktop nav row */}
      <nav aria-label="Primary" className="hidden border-t border-stroke-light lg:block">
        <ul className="flex h-10 items-center justify-center gap-6 px-8">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                aria-current={item.href === activeHref ? "page" : undefined}
                className={cn(
                  "flex items-center gap-1 text-body2 hover:text-brand",
                  item.href === activeHref ? "text-brand" : "text-ink",
                )}
              >
                {item.label}
                {item.hasMenu && (
                  <Image src="/icons/chevron-down.svg" alt="" width={20} height={20} />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function Divider() {
  return <span aria-hidden className="h-6 w-px bg-stroke-bold" />;
}
