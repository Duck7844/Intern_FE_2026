"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { AuthError, authApi, safeNextPath } from "@/lib/api/auth";
import { AuthField, AuthNotice, EMAIL_RE } from "./auth-fields";

type Field = "name" | "email" | "password" | "confirm";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const EMPTY: Values = { name: "", email: "", password: "", confirm: "" };

/** Mirrors the API rules: name 1–100, valid email, password 8–72 characters. */
function validate(values: Values): Errors {
  const errors: Errors = {};
  const name = values.name.trim();
  if (!name) errors.name = "Name is required";
  else if (name.length > 100) errors.name = "Name must be 100 characters or less";
  if (!EMAIL_RE.test(values.email.trim())) errors.email = "Enter a valid email address";
  if (values.password.length < 8) errors.password = "Password must be at least 8 characters";
  else if (values.password.length > 72) errors.password = "Password must be 72 characters or less";
  if (values.confirm !== values.password) errors.confirm = "Passwords do not match";
  return errors;
}

export function RegisterForm() {
  const router = useRouter();
  const next = safeNextPath(useSearchParams().get("next"));

  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function update(field: Field, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setBusy(true);
    setServerError(null);
    try {
      await authApi.register({ name: values.name.trim(), email: values.email.trim(), password: values.password });
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
      <AuthField id="register-name" label="Full name" autoComplete="name" value={values.name} onChange={(e) => update("name", e.target.value)} error={errors.name} disabled={busy} />
      <AuthField id="register-email" label="Email" type="email" autoComplete="email" value={values.email} onChange={(e) => update("email", e.target.value)} error={errors.email} disabled={busy} />
      <AuthField
        id="register-password"
        label="Password"
        type="password"
        autoComplete="new-password"
        value={values.password}
        onChange={(e) => update("password", e.target.value)}
        error={errors.password}
        placeholder="At least 8 characters"
        disabled={busy}
      />
      <AuthField id="register-confirm" label="Confirm password" type="password" autoComplete="new-password" value={values.confirm} onChange={(e) => update("confirm", e.target.value)} error={errors.confirm} disabled={busy} />
      <Button type="submit" size="md" className="mt-2 w-full" disabled={busy}>
        {busy ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
