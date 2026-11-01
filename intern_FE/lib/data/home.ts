export type NavItem = {
  label: string;
  href: string;
  hasMenu?: boolean;
};

export const PHONE = "(408) 532-1278";

export const NAV_ITEMS: NavItem[] = [
  { label: "Buy", href: "#", hasMenu: true },
  { label: "Sell", href: "#", hasMenu: true },
  { label: "Rent", href: "#", hasMenu: true },
  { label: "Invest", href: "#", hasMenu: true },
  { label: "Mortgage", href: "#", hasMenu: true },
  { label: "Learning Center", href: "#" },
  { label: "Real Estate Agent", href: "#" },
  { label: "About us", href: "#", hasMenu: true },
];

export const ACCOUNT_LINKS = [
  { label: "Sign in", href: "#" },
  { label: "Sign up", href: "#" },
];

export const AGENT_LINK = { label: "Agent Sign in", href: "#" };

export type Service = {
  title: string;
  description: string;
  cta: string;
  href: string;
};

export const SERVICES: Service[] = [
  {
    title: "Buy a Home",
    description:
      "Explore homes within your budget, supported by smart search tools and expert guidance at every step.",
    cta: "Browse Homes",
    href: "#",
  },
  {
    title: "Sell Your Home",
    description:
      "Our expert agents and intelligent tools help you price right, attract buyers, and close faster.",
    cta: "Check My Home Value",
    href: "#",
  },
  {
    title: "Get Pre-Approval",
    description:
      "Get pre-approved in minutes and be ready to make a strong offer with confidence.",
    cta: "Start Pre-Approval",
    href: "#",
  },
];

/* ------------------------------------------------------------------ */
/* Listings (Picked For You / Homes You Can Afford)                    */
/* ------------------------------------------------------------------ */
export type Listing = {
  id: string;
  price: string;
  address: string;
  beds: number;
  baths: number;
  sqft: string;
  image: string;
  /** number of photos – drives the dot indicator */
  photoCount: number;
  /** e.g. "Open Thu, 1:30-3:30PM" – rendered as a tag over the image */
  tag?: string;
  /** small listing-company badge over the image */
  companyLogo?: string;
  /** "Presented by …" line below the stats */
  presentedBy?: string;
  href: string;
};

const BASE_LISTING = {
  price: "$749,999",
  address: "1491 Moffo Ct, San Jose, CA 95121",
  beds: 4,
  baths: 4,
  sqft: "1,176",
  image: "/images/home/listing-1.jpg",
  photoCount: 6,
  href: "#",
};

export const PICKED_LISTINGS: Listing[] = [1, 2, 3, 4].map((n) => ({
  ...BASE_LISTING,
  id: `picked-${n}`,
  presentedBy: "Presented by Thien Nguyen & Nghia Pham of Pacificwide",
}));

export const AFFORDABLE_LISTINGS: Listing[] = [1, 2, 3, 4].map((n) => ({
  ...BASE_LISTING,
  id: `afford-${n}`,
  tag: "Open Thu, 1:30-3:30PM",
  companyLogo: "/images/home/mls-logo.png",
}));

/* ------------------------------------------------------------------ */
/* Find homes by monthly payment                                       */
/* ------------------------------------------------------------------ */
export type BudgetTile = {
  label: string;
  image: string;
  href: string;
};

export const BUDGET_TILES: BudgetTile[] = [
  { label: "Homes under $2,000/mo", image: "/images/home/find-home-1.png", href: "#" },
  { label: "Homes $2,000 – $4,000/mo", image: "/images/home/find-home-2.png", href: "#" },
  { label: "Homes $4,000 – $6,000/mo", image: "/images/home/find-home-3.png", href: "#" },
  { label: "Homes $6,000 – $10,000+/mo", image: "/images/home/find-home-4.png", href: "#" },
];

/* ------------------------------------------------------------------ */
/* Affordability                                                       */
/* ------------------------------------------------------------------ */
export const AFFORDABILITY_POINTS = [
  "Instantly know your true buying power based on your budget.",
  "Avoid wasting time on homes outside your price range.",
  "Make confident decisions with accurate, personalized results.",
];

export const AFFORDABILITY_CHIPS = [
  "$641,800 Home estimate",
  "$4,875/mo",
  "45% DTI",
  "7,79% Down",
  "$150,000 Income",
];

/* ------------------------------------------------------------------ */
/* Feature splits (Home estimate / Pre-approval)                       */
/* ------------------------------------------------------------------ */
export type FeatureSplitContent = {
  title: string;
  description: string[];
  points: string[];
  cta: string;
  href: string;
  image: string;
  imageAlt: string;
};

export const HOME_ESTIMATE: FeatureSplitContent = {
  title: "What's your home worth?",
  description: ["Find out your home's value in minutes before you decide to sell."],
  points: [
    "Set the right price from the start to attract serious buyers.",
    "Understand your potential profit before listing your home.",
    "Make confident decisions with real-time market insights.",
  ],
  cta: "Check My Home Value",
  href: "#",
  // TODO(figma): replace with the exported Home Estimate image once quota resets
  image: "/images/home/listing-1.jpg",
  imageAlt: "Bright modern living room",
};

export const PRE_APPROVAL: FeatureSplitContent = {
  title: "Auto Pre-Approval in Minutes",
  description: [
    "Get your pre-approval letter instantly",
    "and be ready to act when the right home appears.",
  ],
  points: [
    "Make stronger offers with verified buying power.",
    "Shop confidently knowing your exact price range.",
    "Speed up your purchase with ready-to-go financing.",
  ],
  cta: "Get Pre-Approved Now",
  href: "#",
  // TODO(figma): replace with the exported Pre-Approval image once quota resets
  image: "/images/home/find-home-3.png",
  imageAlt: "Minimal white kitchen",
};

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */
export type ReviewSource = "google" | "yelp" | "facebook";

export type Review = {
  id: string;
  source: ReviewSource;
  author: string;
  initial: string;
  /** Tailwind bg class for the initial avatar */
  avatarClass: string;
  rating: number;
  text: string;
  truncated?: boolean;
};

export const REVIEW_SOURCES: { id: ReviewSource; label: string }[] = [
  { id: "google", label: "Google" },
  { id: "yelp", label: "Yelp" },
  { id: "facebook", label: "Facebook" },
];

export const REVIEW_SUMMARY = { score: "4.9/5", rating: 5, count: "116 reviews" };

export const REVIEWS: Review[] = [
  {
    id: "r1",
    source: "google",
    author: "Nguyen Pham",
    initial: "N",
    avatarClass: "bg-violet-700",
    rating: 5,
    truncated: true,
    text: "Anna and Jose provided an outstanding real estate experience. As a buyer, Anna's expertise and attention to our preferences made the process seamless. Anna, the loan officer, was efficient and guided us through the financial aspects effortlessly. Together, they formed an exceptional team, exceeding our expectations.",
  },
  {
    id: "r2",
    source: "google",
    author: "Misty Murray",
    initial: "M",
    avatarClass: "bg-rose-800",
    rating: 5,
    text: "Jose was extremely helpful. He knew the answer to all my questions and I never once felt pressured to do anything or to make quick decisions. He is extremely friendly and easy to work with! 10/10 would work with again! Such a great experience!",
  },
  {
    id: "r3",
    source: "google",
    author: "Cherise Le",
    initial: "C",
    avatarClass: "bg-violet-700",
    rating: 5,
    truncated: true,
    text: "I reached out to Pacificwide to inquire on a home. I was contacted by Jose and he was extremely gracious throughout the process. I asked him a ton of questions, some difficult as well but he had answers to every question that I asked. Jose was extremely attentive to my needs and searched every option available in hopes of finding the right fit.",
  },
  {
    id: "r4",
    source: "google",
    author: "David Gatelan",
    initial: "D",
    avatarClass: "bg-orange-600",
    rating: 5,
    text: "HR Manager Jonathan Pham and everyone at Pacificwide Real Estate & Mortgage are great. Excellent customer service and very friendly staff. If you are looking to purchase or sell a home in the Bay Area contact Jonathan and he will definitely meet your needs.",
  },
  {
    id: "r5",
    source: "google",
    author: "Minh Hoai",
    initial: "M",
    avatarClass: "bg-emerald-700",
    rating: 5,
    truncated: true,
    text: "My wife and I had the incredible opportunity to work with Anna during our first-time home buying journey, and it was an absolute blessing. Anna exhibited extraordinary patience and kindness as she guided us through every step of the process, which was incredibly comforting as we were complete novices in the field.",
  },
  {
    id: "r6",
    source: "google",
    author: "Zachary Fridrich",
    initial: "Z",
    avatarClass: "bg-amber-800",
    rating: 5,
    text: "Jonathan Pham is a great guy to work with! He's very helpful and has great customer service. If you're looking for a real estate company with a great manager look no further than Pacificwide!",
  },
];

/* ------------------------------------------------------------------ */
/* Agents                                                              */
/* ------------------------------------------------------------------ */
export type Agent = {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  salesVolume: string;
  totalDeals: string;
  /** Photo path – undefined renders the grey silhouette placeholder */
  photo?: string;
  href: string;
};

export const AGENTS: Agent[] = [1, 2, 3, 4, 5, 6].map((n) => ({
  id: `agent-${n}`,
  name: "Harper Brown",
  role: "Realtor & Real Estate Agent",
  email: "harperbrown@pacificwide.com",
  phone: "+1 (222) 123 1234",
  salesVolume: "$95.1M",
  totalDeals: "114",
  // TODO(figma): export the six agent portraits once quota resets
  photo: undefined,
  href: "#",
}));

/* ------------------------------------------------------------------ */
/* Browse by location                                                  */
/* ------------------------------------------------------------------ */
export type LocationGroup = {
  id: string;
  label: string;
  links: { label: string; href: string }[];
};

const CITY = { label: "Manhattan Real Estate", href: "#" };

export const LOCATION_GROUPS: LocationGroup[] = [
  { id: "cities", label: "Popular Cities", links: Array.from({ length: 24 }, () => CITY) },
  {
    id: "states",
    label: "States & Markets",
    links: [
      "California Real Estate",
      "Texas Real Estate",
      "Florida Real Estate",
      "New York Real Estate",
      "Washington Real Estate",
      "Arizona Real Estate",
      "Nevada Real Estate",
      "Oregon Real Estate",
      "Colorado Real Estate",
    ].map((label) => ({ label, href: "#" })),
  },
];

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */
export type FooterLinkGroup = { heading: string; links: { label: string; href: string }[] };

export const FOOTER_BRAND_BLOCKS = [
  {
    heading: "Pacificwide Real Estate",
    text: "We connect you with the most up-to-date real estate tools for your home search and sale, from start to finish.",
  },
  {
    heading: "Pacificwide Mortgage",
    text: "We provide 24/7 customer support and secure platform for 100% online mortgage application.",
  },
  {
    heading: "Pacificwide Property Management",
    text: "Get free repair estimates and rest easy with our property management team.",
  },
];

export const FOOTER_COLUMNS: FooterLinkGroup[][] = [
  [
    {
      heading: "Buy",
      links: [
        "Browse All Homes",
        "Our Exclusive Listings",
        "Pre-Approval",
        "Home Affordability Calculator",
        "Buyer's Guide",
        "Why buy with Pacificwide",
      ].map((label) => ({ label, href: "#" })),
    },
    {
      heading: "Sell",
      links: ["Seller's Guide", "Why sell with Pacificwide", "Home Sale Proceeds Calculator"].map(
        (label) => ({ label, href: "#" }),
      ),
    },
  ],
  [
    {
      heading: "Invest",
      links: ["Rental property ROI calculator", "1031 Exchange"].map((label) => ({ label, href: "#" })),
    },
    { heading: "Learning Center", links: [{ label: "Learning Center", href: "#" }] },
    { heading: "Real Estate Agent", links: [{ label: "Real Estate Agent", href: "#" }] },
    {
      heading: "About us",
      links: [
        "Our story",
        "Pacificwide's Services",
        "Home Selling Strategy",
        "Terms Of Use",
        "Privacy Policy",
      ].map((label) => ({ label, href: "#" })),
    },
  ],
];

export const FOOTER_CONTACT = {
  heading: "Contact us",
  addressLines: ["2603 Silver Creek Rd STE 210-214,", "San Jose, CA 95121"],
  phone: "+1 (408) 532-1278",
  email: "info@pacificwide.com",
};

export type SocialId = "facebook" | "youtube" | "instagram" | "x" | "linkedin" | "tiktok";

export const FOOTER_SOCIAL: { id: SocialId; label: string; href: string }[] = [
  { id: "facebook", label: "Facebook", href: "#" },
  { id: "youtube", label: "YouTube", href: "#" },
  { id: "instagram", label: "Instagram", href: "#" },
  { id: "x", label: "X", href: "#" },
  { id: "linkedin", label: "LinkedIn", href: "#" },
  { id: "tiktok", label: "TikTok", href: "#" },
];

export const FOOTER_LEGAL = [
  "Pacificwide is a Bay Area Real Estate & Mortgage company that serves all your homeownership needs. NMLS Unique Identifier #212885.",
  "©2026 Pacificwide Real Estate & Mortgage. All Rights Reserved.",
];
