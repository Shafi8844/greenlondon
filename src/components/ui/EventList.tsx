"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import EventCard from "@/components/ui/eventCard";
import type { VolunteerEvent } from "@/lib/eventData";

interface EventListProps {
  /** API JSON endpoint returning an array of events */
  url: string;
  /** Show the "Showing N upcoming events" line above the grid */
  showCount?: boolean;
  emptyMessage?: string;
}

const EventList = ({ url, showCount = false, emptyMessage }: EventListProps) => {
  const [events, setEvents] = useState<VolunteerEvent[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data: VolunteerEvent[]) => {
        if (!cancelled) setEvents(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  if (error) {
    return (
      <p className="mt-8 rounded-2xl bg-[#F2FAF4] p-8 text-center text-[#6B7A70]">
        Couldn&apos;t load events right now — is the backend server on port 5050
        running?
      </p>
    );
  }

  if (events === null) {
    return (
      <div className="mt-8 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-[340px] animate-pulse rounded-[22px] bg-[#EDF5EF]"
          />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="mt-8 rounded-2xl bg-[#F2FAF4] p-10 text-center">
        <p className="text-lg font-semibold text-[#14231B]">
          {emptyMessage ?? "No upcoming events yet."}
        </p>
        <p className="mt-2 text-sm text-[#6B7A70]">
          Be the first — create an event and rally your neighbours.
        </p>
      </div>
    );
  }

  return (
    <>
      {showCount && (
        <p className="pt-2 font-semibold text-xl text-gray-400">
          Showing {events.length} upcoming event{events.length === 1 ? "" : "s"}
        </p>
      )}

      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>

      {!showCount && (
        <div className="mt-10 text-center">
          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-2 rounded-full border border-[#3DB874] px-6 py-3 text-base font-semibold text-[#2F8A57] transition-colors hover:bg-[#E0F4E6]"
          >
            View all upcoming events
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      )}
    </>
  );
};

export default EventList;
