import Link from "next/link";
import type { InputHTMLAttributes } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const SMS_CONSENTS = [
  "I agree to receive transactional SMS/RCS messages regarding my loan application status, account alerts, and real estate updates from Pacificwide. Message frequency varies. Msg & data rates may apply. Reply HELP for help, STOP to cancel.",
  "I would like to receive promotional messages, real estate news, my rewards, special offers, and homeownership tips from Pacificwide via SMS/RCS. Optional and not required for loan processing. Message frequency varies. Msg & data rates may apply. Text HELP for help, reply STOP to cancel.",
];

const EMAIL_CONSENT =
  "Yes, send me email messages from Pacificwide about my rewards and special offers. You can unsubscribe at any time using the link in our emails.";

/**
 * Newsletter sign-up from the article design: full-bleed photo background
 * with a centred white card (≈730px, 52px padding) holding the form and the
 * SMS / email consent checkboxes.
 *
 * TODO(figma): export the sofa photo to /images/blog/newsletter-bg.jpg and
 * use it as the section background; a brand-tinted colour stands in for now.
 */
export function Newsletter() {
  return (
    <section className="relative isolate overflow-hidden bg-[#c9532f] py-14 md:py-20 lg:py-[110px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_20%_80%,#efe4d2_0%,transparent_60%),radial-gradient(50%_60%_at_85%_20%,#e0632f_0%,transparent_65%)]"
      />
      <div className="mx-auto w-full max-w-[732px] px-4 sm:px-6 lg:px-0">
        <div className="flex flex-col gap-6 rounded-sm bg-white p-6 md:p-10 lg:p-[52px]">
          <div className="flex flex-col gap-2 text-center text-ink">
            <h2 className="text-h2a-sm md:text-h2a">Get expert tips straight to your inbox</h2>
            <p className="text-body2 md:text-body1">
              Discover ways to increase your home&apos;s value and stay on top of local trends.
            </p>
          </div>

          <form className="flex flex-col gap-3 lg:flex-row" action="#">
            <div className="grid grid-cols-2 gap-3 lg:contents">
              <Field name="firstName" placeholder="First name" autoComplete="given-name" className="lg:w-[110px]" />
              <Field name="lastName" placeholder="Last name" autoComplete="family-name" className="lg:w-[110px]" />
            </div>
            <Field name="email" type="email" placeholder="Enter your email" autoComplete="email" required className="lg:flex-1" />
            <Button type="submit" size="sm" className="w-full lg:w-auto">
              Subscribe
            </Button>
          </form>

          <div className="flex flex-col gap-3">
            <fieldset className="flex flex-col gap-3">
              <legend className="mb-3 text-body3 text-ink">SMS/RCS:</legend>
              {SMS_CONSENTS.map((text, i) => (
                <Checkbox key={i} name={`sms-${i}`} defaultChecked>
                  {text} <Policy />
                </Checkbox>
              ))}
            </fieldset>
            <fieldset className="flex flex-col gap-3">
              <legend className="mb-3 text-body3 text-ink">Email/Phone call:</legend>
              <Checkbox name="email-consent" defaultChecked>
                {EMAIL_CONSENT} <Policy />
              </Checkbox>
            </fieldset>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  className,
  ...input
}: InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  return (
    <label className={className}>
      <span className="sr-only">{input.placeholder}</span>
      <input
        {...input}
        className="h-10 w-full rounded-xs border border-stroke-light bg-white px-3 text-body2 text-ink outline-none placeholder:text-ink-tertiary focus:border-ink"
      />
    </label>
  );
}

function Policy() {
  return (
    <>
      View{" "}
      <Link href="#" className="underline underline-offset-2">
        Terms
      </Link>{" "}
      &amp;{" "}
      <Link href="#" className="underline underline-offset-2">
        Privacy Policy
      </Link>
      .
    </>
  );
}
