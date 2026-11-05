"use client";

import type {
  Contact,
  ContactStatusFilter,
  DashboardStats,
  HomeSection,
  HomeSectionUpdate,
  Paginated,
  PostDetail,
  PostInput,
  PostListItem,
  PostStatusFilter,
  UploadResponse,
} from "@/types/api";
import { apiFetch, isApiError, type RequestOptions } from "./http";

/**
 * Browser-side admin client. Every call goes to the Next route handler
 * `/api/admin/<api path>`, which attaches the HttpOnly admin cookie as a
 * Bearer token. The JWT is never readable from JavaScript.
 *
 * `X-Requested-With` is required by the proxy on mutating requests: a
 * cross-site form cannot set it, which closes the CSRF hole left by cookies.
 */
async function adminFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  try {
    return await apiFetch<T>("/api/admin", path, {
      ...options,
      credentials: "same-origin",
      headers: { "X-Requested-With": "fetch", ...(options.headers as Record<string, string> | undefined) },
    });
  } catch (error) {
    if (isApiError(error) && error.status === 401 && typeof window !== "undefined") {
      // Full navigation (not router.push) so the expired cookie state is
      // re-evaluated by proxy.ts and the admin layout from scratch.
      const login = new URL("/admin/login", window.location.origin);
      login.searchParams.set("next", window.location.pathname);
      login.searchParams.set("reason", "expired");
      window.location.href = login.toString();
    }
    throw error;
  }
}

function qs(params: Record<string, string | number | undefined>): string {
  const query = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") query.set(k, String(v));
  }
  const s = query.toString();
  return s ? `?${s}` : "";
}

export const adminApi = {
  stats: () => adminFetch<DashboardStats>("/stats"),

  homeSections: {
    list: () => adminFetch<HomeSection[]>("/home-sections"),
    update: (id: string, input: HomeSectionUpdate) =>
      adminFetch<HomeSection>(`/home-sections/${id}`, { method: "PUT", body: input }),
  },

  posts: {
    list: (params: { page?: number; limit?: number; q?: string; status?: PostStatusFilter }) =>
      adminFetch<Paginated<PostListItem>>(`/posts/manage${qs(params)}`),
    get: (id: string) => adminFetch<PostDetail>(`/posts/manage/${id}`),
    create: (input: PostInput) => adminFetch<PostDetail>("/posts", { method: "POST", body: input }),
    update: (id: string, input: Partial<PostInput>) =>
      adminFetch<PostDetail>(`/posts/${id}`, { method: "PUT", body: input }),
    remove: (id: string) => adminFetch<{ id: string }>(`/posts/${id}`, { method: "DELETE" }),
  },

  contacts: {
    list: (params: { page?: number; limit?: number; status?: ContactStatusFilter }) =>
      adminFetch<Paginated<Contact>>(`/contacts${qs(params)}`),
    get: (id: string) => adminFetch<Contact>(`/contacts/${id}`),
    setRead: (id: string, isRead: boolean) =>
      adminFetch<Contact>(`/contacts/${id}`, { method: "PATCH", body: { isRead } }),
    remove: (id: string) => adminFetch<{ id: string }>(`/contacts/${id}`, { method: "DELETE" }),
  },

  upload: (file: File) => {
    const form = new FormData();
    form.append("file", file);
    return adminFetch<UploadResponse>("/upload", { method: "POST", body: form });
  },

  logout: () => fetch("/api/admin/logout", { method: "POST", headers: { "X-Requested-With": "fetch" } }),
};
