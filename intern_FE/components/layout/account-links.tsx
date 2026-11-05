import Link from "next/link";
import { Suspense } from "react";
import { getUserSession } from "@/lib/api/user-session";
import { cn } from "@/lib/cn";
import { SignOutButton } from "./sign-out-button";

export const ACCOUNT_LINKS = [
  { label: "Sign in", href: "/login" },
  { label: "Sign up", href: "/register" },
];

type AccountLinksProps = {
  /** Classes applied to each link / the sign-out button. */
  linkClassName: string;
  className?: string;
};

/**
 * "Sign in / Sign up" in the header, or the visitor's name + "Sign out" once
 * they are signed in. The session comes from the HttpOnly cookie, so the
 * check runs on the server inside Suspense; the signed-out links are the
 * fallback, which keeps the header's static shell identical.
 */
export function AccountLinks(props: AccountLinksProps) {
  return (
    <Suspense fallback={<SignedOutLinks {...props} />}>
      <SessionAware {...props} />
    </Suspense>
  );
}

async function SessionAware(props: AccountLinksProps) {
  const user = await getUserSession();
  if (!user) return <SignedOutLinks {...props} />;
  return (
    <div className={cn("flex items-center gap-6", props.className)}>
      <span className={cn(props.linkClassName, "max-w-[160px] truncate hover:no-underline")} title={user.email}>
        Hi, {user.name}
      </span>
      <SignOutButton className={props.linkClassName} />
    </div>
  );
}

function SignedOutLinks({ linkClassName, className }: AccountLinksProps) {
  return (
    <div className={cn("flex items-center gap-6", className)}>
      {ACCOUNT_LINKS.map((l) => (
        <Link key={l.label} href={l.href} className={linkClassName}>
          {l.label}
        </Link>
      ))}
    </div>
  );
}
