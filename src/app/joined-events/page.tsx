"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import EventCard from "@/components/ui/eventCard";
import { authClient } from "@/lib/auth-client";
import { getAuthToken } from "@/lib/session-token";
import type { JoinedEvent } from "@/lib/eventData";
import { apiUrl } from "@/lib/api-url";

const JoinedEventsPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [joins, setJoins] = useState<JoinedEvent[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    let cancelled = false;

    // Backend filters by the JWT's bearer email (falls back to ?email=)
    // and sorts by event date ascending
    getAuthToken()
      .then((token) =>
        fetch(apiUrl(`/reservation?email=${encodeURIComponent(user.email)}`), {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        }),
      )
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data: JoinedEvent[]) => {
        if (!cancelled) setJoins(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [user?.email]);

  return (
    <div className="container-custom mt-8">
      <div className="flex w-full">
        <Badge
          variant="outline"
          className="flex justify-center gap-2 rounded-full border-0 bg-[#E0F4E6] px-5 py-5 text-sm font-medium text-[#14532D]"
        >
          <span className="h-3 w-3 shrink-0 rounded-full bg-[#3DB874]" />
          <span className="leading-none">Joined Events</span>
        </Badge>
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#14231B] sm:text-5xl md:text-6xl">
        Dates you said <span className="text-[#1B9A5E]">yes</span> to.
      </h2>
      <p className="mt-3 max-w-2xl text-base text-[#5C6B61] sm:text-lg">
        Sorted by event date, soonest first.
      </p>

      {error ? (
        <p className="mt-8 rounded-2xl bg-[#F2FAF4] p-8 text-center text-[#6B7A70]">
          Couldn&apos;t load your events — please check the events server configuration.
        </p>
      ) : joins === null ? (
        <div className="mt-8 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-[340px] animate-pulse rounded-[22px] bg-[#EDF5EF]"
            />
          ))}
        </div>
      ) : joins.length === 0 ? (
        <div className="mt-8 rounded-[28px] bg-[#F2FAF4] p-10 text-center">
          <p className="text-lg font-semibold text-[#14231B]">
            You haven&apos;t joined any events yet.
          </p>
          <Link
            href="/upcoming-events"
            className="mt-5 inline-flex rounded-full bg-[#3DB874] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#32A866]"
          >
            Browse upcoming events
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
          {joins.map((join) => (
            <EventCard
              key={join._id}
              event={{
                title: join.title,
                thumbnail: join.thumbnail,
                eventType: join.eventType,
                location: join.location,
                eventDate: join.eventDate,
                href: `/events/${join.eventId}`,
              }}
              actions={
                <Link
                  href={`/events/${join.eventId}`}
                  className="inline-flex w-full items-center justify-center rounded-full border border-[#CBE2D2] px-5 py-2.5 text-sm font-semibold text-[#2F8A57] transition-colors hover:bg-[#E0F4E6]"
                >
                  View Event
                </Link>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default JoinedEventsPage;
