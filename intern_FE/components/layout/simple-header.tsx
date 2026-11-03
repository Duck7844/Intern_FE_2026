import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { NavItem } from "@/lib/data/home";
import { MobileMenu } from "./mobile-menu";

type LinkItem = { label: string; href: string };

export type SimpleHeaderProps = {
  nav: NavItem[];
  phone: string;
  accountLinks: LinkItem[];
  /** Optional extra link shown before the phone (e.g. "Mortgage website"). */
  extraLink?: LinkItem;
  /** href of the nav item for the current page – rendered in brand red. */
  activeHref?: string;
};

/**
 * Single 64px header row (Figma `re website / heading`): logo + nav on the
 * left, optional extra link, phone, divider and account links on the right.
 * Below `lg` it collapses to logo + hamburger, reusing the site drawer.
 * Data differs per page (Blog, Services), so it is passed in as props.
 */
export function SimpleHeader({ nav, phone, accountLinks, extraLink, activeHref }: SimpleHeaderProps) {
  const tel = `tel:${phone.replace(/\D/g, "")}`;

  return (
    <header className="sticky top-0 z-50 border-b border-stroke-light bg-surface [--header-h:64px]">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-9">
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
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {nav.map((item) => {
                const active = item.href === activeHref;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-1 text-body2 hover:text-brand",
                        active ? "text-brand" : "text-ink",
                      )}
                    >
                      {item.label}
                      {item.hasMenu && <Image src="/icons/chevron-down.svg" alt="" width={20} height={20} />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          {extraLink && (
            <Link href={extraLink.href} className="text-body2 text-ink hover:text-brand">
              {extraLink.label}
            </Link>
          )}
          <a href={tel} className="text-body2 text-ink hover:text-brand">
            {phone}
          </a>
          <span aria-hidden className="h-6 w-px bg-stroke-bold" />
          {accountLinks.map((l) => (
            <Link key={l.label} href={l.href} className="text-body2 text-ink hover:text-brand">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a href={tel} className="hidden py-1 text-btn text-ink sm:inline">
            {phone}
          </a>
          <MobileMenu nav={nav} accountLinks={accountLinks} agentLink={extraLink} phone={phone} />
        </div>
      </div>
    </header>
  );
}
