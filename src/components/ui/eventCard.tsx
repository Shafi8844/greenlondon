"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import { eventLabel, formatDateParts, imageSrc } from "@/lib/eventData";

export interface EventCardData {
  title: string;
  thumbnail: string;
  eventType: string;
  location: string;
  eventDate: string;
  /** Mongo id — used for the default details link unless `href` overrides it */
  _id?: string;
  /** Link target for the card's View Event button (e.g. join docs use the event id) */
  href?: string;
}

interface EventCardProps {
  event: EventCardData;
  /** Extra actions rendered inside the card footer (e.g. Edit/Delete on Manage Events) */
  actions?: ReactNode;
}

const EventCard = ({ event, actions }: EventCardProps) => {
  const { day, month } = formatDateParts(event.eventDate);
  const detailsHref = event.href ?? (event._id ? `/events/${event._id}` : "#");

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-[#E9F0EA] bg-white shadow-[0_1px_3px_rgba(20,35,27,0.05)] transition-shadow hover:shadow-[0_6px_18px_rgba(20,35,27,0.08)]">
      {/* Thumbnail with floating date badge — uniform across every grid */}
      <div className="relative h-[176px] shrink-0 bg-gradient-to-b from-[#DFF2E0] to-[#BFE3C8]">
        <Image
          src={imageSrc(event.thumbnail, event._id ?? event.eventDate)}
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

        <div className="absolute top-3 right-3 rounded-full bg-[#14231B]/80 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
          {eventLabel(event.eventType)}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-xl leading-snug font-semibold text-[#14231B]">
          {event.title}
        </h3>

        <div className="mt-2 space-y-1 text-sm text-[#6B7A70]">
          <p className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 shrink-0" strokeWidth={2} />
            <span className="line-clamp-1">{event.location}</span>
          </p>
          <p className="font-medium text-[#3E7A52]">
            {formatDateParts(event.eventDate).full}
          </p>
        </div>

        <div className="mt-auto pt-5">
          {actions ?? (
            <Link href={detailsHref} className="block">
              <button
                type="button"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[#3DB874] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#32A866]"
              >
                View Event
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </button>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default EventCard;
