import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthCard, AuthLink } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = { title: "Sign in | Pacificwide" };

/** Website sign-in (POST /auth/login). The form reads ?next, hence Suspense. */
export default function LoginPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <AuthCard
          title="Sign in"
          description="Welcome back. Sign in to continue."
          footer={
            <>
              New to Pacificwide? <AuthLink href="/register">Create an account</AuthLink>
            </>
          }
        >
          <Suspense fallback={<div className="h-52 animate-pulse rounded-xs bg-surface" />}>
            <LoginForm />
          </Suspense>
        </AuthCard>
      </main>
      <SiteFooter />
    </>
  );
}
