import type { NavItem } from "./home";

/* ------------------------------------------------------------------ */
/* Services page – mock content mirrored from the design               */
/* ------------------------------------------------------------------ */
export const SERVICES_HEADER = {
  nav: [
    { label: "Buy", href: "#", hasMenu: true },
    { label: "Sell", href: "#", hasMenu: true },
    { label: "Mortgage", href: "#", hasMenu: true },
    { label: "Learning Center", href: "/blog" },
    { label: "About us", href: "/services"},
  ] satisfies NavItem[],
  phone: "+1 (408) 532-1278",
};

export const SERVICES_INTRO = {
  title: "Pacificwide Services",
  description:
    'At Pacificwide, we treat each customer as an individual, not a number. We use our "common sense" and expertise to help you obtain the best real estate, mortgage & property management solutions.',
  image: "/images/services/hero.jpg",
  imageAlt: "Pacificwide agent shaking hands with a couple in their new kitchen",
};

export type ServiceBlock = { id: string; title: string; points: string[] };

export const SERVICE_BLOCKS: ServiceBlock[] = [
  {
    id: "real-estate",
    title: "Real Estate",
    points: [
      "Pacificwide specializes in listing and selling residential single family homes, condominiums and multi-unit buildings and commercial buildings, retail center malls, office buildings, churches…",
      "We have a high-quality network that extends beyond the Bay Area to an international audience of potential home buyers and sellers. This network combined with our market tenure and brand identity give our clients a distinct advantage when buying or selling a home.",
      "We also have a strong network with trustworthy construction builders in the Bay Area like KBHomes, Standard Pacific Homes, Taylor Morrison. Whenever they have any Newly Built Homes projects, we're always in the premier list.",
    ],
  },
  {
    id: "mortgage",
    title: "Mortgage",
    points: [
      "Pacificwide is committed to helping you find the right mortgage product for your needs. We understand that every borrower is different, and we offer a variety of products to meet your individual requirements. We make the process of securing a mortgage simple and straightforward by offering you the latest in financial tools that enable you to make sound financial choices.",
      "We work with many lenders and investors. This allows us to get you the best rates on all types of loan programs including: 30yr mortgage, 20yr mortgage, 15yr mortgage, 10yr mortgage, 1yr ARMS, 3yr ARMS, 5yr ARMS, Conventional, Jumbo, Home Equity Lines, VA and Commercial. Whether your situation calls for Full Documents, No Documents, Non-Owner Occupied (Investor) or Multi-Family, we'll fit your needs!",
      "Check out our mortgage website at www.pacificwideloans.com. You can apply for loan online and check loan status! Quick, convenient and completely secure!",
    ],
  },
  {
    id: "property-management",
    title: "Property Management",
    points: [
      "Pacificwide Property Management is another affiliate of Pacificwide Business Group, a well-known and established real estate and mortgage company situated in San Jose, California, USA",
      "Property management is one of the most critical aspects of owning investment real estate. The expertise Pacificwide Property Management brings to the process will greatly increase your chances for succeeding in this venture.",
      "We have extensive years of combined real estate investment & management experience in helping investors and corporate clients with their property management needs.",
    ],
  },
];

export type Partner = { name: string; logo: string; width: number; height: number };

/**
 * TODO(figma): replace these PNG crops with the exported SVG logos.
 * Sizes are the crop dimensions (2x); rendered at a fixed 48px height.
 */
export const PARTNERS: Partner[] = [
  { name: "Rocket Mortgage", logo: "/images/services/partners/rocket-mortgage.png", width: 300, height: 120 },
  { name: "Chase", logo: "/images/services/partners/chase.png", width: 460, height: 120 },
  { name: "Wells Fargo", logo: "/images/services/partners/wells-fargo.png", width: 200, height: 120 },
  { name: "United Wholesale Mortgage", logo: "/images/services/partners/uwm.png", width: 220, height: 120 },
];

export const CONTACT_CTA = {
  title: ["Ready to find", "your home?"],
  description: "Talk to our team. We'll help you take the next step with confidence.",
  cta: "Get in touch",
};
