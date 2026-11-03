"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import EventCard from "@/components/ui/eventCard";
import EventForm from "@/components/ui/EventForm";
import { authClient } from "@/lib/auth-client";
import type { VolunteerEvent } from "@/lib/eventData";

const BASE_API = "http://localhost:5050";

const ManageEventsPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [events, setEvents] = useState<VolunteerEvent[] | null>(null);
  const [error, setError] = useState(false);
  const [editing, setEditing] = useState<VolunteerEvent | null>(null); // event open in the update form
  const [notice, setNotice] = useState("");

  // Only this user's events — the backend filters on creatorEmail
  useEffect(() => {
    if (!user?.email) return;

    let cancelled = false;

    fetch(
      `${BASE_API}/events?creatorEmail=${encodeURIComponent(user.email)}`,
    )
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
  }, [user?.email]);

  const deleteHandle = async (event: VolunteerEvent) => {
    if (!user) return;

    // confirm() only exists on window, not during SSR — guard is implicit
    // because every caller is a user click.
    if (!window.confirm(`Delete "${event.title}"? This cannot be undone.`)) {
      return;
    }

    setNotice("");

    const res = await fetch(
      `${BASE_API}/events/${event._id}?email=${encodeURIComponent(user.email)}`,
      { method: "DELETE" },
    );

    if (res.ok) {
      setEvents((list) => list!.filter((item) => item._id !== event._id));
      setNotice(`"${event.title}" was deleted.`);
      if (editing?._id === event._id) setEditing(null);
    } else {
      const body = await res.json().catch(() => ({}));
      setNotice(body.error ?? "Could not delete the event.");
    }
  };

  const savedHandle = (saved: VolunteerEvent) => {
    setEvents((list) =>
      list!.map((event) => (event._id === saved._id ? saved : event)),
    );
    setEditing(null);
    setNotice(`"${saved.title}" was updated.`);
  };

  return (
    <div className="container-custom mt-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Badge
          variant="outline"
          className="flex justify-center gap-2 rounded-full border-0 bg-[#E0F4E6] px-5 py-5 text-sm font-medium text-[#14532D]"
        >
          <span className="h-3 w-3 shrink-0 rounded-full bg-[#3DB874]" />
          <span className="leading-none">Manage Events</span>
        </Badge>
        <Link
          href="/create-event"
          className="inline-flex items-center gap-2 rounded-full bg-[#3DB874] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#32A866]"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Create a new event
        </Link>
      </div>

      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#14231B] sm:text-5xl md:text-6xl">
        Your initiatives, <span className="text-[#1B9A5E]">your rules.</span>
      </h2>
      <p className="mt-3 max-w-2xl text-base text-[#5C6B61] sm:text-lg">
        Update any detail or delete an event — you can only manage the ones you
        created.
      </p>

      {notice && (
        <p className="mt-6 rounded-2xl bg-[#E0F4E6] px-5 py-4 text-sm font-semibold text-[#14532D]">
          {notice}
        </p>
      )}

      {/* The update form replaces the grid while an event is being edited */}
      {editing && (
        <section className="mt-6">
          <h3 className="mb-3 text-2xl font-semibold text-[#14231B]">
            Editing “{editing.title}”
          </h3>
          <EventForm
            initial={editing}
            onSaved={savedHandle}
            onCancel={() => setEditing(null)}
          />
        </section>
      )}

      {error ? (
        <p className="mt-8 rounded-2xl bg-[#F2FAF4] p-8 text-center text-[#6B7A70]">
          Couldn&apos;t load your events — is the backend on port 5050 running?
        </p>
      ) : events === null ? (
        <div className="mt-8 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-[340px] animate-pulse rounded-[22px] bg-[#EDF5EF]"
            />
          ))}
        </div>
      ) : !editing && events.length === 0 ? (
        <div className="mt-8 rounded-[28px] bg-[#F2FAF4] p-10 text-center">
          <p className="text-lg font-semibold text-[#14231B]">
            You haven&apos;t created any events yet.
          </p>
          <Link
            href="/create-event"
            className="mt-5 inline-flex rounded-full bg-[#3DB874] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#32A866]"
          >
            Publish your first event
          </Link>
        </div>
      ) : (
        !editing && (
          <div className="mt-8 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                actions={
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href={`/events/${event._id}`}
                      className="inline-flex items-center justify-center rounded-full border border-[#CBE2D2] px-4 py-2.5 text-sm font-semibold text-[#2F8A57] transition-colors hover:bg-[#E0F4E6]"
                    >
                      View Event
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setEditing(event);
                        setNotice("");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#3DB874] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#32A866]"
                    >
                      <Pencil className="h-3.5 w-3.5" strokeWidth={2} />
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteHandle(event)}
                      className="col-span-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100"
                    >
                      <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
                      Delete
                    </button>
                  </div>
                }
              />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default ManageEventsPage;
