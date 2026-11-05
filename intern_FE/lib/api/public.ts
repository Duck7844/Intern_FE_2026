import "server-only";
import type { HomeSection, Paginated, PostDetail, PostListItem } from "@/types/api";
import { serverApiUrl } from "./config";
import { apiFetch, isApiError } from "./http";

/**
 * Read-only API used by the public Server Components. Everything here runs
 * per request (no Next cache) so admin edits show up on the next page load.
 */

export async function getHomeSections(): Promise<HomeSection[]> {
  return apiFetch<HomeSection[]>(serverApiUrl(), "/home-sections");
}

/** Sections keyed by their stable `key` for easy lookup in the page. */
export function indexSections(sections: HomeSection[]): Map<string, HomeSection> {
  return new Map(sections.map((s) => [s.key, s]));
}

export async function getPublishedPosts(params: { page?: number; limit?: number; q?: string } = {}) {
  const query = new URLSearchParams();
  if (params.page && params.page > 1) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.q) query.set("q", params.q);
  const suffix = query.size > 0 ? `?${query.toString()}` : "";
  return apiFetch<Paginated<PostListItem>>(serverApiUrl(), `/posts${suffix}`);
}

/** Null when the slug does not exist or the post is not published. */
export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  try {
    return await apiFetch<PostDetail>(serverApiUrl(), `/posts/${encodeURIComponent(slug)}`);
  } catch (error) {
    if (isApiError(error) && error.status === 404) return null;
    throw error;
  }
}
