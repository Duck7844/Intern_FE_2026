import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ContactCta } from "@/components/services/contact-cta";

export const metadata: Metadata = {
  title: "Contact us | Pacificwide",
  description: "Talk to the Pacificwide team about buying, selling or financing your home.",
};

/** Contact page: the same "Ready to find your home?" form block used on /services, wired to POST /contacts. */
export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <ContactCta />
      </main>
      <SiteFooter />
    </>
  );
}
