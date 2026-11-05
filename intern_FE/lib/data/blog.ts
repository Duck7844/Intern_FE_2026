/* ------------------------------------------------------------------ */
/* Blog header (`re website / heading` – single 64px row)              */
/* Article content itself comes from the API (see lib/api/public.ts).  */
/* ------------------------------------------------------------------ */
import type { NavItem } from "./home";

export const BLOG_HEADER = {
  nav: [
    { label: "Buy", href: "#" },
    { label: "Rent", href: "#" },
    { label: "Agents", href: "#" },
    { label: "Calculator", href: "#" },
    { label: "Learning Center", href: "/blog" },
    { label: "About us", href: "/services" },
  ] satisfies NavItem[],
  mortgageSite: { label: "Mortgage website", href: "#" },
  phone: "+1 (408) 532-1278",
};
