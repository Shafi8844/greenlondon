import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
type Event = {
  _id: string;
  title: string;
  description: string;
  meetingPoint: string;
  imageUrl: string;
  startsAt: string;
  capacity: number;
  registeredCount: number;
  category: string;
  borough: string;
};

const CATEGORY_LABELS: Record<string, string> = {
  "park-conservation": "Park Conservation",
  "river-restoration": "River Restoration",
  "community-gardening": "Community Gardening",
  "urban-rewilding": "Urban Rewilding",
  "tree-planting": "Tree Planting",
  "community-clean-up": "Community Clean-up",
  education: "Education",
};

const titleCase = (slug: string) =>
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

// loremflickr.com is down (returns 500 for everything), so fall back to
// seeded picsum photos — the seed keeps each event's image stable.
const getImageSrc = (imageUrl: string, seed: string) =>
  imageUrl.includes("loremflickr")
    ? `https://picsum.photos/seed/${seed}/800/500`
    : imageUrl;

const getEvents = async () => {
  const res = await fetch("http://localhost:5050/events");

  if (!res.ok) {
    return [];
  }

  return (await res.json()) as Event[];
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// startsAt is a plain "YYYY-MM-DD" date — parse the parts directly so no
// timezone conversion can shift the day.
const formatDate = (startsAt: string) => {
  const [, month, day] = startsAt.split("-").map(Number);
  return {
    day,
    month: MONTHS[month - 1].toUpperCase(),
    full: `${day} ${MONTHS[month - 1]}`,
  };
};

const eventsCard = async () => {
  const events = await getEvents();

  return (
    <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
      {events.map((event) => {
        const { day, month, full: dateLabel } = formatDate(event.startsAt);

        const categoryLabel =
          CATEGORY_LABELS[event.category] ?? titleCase(event.category);
        const boroughLabel = titleCase(event.borough);
        const filled = Math.min(
          100,
          Math.round((event.registeredCount / event.capacity) * 100),
        );

        return (
          <article
            key={event._id}
            className="group flex flex-col overflow-hidden rounded-[22px] border border-[#E9F0EA] bg-white shadow-[0_1px_3px_rgba(20,35,27,0.05)] transition-shadow hover:shadow-[0_6px_18px_rgba(20,35,27,0.08)]"
          >
            {/* Illustration with floating date badge */}
            <div className="relative h-[176px] bg-gradient-to-b from-[#DFF2E0] to-[#BFE3C8]">
              <Image
                src={getImageSrc(event.imageUrl, event._id)}
                alt={event.title}
                fill
                sizes="(min-width: 1280px) 384px, (min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />

              <div className="absolute top-3 left-3 flex flex-col items-center rounded-xl bg-white px-3.5 py-2 shadow-[0_2px_8px_rgba(20,35,27,0.12)]">
                <span className="text-lg leading-none font-bold text-[#14231B]">
                  {day}
                </span>
                <span className="mt-1 text-[10px] leading-none font-semibold tracking-wide text-[#14231B]">
                  {month}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-5">
              <span className="w-fit rounded-full bg-[#DFF0E3] px-3 py-1.5 text-xs font-medium text-[#3E7A52]">
                {categoryLabel}
              </span>

              <h3 className="mt-3 text-xl leading-snug font-semibold text-[#14231B]">
                {event.title}
              </h3>

              <p className="mt-1.5 text-sm text-[#6B7A70]">
                {boroughLabel} · {dateLabel}
              </p>

              {/* Progress */}
              <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-[#DFEDE3]">
                <div
                  className="h-full rounded-full bg-[#55AC6E] transition-[width]"
                  style={{ width: `${filled}%` }}
                />
              </div>

              {/* Places + Join */}
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[13px] text-[#6B7A70]">
                  {event.registeredCount} of {event.capacity} places taken
                </span>

                <Link href={`/discover/${event._id}`}>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2F8A57] transition-colors hover:text-[#1E6B41]"
                >
                  Join
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </button>
                </Link>
                
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default eventsCard;
