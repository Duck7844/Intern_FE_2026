"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { AuthError, authApi, safeNextPath } from "@/lib/api/auth";
import { AuthField, AuthNotice, EMAIL_RE } from "./auth-fields";

export function LoginForm() {
  const router = useRouter();
  const next = safeNextPath(useSearchParams().get("next"));

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
      await authApi.login({ email: email.trim(), password });
      router.replace(next);
      router.refresh();
    } catch (error) {
      setServerError(error instanceof AuthError ? error.message : "Could not reach the server. Please try again.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={busy} className="flex flex-col gap-4">
      {serverError && <AuthNotice tone="error">{serverError}</AuthNotice>}
      <AuthField
        id="login-email"
        label="Email"
        type="email"
        autoComplete="username"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (errors.email) setErrors((v) => ({ ...v, email: undefined }));
        }}
        error={errors.email}
        disabled={busy}
      />
      <AuthField
        id="login-password"
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (errors.password) setErrors((v) => ({ ...v, password: undefined }));
        }}
        error={errors.password}
        disabled={busy}
      />
      <Button type="submit" size="md" className="mt-2 w-full" disabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
