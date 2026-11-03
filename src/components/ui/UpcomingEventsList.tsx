"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import EventCard from "@/components/ui/eventCard";
import type { VolunteerEvent } from "@/lib/eventData";
import { EVENT_TYPES, eventLabel } from "@/lib/eventData";
import { apiUrl } from "@/lib/api-url";

const localRangeEnd = () => {
  const now = new Date();
  const weekEnd = new Date(now);
  weekEnd.setDate(now.getDate() + (7 - now.getDay()));
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return {
    week: weekEnd.toISOString().slice(0, 10),
    month: monthEnd.toISOString().slice(0, 10),
  };
};

type DateRange = "all" | "week" | "month" | "later";
type SortOrder = "soonest" | "latest" | "az";

const RANGE_OPTIONS: { value: DateRange; label: string }[] = [
  { value: "all", label: "Any date" },
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
  { value: "later", label: "Later on" },
];

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: "soonest", label: "Soonest first" },
  { value: "latest", label: "Latest first" },
  { value: "az", label: "Title A–Z" },
];

/**
 * Upcoming Events list with client-side filtering — search, event type,
 * date range and sort. The (future-dated, soonest-first) list is fetched
 * once from the backend, which does the *server* filtering with $gte.
 */
const UpcomingEventsList = () => {
  const [events, setEvents] = useState<VolunteerEvent[] | null>(null);
  const [error, setError] = useState(false);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [range, setRange] = useState<DateRange>("all");
  const [sort, setSort] = useState<SortOrder>("soonest");
  const [weekEnd, setWeekEnd] = useState("");
  const [monthEnd, setMonthEnd] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetch(apiUrl("/events?upcoming=1"))
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
  }, []);

  const filtered = useMemo(() => {
    if (!events) return null;

    let list = events.filter((event) => {
      if (type !== "all" && event.eventType !== type) return false;

      if (search) {
        const needle = search.toLowerCase();
        const haystack = `${event.title} ${event.location}`.toLowerCase();
        if (!haystack.includes(needle)) return false;
      }

      // "YYYY-MM-DD" strings compare lexically the same as chronologically
      if (range === "week" && weekEnd && event.eventDate > weekEnd) return false;
      if (range === "month" && monthEnd && event.eventDate > monthEnd) return false;
      if (range === "later" && weekEnd && event.eventDate <= weekEnd) return false;

      return true;
    });

    if (sort === "latest") list = [...list].sort((a, b) => b.eventDate.localeCompare(a.eventDate));
    else if (sort === "az")
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    // server default is eventDate ascending — "soonest" needs nothing

    return list;
  }, [events, type, search, range, sort, weekEnd, monthEnd]);

  const hasActiveFilters = search !== "" || type !== "all" || range !== "all" || sort !== "soonest";

  const clearFilters = () => {
    setSearch("");
    setType("all");
    setRange("all");
    setSort("soonest");
  };

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

  return (
    <div className="mt-8">
      {/* Filter bar */}
      <div className="rounded-[22px] border border-[#E9F0EA] bg-white p-4 shadow-[0_1px_3px_rgba(20,35,27,0.05)] sm:p-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
          <label className="relative block">
            <span className="sr-only">Search events</span>
            <Search
              className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[#6B7A70]"
              strokeWidth={2}
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or location…"
              className="h-12 w-full rounded-full border border-[#D8E5DB] bg-white pr-4 pl-11 text-base text-[#14231B] outline-none placeholder:text-[#6B7A70] focus:border-[#3DB874]"
            />
          </label>

          <div className="relative">
            <SlidersHorizontal
              className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[#6B7A70]"
              strokeWidth={2}
            />
            <select
              value={range}
              onChange={(e) => {
                setRange(e.target.value as DateRange);
                const { week, month } = localRangeEnd();
                setWeekEnd(week);
                setMonthEnd(month);
              }}
              aria-label="Filter by date range"
              className="h-12 w-full cursor-pointer appearance-none rounded-full border border-[#D8E5DB] bg-white pr-9 pl-11 text-base font-medium text-[#14231B] outline-none focus:border-[#3DB874] sm:w-[168px]"
            >
              {RANGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-xs text-[#6B7A70]">
              ▾
            </span>
          </div>

          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOrder)}
              aria-label="Sort events"
              className="h-12 w-full cursor-pointer appearance-none rounded-full border border-[#D8E5DB] bg-white pr-9 pl-4 text-base font-medium text-[#14231B] outline-none focus:border-[#3DB874] sm:w-[172px]"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-xs text-[#6B7A70]">
              ▾
            </span>
          </div>
        </div>

        {/* Event type pills */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setType("all")}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              type === "all"
                ? "bg-[#3DB874] text-white"
                : "bg-[#F2FAF4] text-[#2F8A57] hover:bg-[#E0F4E6]"
            }`}
          >
            All types
          </button>
          {EVENT_TYPES.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setType(option.value)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                type === option.value
                  ? "bg-[#3DB874] text-white"
                  : "bg-[#F2FAF4] text-[#2F8A57] hover:bg-[#E0F4E6]"
              }`}
            >
              {option.label}
            </button>
          ))}

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="ml-auto inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold text-[#5C6B61] transition-colors hover:bg-[#F2FAF4] hover:text-[#14231B]"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2} />
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Result count */}
      <p className="pt-4 font-semibold text-xl text-gray-400">
        Showing {filtered?.length ?? 0} upcoming event
        {(filtered?.length ?? 0) === 1 ? "" : "s"}
        {type !== "all" && ` · ${eventLabel(type)}`}
        {range !== "all" &&
          ` · ${RANGE_OPTIONS.find((option) => option.value === range)?.label.toLowerCase()}`}
      </p>

      {filtered?.length === 0 ? (
        <div className="rounded-2xl bg-[#F2FAF4] p-10 text-center">
          <p className="text-lg font-semibold text-[#14231B]">
            No events match these filters.
          </p>
          <p className="mt-2 text-sm text-[#6B7A70]">
            Try widening the date range or clearing a filter.
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#3DB874] px-6 py-2.5 text-sm font-semibold text-[#2F8A57] transition-colors hover:bg-[#E0F4E6]"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
          {(filtered ?? []).map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingEventsList;
