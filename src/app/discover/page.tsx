import { Badge } from "@/components/ui/badge"
import Filter from "@/components/ui/filter"
import EventsCard from "@/components/ui/eventsCard"

const page = async() => {
    
  return (
    <div className="container-custom mt-10">
        <div className="flex w-full">
            <Badge
                variant="outline"
                 className="flex  justify-center gap-2 rounded-full border-0 bg-[#E0F4E6] px-5 py-5 text-sm font-medium text-[#14532D]">
                    <span className="h-3 w-3 shrink-0 rounded-full bg-[#3DB874]" />
                    <span className="leading-none">
                     Discover
                    </span>
            </Badge>
         </div>
         <div className="mt-5">
            <h2 className="text-7xl font-semibold">Find your next <span className="text-[#1B9A5E]">green day</span> out.</h2>
         </div>
         <div className="grid grid-cols-4 gap-7 mt-5">
            <div className="col-span-1">
                <Filter></Filter>
            </div>
            <div className="col-span-3">
                <p className=" pt-2 font-semibold text-xl text-gray-400">Showing 20 upcoming events</p>
                <div className="">
                    <EventsCard/>
                </div>
            </div>
         </div>
    </div>
  )
}

export default page