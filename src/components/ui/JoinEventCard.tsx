"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, LogIn } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import type { VolunteerEvent } from "@/lib/eventData";
import { eventLabel, formatDateParts } from "@/lib/eventData";

const BASE_API = "http://localhost:5050";

interface JoinEventCardProps {
  event: VolunteerEvent;
}

const JoinEventCard = ({ event }: JoinEventCardProps) => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false); // this user already joined
  const [joinedCount, setJoinedCount] = useState(event.registeredCount ?? 0);
  const [message, setMessage] = useState("");

  // Load this user's joined events to know whether they already joined —
  // meaningful welcome-back behaviour after refreshes are fine.
  useEffect(() => {
    if (!user) return;

    let cancelled = false;

    fetch(`${BASE_API}/reservation?email=${encodeURIComponent(user.email)}`)
      .then((res) => res.json())
      .then((joins: { eventId: string }[]) => {
        if (!cancelled && joins.some((join) => join.eventId === event._id)) {
          setJoined(true);
        }
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [user, event._id]);

  const joinEventHandle = async () => {
    // Public detail page, private action: need an account to join
    if (!user) {
      router.push("/sign-In");
      return;
    }

    setJoining(true);
    setMessage("");

    try {
      const res = await fetch(`${BASE_API}/reservation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // user data …
          userEmail: user.email,
          userName: user.name,
          userImage: user.image ?? "",
          // … and the event data, stored together
          eventId: event._id,
          title: event.title,
          thumbnail: event.thumbnail,
          eventType: event.eventType,
          location: event.location,
          eventDate: event.eventDate,
        }),
      });

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 409) {
          setJoined(true);
          setMessage("You already joined this event.");
        } else {
          setMessage(body.error ?? "Could not join — please try again.");
        }
        return;
      }

      setJoined(true);
      setJoinedCount((count) =>
        event.capacity ? Math.min(event.capacity, count + 1) : count + 1,
      );
      setMessage("You're in! See you at the event 🌱");
    } catch {
      setMessage("Could not reach the server — is it running on port 5050?");
    } finally {
      setJoining(false);
    }
  };

  const { full: dateLabel } = formatDateParts(event.eventDate);
  const filled = event.capacity
    ? Math.min(100, Math.round((joinedCount / event.capacity) * 100))
    : 0;

  let button;
  if (joined) {
    button = (
      <div className="mt-7 space-y-3">
        <p className="flex items-center justify-center gap-2 rounded-full bg-[#E0F4E6] px-5 py-3.5 text-base font-semibold text-[#14532D]">
          <CheckCircle2 className="h-5 w-5" strokeWidth={2} />
          You&apos;re going!
        </p>
        <Link
          href="/joined-events"
          className="block text-center text-sm font-semibold text-[#2F8A57] hover:underline"
        >
          See all your joined events →
        </Link>
      </div>
    );
  } else if (isPending) {
    button = (
      <button
        type="button"
        disabled
        className="mt-7 w-full cursor-not-allowed rounded-full bg-[#3DB874]/50 py-4 text-lg font-semibold text-white"
      >
        Checking session…
      </button>
    );
  } else {
    button = (
      <button
        type="button"
        onClick={joinEventHandle}
        disabled={joining}
        className="mt-7 w-full rounded-full bg-[#3DB874] px-5 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#32A866] disabled:opacity-60"
      >
        {joining ? "Joining…" : "Join Event"}
      </button>
    );
  }

  return (
    <div className="rounded-3xl border border-[#E7F0E9] p-8 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-[#DFF0E3] px-3 py-1.5 text-xs font-medium text-[#3E7A52]">
          {eventLabel(event.eventType)}
        </span>
        <span className="text-sm font-semibold text-[#14231B]">Free</span>
      </div>

      <div className="mt-6 border-t border-[#E7F0E9]">
        <div className="border-b border-[#E7F0E9] py-4">
          <p className="text-lg">
            <span className="font-bold text-[#1D3B2A]">Date</span>{" "}
            <span className="text-gray-700">{dateLabel}</span>
          </p>
        </div>
        <div className="border-b border-[#E7F0E9] py-4">
          <p className="text-lg">
            <span className="font-bold text-[#1D3B2A]">Location</span>{" "}
            <span className="text-gray-700">{event.location}</span>
          </p>
        </div>
        <div className="py-4">
          <p className="text-lg">
            <span className="font-bold text-[#1D3B2A]">Hosted by</span>{" "}
            <span className="text-gray-700">
              {event.creatorName || event.creatorEmail}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#E0F4E6]">
          <div
            className="h-full rounded-full bg-[#3DB874] transition-[width]"
            style={{ width: `${filled}%` }}
          />
        </div>
        <p className="mt-3 text-gray-600">
          {joinedCount} of {event.capacity ?? "—"} places taken
        </p>
      </div>

      {/* Not logged in yet → the button takes you to sign-in first */}
      {!user && !isPending && (
        <p className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-[#F2FAF4] px-4 py-3 text-center text-sm text-[#4B5B50]">
          <LogIn className="h-4 w-4 shrink-0" strokeWidth={2} />
          Joining requires an account — you&apos;ll be asked to log in.
        </p>
      )}

      {message && !joined && (
        <p className="mt-4 rounded-2xl bg-[#FFF7ED] px-4 py-3 text-center text-sm font-medium text-[#9A3412]">
          {message}
        </p>
      )}

      {button}
    </div>
  );
};

export default JoinEventCard;
