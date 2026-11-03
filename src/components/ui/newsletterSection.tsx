"use client";

import { useState } from "react";
import { MailCheck } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Display only — no backend call, the subscription isn't stored anywhere
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <section className="pb-20">
      <div className="relative overflow-hidden rounded-[28px] bg-[#14532D] px-6 py-12 sm:px-12 sm:py-16">
        {/* Decorative leaves, purely visual */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full bg-[#3DB874]/20 blur-2xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 left-10 h-56 w-56 rounded-full bg-[#8BD5A6]/15 blur-3xl"
        />

        <div className="relative mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-[#B8EDC8]">
            <MailCheck className="h-4 w-4" strokeWidth={2} />
            The GreenLondon newsletter
          </span>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Paddington to Peckham, <span className="text-[#8BD5A6]">stay in the loop.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            One email a month: upcoming events, volunteer stories and what your
            borough achieved. No spam — just green news.
          </p>

          {subscribed ? (
            <p className="mx-auto mt-8 max-w-md rounded-2xl bg-white/10 px-6 py-4 text-base font-medium text-[#8BD5A6]">
              Thanks! You&apos;re on the list — see you in next month&apos;s issue 🌱
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-14 flex-1 rounded-full border border-white/20 bg-white/10 px-6 text-base text-white placeholder:text-white/50 focus:ring-3 focus:ring-[#8BD5A6]/60 focus:outline-none"
              />
              <button
                type="submit"
                className="h-14 shrink-0 rounded-full bg-[#3DB874] px-8 text-base font-semibold text-white transition-colors hover:bg-[#32A866]"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="mt-4 text-xs text-white/50">
            Recreational design project — submissions are not stored.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
