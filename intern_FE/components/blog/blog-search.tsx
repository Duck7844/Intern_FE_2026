import { SearchField } from "@/components/ui/search-field";

/**
 * Figma `tab - action` search field. A plain GET form so it works without
 * JavaScript and keeps the page a Server Component: /blog?q=term
 */
export function BlogSearch({ query }: { query?: string }) {
  return (
    <form action="/blog" method="get" role="search" className="flex w-full justify-end">
      <SearchField
        label="Search articles"
        name="q"
        placeholder="Search"
        defaultValue={query ?? ""}
        className="w-full lg:w-[340px]"
      />
    </form>
  );
}
