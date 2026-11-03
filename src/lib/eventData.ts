export interface VolunteerEvent {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string; // "YYYY-MM-DD" — events are only ever future dated
  capacity?: number;
  registeredCount?: number;
  creatorEmail: string;
  creatorName?: string;
  createdAt?: string;
}

// A join document stores a snapshot of the event beside the user's data
export interface JoinedEvent {
  _id: string;
  userEmail: string;
  userName: string;
  eventId: string;
  title: string;
  thumbnail: string;
  eventType: string;
  location: string;
  eventDate: string;
  joinedAt?: string;
}

export const EVENT_TYPES = [
  { value: "cleanup", label: "Cleanup" },
  { value: "plantation", label: "Plantation" },
  { value: "donation", label: "Donation" },
  { value: "gardening", label: "Gardening" },
  { value: "education", label: "Education" },
] as const;

export const eventLabel = (slug: string) =>
  EVENT_TYPES.find((type) => type.value === slug)?.label ??
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

// Wildcard remotePatterns in next.config.ts accept thumbnails from ANY host.
// Legacy seeded loremflickr URLs (host was down) still fall back to a stable
// seeded picsum photo.
export const imageSrc = (thumbnail: string, seed: string) =>
  thumbnail.includes("loremflickr")
    ? `https://picsum.photos/seed/${seed}/800/500`
    : thumbnail;

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// eventDate is a plain "YYYY-MM-DD" date — parse the parts directly so no
// timezone conversion can shift the day.
export const formatDateParts = (eventDate: string) => {
  const [, month, day] = eventDate.split("-").map(Number);
  return {
    day,
    month: MONTHS[month - 1]?.toUpperCase() ?? "",
    full: day ? `${day} ${MONTHS[month - 1]}` : eventDate,
    weekday: day
      ? new Date(`${eventDate}T12:00:00`).toLocaleDateString("en-GB", {
          weekday: "short",
        })
      : "",
  };
};

export const isUpcoming = (eventDate: string) =>
  eventDate >= new Date().toISOString().slice(0, 10);
