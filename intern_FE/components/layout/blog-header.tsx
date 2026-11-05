import { BLOG_HEADER } from "@/lib/data/blog";
import { SimpleHeader } from "./simple-header";

/** Blog variant of the single-row header (Figma `re website / heading`). */
export function BlogHeader({ activeHref }: { activeHref?: string }) {
  const { nav, mortgageSite, phone } = BLOG_HEADER;
  return (
    <SimpleHeader nav={nav} phone={phone} extraLink={mortgageSite} activeHref={activeHref} />
  );
}
