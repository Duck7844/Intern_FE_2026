import Image from "next/image";
import Link from "next/link";
import { BLOG_HEADER } from "@/lib/data/blog";
import { MobileMenu } from "./mobile-menu";

/**
 * Figma `re website / heading` used by the Blog frames: a single 64px row
 * (grey surface, 1px rule below) with logo + nav on the left and
 * "Mortgage website", phone, divider, Sign in / Sign up on the right.
 * Below `lg` it collapses to logo + hamburger, reusing the site drawer.
 */
export function BlogHeader() {
  const { nav, mortgageSite, phone, account } = BLOG_HEADER;
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
              {nav.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-body2 text-ink hover:text-brand">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          <Link href={mortgageSite.href} className="text-body2 text-ink hover:text-brand">
            {mortgageSite.label}
          </Link>
          <a href={tel} className="text-body2 text-ink hover:text-brand">
            {phone}
          </a>
          <span aria-hidden className="h-6 w-px bg-stroke-bold" />
          {account.map((l) => (
            <Link key={l.label} href={l.href} className="text-body2 text-ink hover:text-brand">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a href={tel} className="hidden py-1 text-btn text-ink sm:inline">
            {phone}
          </a>
          <MobileMenu nav={nav} accountLinks={account} agentLink={mortgageSite} phone={phone} />
        </div>
      </div>
    </header>
  );
}
