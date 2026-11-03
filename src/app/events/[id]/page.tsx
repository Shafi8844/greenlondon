import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import Image from "next/image";
import JoinEventCard from "@/components/ui/JoinEventCard";
import type { VolunteerEvent } from "@/lib/eventData";
import { eventLabel, formatDateParts, imageSrc } from "@/lib/eventData";
import { apiUrl } from "@/lib/api-url";

interface IPageProps {
  params: Promise<{ id: string }>;
}

// The page shell is static; event data is fetched per request below.
export const instant = false;

// Public page: anyone can read the details; joining requires sign-in.
const page = async ({ params }: IPageProps) => {
  const { id } = await params;

  const res = await fetch(apiUrl(`/events/${id}`));

  if (!res.ok) {
    notFound();
  }

  const event: VolunteerEvent = await res.json();
  const { full: dateLabel, weekday } = formatDateParts(event.eventDate);

  return (
    <div className="container-custom mt-8">
      <div className="flex w-full">
        <Badge
          variant="outline"
          className="flex justify-center gap-2 rounded-full border-0 bg-[#E0F4E6] px-5 py-5 text-sm font-medium text-[#14532D]"
        >
          <span className="h-3 w-3 shrink-0 rounded-full bg-[#3DB874]" />
          <span className="leading-none">{eventLabel(event.eventType)}</span>
        </Badge>
      </div>

      <h1 className="mt-4 max-w-4xl text-3xl leading-tight font-semibold tracking-tight text-[#14231B] sm:text-5xl md:text-6xl">
        {event.title}
      </h1>
      <p className="mt-3 text-base text-[#5C6B61] sm:text-lg">
        <span className="font-semibold text-[#3E7A52]">{dateLabel}</span>
        {weekday && ` · ${weekday}`} — organised by{" "}
        {event.creatorName || event.creatorEmail}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <div className="relative aspect-16/10 overflow-hidden rounded-3xl bg-[#DFF2E0]">
            <Image
              src={imageSrc(event.thumbnail, event._id)}
              alt={event.title}
              fill
              priority
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="mt-7">
            <h2 className="text-2xl font-semibold text-[#14231B] sm:text-3xl">
              About this event
            </h2>
            <p className="mt-3 leading-relaxed text-[#4B5B50]">
              {event.description}
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-[#F2FAF4] p-5">
                <p className="text-xs font-semibold tracking-[0.15em] text-[#3E7A52] uppercase">
                  Location
                </p>
                <p className="mt-1.5 font-medium text-[#14231B]">
                  {event.location}
                </p>
              </div>
              <div className="rounded-2xl bg-[#F2FAF4] p-5">
                <p className="text-xs font-semibold tracking-[0.15em] text-[#3E7A52] uppercase">
                  Event date
                </p>
                <p className="mt-1.5 font-medium text-[#14231B]">{dateLabel}</p>
              </div>
            </div>
          </div>
        </div>

        <JoinEventCard event={event} />
      </div>
    </div>
  );
};

export default page;
