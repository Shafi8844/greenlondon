"use client";

import EventForm from "@/components/ui/EventForm";
import { Badge } from "@/components/ui/badge";
import { authClient } from "@/lib/auth-client";

const CreateEventPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="container-custom mt-8">
      <div className="flex w-full">
        <Badge
          variant="outline"
          className="flex justify-center gap-2 rounded-full border-0 bg-[#E0F4E6] px-5 py-5 text-sm font-medium text-[#14532D]"
        >
          <span className="h-3 w-3 shrink-0 rounded-full bg-[#3DB874]" />
          <span className="leading-none">Create Event</span>
        </Badge>
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#14231B] sm:text-5xl md:text-6xl">
        Start something <span className="text-[#1B9A5E]">green.</span>
      </h2>
      <p className="mt-3 max-w-xl text-base text-[#5C6B61] sm:text-lg">
        Any member can publish an event — it goes straight onto the{" "}
        <span className="font-semibold text-[#3E7A52]">Upcoming Events</span>{" "}
        board for the whole city.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <EventForm creatorEmail={user?.email} creatorName={user?.name} />

        {/* Side panel — what happens after publishing */}
        <div className="space-y-6">
          <div className="rounded-[28px] bg-[#F2FAF4] p-8">
            <h3 className="text-xl font-semibold text-[#14231B]">
              How your event shows up
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-[#4B5B50]">
              {[
                "It joins the Upcoming Events board immediately.",
                "Your event date must be in the future — past dates are blocked.",
                "Your email is saved with the event so only you can edit or delete it later.",
                "Volunteers who join appear on the event's progress bar.",
              ].map((line) => (
                <li key={line} className="flex gap-2.5">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#3DB874]" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[28px] border border-[#E9F0EA] bg-white p-8">
            <p className="text-sm font-semibold tracking-[0.15em] text-[#3E7A52] uppercase">
              Posting as
            </p>
            <p className="mt-2 text-lg font-semibold text-[#14231B]">
              {user?.name}
            </p>
            <p className="mt-1 text-sm text-[#6B7A70]">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;
