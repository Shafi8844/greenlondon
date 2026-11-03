import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Recycle } from "lucide-react";

const Banner = () => {
  return (
    <section className="grid grid-cols-1 items-center gap-8 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pt-12">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full bg-[#E0F4E6] px-5 py-2.5 text-sm font-medium text-[#14532D]">
          <Leaf className="h-4 w-4" strokeWidth={2} />
          Community development, one event at a time
        </span>

        <h1 className="mt-5 text-4xl leading-[1.08] font-semibold tracking-tight text-[#14231B] sm:text-5xl md:text-6xl lg:text-7xl">
          Volunteer together, <span className="text-[#1B9A5E]">grow a greener London.</span>
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-[#5C6B61] sm:text-lg">
          GreenLondon is a community-service hub — discover cleanups, tree
          plantations and donation drives happening across the capital, join as
          a volunteer, or start your own and bring your neighbours along.
        </p>

        {/* Buttons — the site-wide pill style every other page reuses */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-2 rounded-full bg-[#3DB874] px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#32A866]"
          >
            Browse upcoming events
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
          <Link
            href="/create-event"
            className="inline-flex items-center gap-2 rounded-full border border-[#CBE2D2] bg-white px-7 py-3.5 text-base font-semibold text-[#14231B] transition-colors hover:bg-[#E0F4E6]"
          >
            <Recycle className="h-4 w-4" strokeWidth={2} />
            Host your own event
          </Link>
        </div>

        <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-[#E9F0EA] pt-6">
          {[
            ["12k+", "Volunteers rallied"],
            ["Past + upcoming", "Community events"],
            ["33", "London boroughs"],
          ].map(([value, label]) => (
            <div key={label}>
              <dt className="text-xl font-bold text-[#14231B] sm:text-2xl">
                {value}
              </dt>
              <dd className="mt-1 text-xs text-[#6B7A70] sm:text-sm">{label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative h-84 overflow-hidden rounded-[28px] shadow-[0_12px_40px_rgba(20,35,27,0.12)] sm:h-96 lg:h-[520px]">
        <Image
          src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80"
          alt="Volunteers tending a community garden in London"
          fill
          priority
          sizes="(min-width: 1024px) 46vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 rounded-[28px] ring-1 ring-[#E9F0EA] ring-inset" />
        <div className="absolute bottom-5 left-5 max-w-[246px] rounded-2xl bg-white/95 p-4 shadow-sm backdrop-blur">
          <p className="text-sm font-semibold text-[#14231B]">
            20+ events added this season
          </p>
          <p className="mt-1 text-xs text-[#6B7A70]">
            Created by volunteers, joined by neighbours.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Banner;
