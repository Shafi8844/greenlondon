import {
  CalendarCheck,
  HandHeart,
  Leaf,
  Lock,
  MapPinned,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  text: string;
};

const FEATURES: Feature[] = [
  {
    icon: Leaf,
    title: "Discover local action",
    text: "Browse every event the community has created — cleanups, plantations and donation drives — and see what's happening soonest.",
  },
  {
    icon: HandHeart,
    title: "Join in one click",
    text: "Log in, hit Join Event and your name goes on the volunteer list. Progress bars show how full each event is getting.",
  },
  {
    icon: Users,
    title: "Start your own initiative",
    text: "Any member can create an event: pick a type, add a meeting spot and a future date, and publish it for the whole city.",
  },
  {
    icon: CalendarCheck,
    title: "Always future-proof",
    text: "Events only run on upcoming dates — past-dated entries are rejected at creation and never appear on the boards.",
  },
  {
    icon: MapPinned,
    title: "Neighbourhood focus",
    text: "Every card carries its location and date badge so you always know where and when to turn up with your wellies.",
  },
  {
    icon: Lock,
    title: "Yours to manage",
    text: "Created an event? Update its details or remove it entirely — only the person who posted it can change it.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 sm:py-20">
      <p className="text-center text-sm font-semibold tracking-[0.2em] text-[#3E7A52] uppercase">
        Why GreenLondon
      </p>
      <h2 className="mt-3 text-center text-3xl font-semibold tracking-tight text-[#14231B] sm:text-5xl md:text-6xl">
        Small hands, <span className="text-[#1B9A5E]">big difference.</span>
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-[#5C6B61] sm:text-lg">
        Everything the city needs to run on volunteer power — from rallying
        neighbours to keeping the calendar honest.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <article
            key={feature.title}
            className="h-full rounded-[22px] border border-[#E9F0EA] bg-white p-7 shadow-[0_1px_3px_rgba(20,35,27,0.05)] transition-shadow hover:shadow-[0_6px_18px_rgba(20,35,27,0.08)]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E0F4E6]">
              <feature.icon className="h-5 w-5 text-[#2F8A57]" strokeWidth={2} />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-[#14231B]">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6B7A70]">
              {feature.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
