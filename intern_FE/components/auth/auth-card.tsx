import Link from "next/link";
import type { ReactNode } from "react";

/** Centred white card used by the Sign in and Sign up pages. */
export function AuthCard({
  title,
  description,
  footer,
  children,
}: {
  title: string;
  description: string;
  footer: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-1 items-center justify-center bg-surface-a px-4 py-16 md:py-24">
      <div className="w-full max-w-[440px] rounded-sm border border-stroke-light bg-white p-6 md:p-8">
        <h1 className="text-h2a-sm text-ink md:text-h2a">{title}</h1>
        <p className="mt-2 text-body2 text-ink-secondary">{description}</p>
        <div className="mt-6">{children}</div>
        <p className="mt-6 text-center text-body3 text-ink-secondary">{footer}</p>
      </div>
    </section>
  );
}

export function AuthLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="font-semibold text-brand hover:underline">
      {children}
    </Link>
  );
}
