import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import Image from "next/image";
import ReservationCard from "@/components/ui/reservationCard";
import type { EventData } from "@/components/ui/reservationCard";

interface IPageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: IPageProps) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5050/events/${id}`);

  if (!res.ok) {
    notFound();
  }

  const event: EventData = await res.json();

  return (
    <div className='container-custom'>
        <div className="flex w-full mt-5">
            <Badge
                variant="outline"
                 className="flex  justify-center gap-2 rounded-full border-0 bg-[#E0F4E6] px-5 py-5 text-sm font-medium text-[#14532D]">
                    <span className="h-3 w-3 shrink-0 rounded-full bg-[#3DB874]" />
                    <span className="leading-none">
                     {event.category}
                    </span>
            </Badge>
         </div>
          <h2 className="text-5xl font-semibold mt-5">{event.title}</h2>
          <div className="mt-2 ml-3">
            <p className="font-semibold text-gray-400">Date</p>
            <p className="text-m font-semibold text-black">{event.startsAt}</p>
          </div>
          <div className="grid grid-cols-3 mt-5">
            <div className="col-span-2">
              <Image
              src={event.imageUrl}
              alt={event.title}
              width={500}
              height={300}
              className="rounded-3xl w-200 h-120"
            />
            <div className="ml-5 space-y-2">
              <h1 className="text-3xl font-semibold mt-4">About this event</h1>
              <p className="w-190">{event.description}</p>
            </div>
            </div>
            <div className="col-span-1">
              <ReservationCard event={event} />
            </div>

          </div>
          
    </div>
  )
}

export default page
