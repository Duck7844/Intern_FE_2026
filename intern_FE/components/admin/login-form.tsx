"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Field, Notice, Spinner, fieldClass } from "./ui";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Only allow redirects back into the admin area (no open redirect). */
function safeNext(value: string | null): string {
  return value && value.startsWith("/admin") && !value.startsWith("//") ? value : "/admin";
}

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = safeNext(params.get("next"));
  const expired = params.get("reason") === "expired";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    const nextErrors: typeof errors = {};
    if (!EMAIL_RE.test(email.trim())) nextErrors.email = "Enter a valid email address";
    if (!password) nextErrors.password = "Password is required";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setBusy(true);
    setServerError(null);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Requested-With": "fetch" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { message?: string } | null;
        setServerError(body?.message ?? `Sign-in failed (${response.status})`);
        return;
      }
      router.replace(next);
      router.refresh();
    } catch {
      setServerError("Could not reach the server. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4" aria-busy={busy}>
      {expired && !serverError && <Notice tone="warning">Your session has expired. Please sign in again.</Notice>}
      {serverError && <Notice tone="error">{serverError}</Notice>}

      <Field label="Email" htmlFor="email" error={errors.email} required>
        <input
          id="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors.email}
          disabled={busy}
          className={`${fieldClass} h-11`}
        />
      </Field>
      <Field label="Password" htmlFor="password" error={errors.password} required>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={!!errors.password}
          disabled={busy}
          className={`${fieldClass} h-11`}
        />
      </Field>

      <button
        type="submit"
        disabled={busy}
        className="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-xs bg-brand text-btn text-white hover:bg-brand-dark disabled:opacity-50"
      >
        {busy && <Spinner />}
        Sign in
      </button>
    </form>
  );
}
