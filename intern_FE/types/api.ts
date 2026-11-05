/** Shapes returned by the NestJS API (intern_be). Dates arrive as ISO strings. */

export type Role = "admin" | "user";

export type HomeSection = {
  id: string;
  key: string;
  title: string;
  content: string | null;
  imageUrl: string | null;
  order: number;
  updatedAt: string;
};

export type HomeSectionUpdate = Partial<Pick<HomeSection, "title" | "content" | "imageUrl" | "order">>;

export type PostListItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  thumbnailUrl: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PostDetail = PostListItem & { content: string };

export type PostInput = {
  title: string;
  slug?: string;
  excerpt?: string | null;
  content: string;
  thumbnailUrl?: string | null;
  published?: boolean;
};

export type PostStatusFilter = "all" | "published" | "draft";

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export type ContactInput = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export type ContactStatusFilter = "all" | "unread" | "read";

export type Paginated<T> = {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type DashboardStats = {
  posts: { total: number; published: number; draft: number };
  contacts: { total: number; unread: number; read: number };
  homeSections: number;
};

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
  created_at: string;
};

export type LoginResponse = {
  access_token: string;
  token_type: "Bearer";
  expires_in: number;
  user: Omit<AuthUser, "created_at">;
};

export type UploadResponse = {
  message: string;
  data: { url: string; filename: string; size: number; mimeType: string };
};

/** NestJS default error body. `message` is a string or a list of validation messages. */
export type ApiErrorBody = {
  statusCode: number;
  message: string | string[];
  error?: string;
};
