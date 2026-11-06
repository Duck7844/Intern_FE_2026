"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { submitContact } from "@/lib/api/contacts";
import { isApiError } from "@/lib/api/http";
import { cn } from "@/lib/cn";
import { CONTACT_CTA } from "@/lib/data/services";

type Field = "firstName" | "lastName" | "phone" | "email" | "message";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const EMPTY: Values = { firstName: "", lastName: "", phone: "", email: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s().-]{6,20}$/;

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.firstName.trim()) errors.firstName = "First name is required";
  if (!values.lastName.trim()) errors.lastName = "Last name is required";
  if (!EMAIL_RE.test(values.email.trim())) errors.email = "Enter a valid email address";
  if (values.phone.trim() && !PHONE_RE.test(values.phone.trim())) errors.phone = "Enter a valid phone number";
  if (!values.message.trim()) errors.message = "Please write a message";
  else if (values.message.trim().length > 2000) errors.message = "Message must be 2000 characters or less";
  return errors;
}

/**
 * Full-bleed photo section with a centred white contact card (≈440px,
 * 32px padding). Submits to POST /contacts with field-level validation,
 * a busy state that blocks double submits, and success / failure notices.
 *
 * TODO(figma): export the pool photo to /images/services/cta-bg.jpg and use
 * it as the background; a dark warm gradient stands in for now.
 */
export function ContactCta() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [notice, setNotice] = useState<string | null>(null);

  function update(field: Field, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    setNotice(null);
    try {
      const result = await submitContact({
        name: `${values.firstName.trim()} ${values.lastName.trim()}`.trim(),
        email: values.email.trim(),
        phone: values.phone.trim() || undefined,
        message: values.message.trim(),
      });
      setStatus("sent");
      setNotice(result.message);
      setValues(EMPTY);
    } catch (error) {
      setStatus("failed");
      if (isApiError(error)) {
        setNotice(error.status === 429 ? "Too many messages in a short time. Please try again in a minute." : error.messages.join(" "));
      } else {
        setNotice("We could not send your message. Please check your connection and try again.");
      }
    }
  }

  const sending = status === "sending";

  return (
    <section className="relative isolate overflow-hidden bg-[#2a221d] py-14 md:py-20 lg:py-[120px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_50%_at_50%_0%,#8a6a45_0%,transparent_60%),radial-gradient(60%_50%_at_50%_100%,#2f6b6a_0%,transparent_65%)]"
      />
      <div className="mx-auto w-full max-w-[440px] px-4 sm:px-0">
        <div className="flex flex-col gap-6 rounded-sm bg-white p-6 md:p-8">
          <div className="flex flex-col gap-3 text-center text-ink">
            <h2 className="text-h2a-sm md:text-h2a">
              {CONTACT_CTA.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="text-body2 md:text-body1">{CONTACT_CTA.description}</p>
          </div>

          <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3" aria-busy={sending}>
            <div className="grid grid-cols-2 gap-3">
              <FieldWrap error={errors.firstName}>
                <Input name="firstName" placeholder="First name" autoComplete="given-name" value={values.firstName} onChange={(e) => update("firstName", e.target.value)} aria-invalid={!!errors.firstName} disabled={sending} />
              </FieldWrap>
              <FieldWrap error={errors.lastName}>
                <Input name="lastName" placeholder="Last name" autoComplete="family-name" value={values.lastName} onChange={(e) => update("lastName", e.target.value)} aria-invalid={!!errors.lastName} disabled={sending} />
              </FieldWrap>
            </div>
            <FieldWrap error={errors.phone}>
              <Input name="phone" type="tel" placeholder="Phone number" autoComplete="tel" value={values.phone} onChange={(e) => update("phone", e.target.value)} aria-invalid={!!errors.phone} disabled={sending} />
            </FieldWrap>
            <FieldWrap error={errors.email}>
              <Input name="email" type="email" placeholder="Enter your email" autoComplete="email" value={values.email} onChange={(e) => update("email", e.target.value)} aria-invalid={!!errors.email} disabled={sending} />
            </FieldWrap>
            <FieldWrap error={errors.message}>
              <Textarea name="message" placeholder="Leave me a message ..." value={values.message} onChange={(e) => update("message", e.target.value)} aria-invalid={!!errors.message} disabled={sending} />
            </FieldWrap>

            {notice && (
              <p
                role={status === "failed" ? "alert" : "status"}
                className={cn(
                  "rounded-xs px-3 py-2 text-body3",
                  status === "sent" ? "bg-success/10 text-success" : "bg-brand/10 text-brand",
                )}
              >
                {notice}
              </p>
            )}

            <Button type="submit" size="md" className="mt-3 w-full" disabled={sending}>
              {sending ? "Sending…" : CONTACT_CTA.cta}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

function FieldWrap({ error, children }: { error?: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      {children}
      {error && <p className="text-body3 text-brand">{error}</p>}
    </div>
  );
}
