import type { HomeSection } from "@/types/api";

/** The editable part of a homepage block, as stored by the CMS. */
export type SectionCopy = Pick<HomeSection, "title" | "content" | "imageUrl">;

export function toCopy(section: HomeSection): SectionCopy {
  return { title: section.title, content: section.content, imageUrl: section.imageUrl };
}
