import type { ContactInput } from "@/types/api";
import { PUBLIC_API_URL } from "./config";
import { apiFetch } from "./http";

/** Browser → API directly (CORS); the API rate-limits by client IP. */
export function submitContact(input: ContactInput): Promise<{ message: string; data: { id: string } }> {
  return apiFetch(PUBLIC_API_URL, "/contacts", { method: "POST", body: input });
}
