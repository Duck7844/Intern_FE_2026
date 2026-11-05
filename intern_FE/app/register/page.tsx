import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthCard, AuthLink } from "@/components/auth/auth-card";
import { RegisterForm } from "@/components/auth/register-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = { title: "Sign up | Pacificwide" };

/** Website registration (POST /auth/register, then signed in automatically). */
export default function RegisterPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <AuthCard
          title="Create your account"
          description="Save homes, get payment estimates and talk to our team."
          footer={
            <>
              Already have an account? <AuthLink href="/login">Sign in</AuthLink>
            </>
          }
        >
          <Suspense fallback={<div className="h-80 animate-pulse rounded-xs bg-surface" />}>
            <RegisterForm />
          </Suspense>
        </AuthCard>
      </main>
      <SiteFooter />
    </>
  );
}
