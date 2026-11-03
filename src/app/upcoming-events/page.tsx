import EventList from "@/components/ui/EventList";
import { Badge } from "@/components/ui/badge";

const UpcomingEventsPage = () => {
  return (
    <main className="container-custom mt-8">
      <div className="flex w-full">
        <Badge
          variant="outline"
          className="flex justify-center gap-2 rounded-full border-0 bg-[#E0F4E6] px-5 py-5 text-sm font-medium text-[#14532D]"
        >
          <span className="h-3 w-3 shrink-0 rounded-full bg-[#3DB874]" />
          <span className="leading-none">Upcoming Events</span>
        </Badge>
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#14231B] sm:text-5xl md:text-6xl">
        Find your next <span className="text-[#1B9A5E]">green day</span> out.
      </h2>
      <p className="mt-3 max-w-2xl text-base text-[#5C6B61] sm:text-lg">
        Every event added through the Create Event form — future dates only,
        soonest first.
      </p>

      {/* Server filters to future dates with $gte, sorted by event date */}
      <div className="mt-8">
        <EventList url="http://localhost:5050/events?upcoming=1" showCount />
      </div>
    </main>
  );
};

export default UpcomingEventsPage;
