import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = { title: "Admin sign in | Pacificwide" };

export default function AdminLoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-s border border-stroke-light bg-white p-8">
        <Link href="/" className="font-heading text-h4 text-brand">
          PACIFICWIDE
        </Link>
        <h1 className="mt-4 font-sans text-h4 font-bold tracking-normal text-ink">Admin sign in</h1>
        <p className="mb-6 mt-1 text-body3 text-ink-secondary">Only accounts with the admin role can continue.</p>
        <Suspense fallback={<div className="h-56 animate-pulse rounded-xs bg-surface" />}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
