"use client";

import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import type { VolunteerEvent } from "@/lib/eventData";
import { EVENT_TYPES } from "@/lib/eventData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EventFormProps {
  /** Pass an event to switch the same form into update (PATCH) mode */
  initial?: VolunteerEvent;
  /** Creator identity — used for create mode; update mode verifies against it */
  creatorEmail?: string;
  creatorName?: string;
  /** Only used in update mode: called with the saved event */
  onSaved?: (event: VolunteerEvent) => void;
  onCancel?: () => void;
}

const BASE_API = "http://localhost:5050";

const EMPTY_SUBSCRIBE = () => () => {};

// Block past dates in the browser: the picker can't go before today.
// new Date() is unstable during SSR, so the server render gets "" and the
// hydrated client value replaces it. (Next 16 / React compiler constraint.)
const localToday = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
};

const EventForm = ({ initial, creatorEmail, creatorName, onSaved, onCancel }: EventFormProps) => {
  const router = useRouter();
  const editing = Boolean(initial);

  const [eventType, setEventType] = useState(initial?.eventType ?? "");
  const [formError, setFormError] = useState("");
  // Block past dates in the browser: the picker can't go before today.
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const today = useSyncExternalStore(EMPTY_SUBSCRIBE, () => localToday(), () => "");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");
    setSuccess("");

    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<
      string,
      string
    >;

    if (!data.eventType) {
      setFormError("Please choose an event type.");
      return;
    }
    // Any host works now — only require it to be a well-formed absolute URL
    try {
      new URL(data.thumbnail);
    } catch {
      setFormError("Thumbnail must be a valid image URL (starting with https:// or http://).");
      return;
    }
    if (data.eventDate < today) {
      setFormError("The event date must be in the future.");
      return;
    }

    setSubmitting(true);
    try {
      let res: Response;

      if (editing) {
        // Update own event only — backend verifies the creator email
        res = await fetch(`${BASE_API}/events/${initial!._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: initial!.creatorEmail, ...data }),
        });
      } else {
        // Create — keep the logged-in user's email with the event
        res = await fetch(`${BASE_API}/add_events`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            email: creatorEmail,
            creatorName,
          }),
        });
      }

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong — please try again.");
      }

      const saved: VolunteerEvent = { ...initial, ...data, eventType: data.eventType } as VolunteerEvent;

      if (editing) {
        setSuccess("Event updated successfully!");
        onSaved?.(saved);
      } else {
        setSuccess("Event created successfully! Redirecting to Upcoming Events…");
        setTimeout(() => {
          router.push("/upcoming-events");
        }, 1200);
      }
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full rounded-[28px] border border-[#D8E5DB] bg-white p-6 sm:p-8 md:p-12">
      <form onSubmit={submitHandler} className="space-y-8">
        {/* Event title */}
        <div className="space-y-3">
          <Label
            htmlFor="event-title"
            className="text-base font-semibold text-[#14231B]"
          >
            Event title
          </Label>
          <Input
            id="event-title"
            name="title"
            defaultValue={initial?.title}
            placeholder="e.g. Canal Towpath Cleanup"
            required
            className="h-[60px] rounded-2xl border-[#D8E5DB] px-5 text-base"
          />
        </div>

        {/* Event type */}
        <div className="space-y-3">
          {/* The Base UI Select renders no native form field, so its value
              is mirrored here for FormData submission. */}
          <input type="hidden" name="eventType" value={eventType} />
          <Label className="text-base font-semibold text-[#14231B]">Event type</Label>
          <Select
            value={eventType}
            onValueChange={(value) => setEventType(value ?? "")}
          >
            <SelectTrigger className="h-[60px]! w-full rounded-2xl border-[#D8E5DB] px-5 text-base">
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              {EVENT_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Thumbnail image URL from an allowed host */}
        <div className="space-y-3">
          <Label
            htmlFor="event-thumbnail"
            className="text-base font-semibold text-[#14231B]"
          >
            Thumbnail image URL
          </Label>
          <Input
            id="event-thumbnail"
            name="thumbnail"
            type="url"
            defaultValue={initial?.thumbnail}
            placeholder="https://example.com/my-event-photo.jpg"
            required
            className="h-[60px] rounded-2xl border-[#D8E5DB] px-5 text-base"
          />
          <p className="text-xs text-[#6B7A70]">
            Paste any image link (https://…) — i.e. from Google Images, your own
            hosting or an image CDN.
          </p>
        </div>

        {/* Location */}
        <div className="space-y-3">
          <Label
            htmlFor="event-location"
            className="text-base font-semibold text-[#14231B]"
          >
            Location
          </Label>
          <Input
            id="event-location"
            name="location"
            defaultValue={initial?.location}
            placeholder="Street, park or postcode"
            required
            className="h-[60px] rounded-2xl border-[#D8E5DB] px-5 text-base"
          />
        </div>

        {/* Date and volunteers needed */}
        <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2">
          <div className="space-y-3">
            <Label
              htmlFor="event-date"
              className="text-base font-semibold text-[#14231B]"
            >
              Event date
            </Label>
            <Input
              id="event-date"
              name="eventDate"
              type="date"
              min={today}
              defaultValue={initial?.eventDate}
              required
              className="h-[60px] rounded-2xl border-[#D8E5DB] px-5 text-base"
            />
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="event-capacity"
              className="text-base font-semibold text-[#14231B]"
            >
              Volunteers needed
            </Label>
            <Input
              id="event-capacity"
              name="capacity"
              type="number"
              min="1"
              defaultValue={initial?.capacity ?? 20}
              className="h-[60px] rounded-2xl border-[#D8E5DB] px-5 text-base"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3">
          <Label
            htmlFor="event-description"
            className="text-base font-semibold text-[#14231B]"
          >
            Description
          </Label>
          <Textarea
            id="event-description"
            name="description"
            defaultValue={initial?.description}
            placeholder="What will volunteers do?"
            required
            className="min-h-[140px] resize-y rounded-2xl border-[#D8E5DB] px-5 py-4 text-base"
          />
        </div>

        {formError && (
          <p
            role="alert"
            className="rounded-2xl bg-red-50 px-5 py-4 text-sm font-medium text-red-700"
          >
            {formError}
          </p>
        )}
        {success && (
          <p className="rounded-2xl bg-[#E0F4E6] px-5 py-4 text-sm font-semibold text-[#14532D]">
            ✓ {success}
          </p>
        )}

        {/* Submit — native buttons so `submit` works; Base UI's <Button>
            forces type="button", which breaks form submission */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex h-16 items-center justify-center rounded-full bg-[#3DB874] px-8 text-lg font-semibold text-white transition-colors hover:bg-[#32A866] disabled:opacity-60"
          >
            {submitting
              ? editing
                ? "Saving changes…"
                : "Publishing…"
              : editing
                ? "Save changes"
                : "Publish event"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex h-16 items-center justify-center rounded-full border border-[#CBE2D2] px-8 text-lg font-semibold text-[#14231B] transition-colors hover:bg-[#E0F4E6]"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EventForm;
