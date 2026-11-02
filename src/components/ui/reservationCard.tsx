'use client'
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { email } from "better-auth"
import { METHODS } from "http"

export interface EventData {
  _id: string
  title: string
  category: string
  description: string
  startsAt: string
  meetingPoint: string
  imageUrl: string
  capacity: number
  registeredCount: number
  borough: string
}

interface ReservationCardProps {
  event: EventData
}

const formatDate = (value: string) => {
  const date = new Date(value)
  if (isNaN(date.getTime())) return value
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  })
}

const formatTime = (value: string) => {
  const date = new Date(value)
  if (isNaN(date.getTime())) return value
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

const ReservationCard = ({ event }: ReservationCardProps) => {

    const {data:session}=authClient.useSession();
    const user = session?.user;

    const reservationHandle=async()=>{
        const data = {
            name:user?.name,
            email:user?.email,
            image:user?.image,
            ...event,
            reserveDate:new Date()
        }
        // http://localhost:5050/reservation
       const res = await fetch("http://localhost:5050/reservation",{
        method:"POST",
        headers:{
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
       })

       const reservationRes= await res.json();
       console.log(reservationRes);
    }
  return (
    <div className="rounded-3xl border border-[#E7F0E9] p-8 shadow-sm">
      <h3 className="text-5xl font-semibold text-[#1D3B2A]">Free</h3>
      <p className="mt-2 text-lg text-gray-600">No experience needed</p>

      <div className="mt-6 border-t border-[#E7F0E9]">
        <div className="border-b border-[#E7F0E9] py-4">
          <p className="text-lg">
            <span className="font-bold text-[#1D3B2A]">Date</span>{" "}
            <span className="text-gray-700">{formatDate(event.startsAt)}</span>
          </p>
        </div>
        <div className="border-b border-[#E7F0E9] py-4">
          <p className="text-lg">
            <span className="font-bold text-[#1D3B2A]">Time</span>{" "}
            <span className="text-gray-700">{formatTime(event.startsAt)}</span>
          </p>
        </div>
        <div className="py-4">
          <p className="text-lg">
            <span className="font-bold text-[#1D3B2A]">Where</span>{" "}
            <span className="text-gray-700">{event.meetingPoint}</span>
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#E0F4E6]">
          <div
            className="h-full rounded-full bg-[#3DB874]"
            style={{
              width: `${Math.min(
                Math.round((event.registeredCount / event.capacity) * 100),
                100
              )}%`,
            }}
          />
        </div>
        <p className="mt-3 text-gray-600">
          {event.registeredCount} of {event.capacity} places taken
        </p>
      </div>

      <Button
      onClick={reservationHandle}
        type="button"
        className="mt-7 w-full rounded-full bg-[#3DB874] py-4 text-lg font-semibold text-white transition-colors hover:bg-[#34A167]"
      >
        Reserve my place
      </Button>
    </div>
  )
}

export default ReservationCard