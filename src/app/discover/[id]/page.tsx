import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import Image from "next/image";

interface IEvents {
  _id: string;
  title: string;
  category: string;
  description: string;
  meetingPoint: string;
  imageUrl: string;
  startsAt: string;
  capacity: number;
  registeredCount: number;
  borough: string;
}

interface IPageProps {
  params: Promise<{ id: string }>;
}

const formatDate = (value: string) => {
  const date = new Date(value);
  if (isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
};

const formatTime = (value: string) => {
  const date = new Date(value);
  if (isNaN(date.getTime())) return value;
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const page = async ({ params }: IPageProps) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5050/events/${id}`);

  if (!res.ok) {
    notFound();
  }

  const data: IEvents = await res.json();

  return (
    <div className='container-custom'>
        <div className="flex w-full mt-5">
            <Badge
                variant="outline"
                 className="flex  justify-center gap-2 rounded-full border-0 bg-[#E0F4E6] px-5 py-5 text-sm font-medium text-[#14532D]">
                    <span className="h-3 w-3 shrink-0 rounded-full bg-[#3DB874]" />
                    <span className="leading-none">
                     {data.category}
                    </span>
            </Badge>
         </div>
          <h2 className="text-5xl font-semibold mt-5">{data.title}</h2>
          <div className="mt-2 ml-3">
            <p className="font-semibold text-gray-400">Date</p>
            <p className="text-m font-semibold text-black">{data.startsAt}</p>
          </div>
          <div className="grid grid-cols-3 mt-5">
            <div className="col-span-2">
              <Image
              src={data.imageUrl}
              alt={data.title}
              width={500}
              height={300}
              className="rounded-3xl w-200 h-120"
            />
            <div className="ml-5 space-y-2">
              <h1 className="text-3xl font-semibold mt-4">About this event</h1>
              <p className="w-190">{data.description}</p>
            </div>
            </div>
            <div className="col-span-1">
              <div className="rounded-3xl border border-[#E7F0E9] p-8 shadow-sm">
                <h3 className="text-5xl font-semibold text-[#1D3B2A]">Free</h3>
                <p className="mt-2 text-lg text-gray-600">No experience needed</p>

                <div className="mt-6 border-t border-[#E7F0E9]">
                  <div className="border-b border-[#E7F0E9] py-4">
                    <p className="text-lg">
                      <span className="font-bold text-[#1D3B2A]">Date</span>{" "}
                      <span className="text-gray-700">{formatDate(data.startsAt)}</span>
                    </p>
                  </div>
                  <div className="border-b border-[#E7F0E9] py-4">
                    <p className="text-lg">
                      <span className="font-bold text-[#1D3B2A]">Time</span>{" "}
                      <span className="text-gray-700">{formatTime(data.startsAt)}</span>
                    </p>
                  </div>
                  <div className="py-4">
                    <p className="text-lg">
                      <span className="font-bold text-[#1D3B2A]">Where</span>{" "}
                      <span className="text-gray-700">{data.meetingPoint}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[#E0F4E6]">
                    <div
                      className="h-full rounded-full bg-[#3DB874]"
                      style={{
                        width: `${Math.min(
                          Math.round((data.registeredCount / data.capacity) * 100),
                          100
                        )}%`,
                      }}
                    />
                  </div>
                  <p className="mt-3 text-gray-600">
                    {data.registeredCount} of {data.capacity} places taken
                  </p>
                </div>

                <button className="mt-7 w-full rounded-full bg-[#3DB874] py-4 text-lg font-semibold text-white transition-colors hover:bg-[#34A167]">
                  Reserve my place
                </button>
              </div>
            </div>

          </div>
          
    </div>
  )
}

export default page
