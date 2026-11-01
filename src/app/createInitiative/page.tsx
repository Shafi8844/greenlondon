'use client'
import { Badge } from "@/components/ui/badge"
import InitiativeForm from "@/components/ui/initiativeForm"
const page = () => {
  return (
    <div className="container-custom mt-5">
        <div className="flex w-full">
            <Badge
                variant="outline"
                 className="flex  justify-center gap-2 rounded-full border-0 bg-[#E0F4E6] px-5 py-5 text-sm font-medium text-[#14532D]">
                    <span className="h-3 w-3 shrink-0 rounded-full bg-[#3DB874]" />
                    <span className="leading-none">
                     Create an Initiative
                    </span>
            </Badge>
         </div>
         <div className="mt-3">
            <h2 className="text-6xl font-semibold">Start something <span className="text-[#1B9A5E]">green.</span></h2>
         </div>
         <div className="grid grid-cols-2 mt-8 gap-5">
            <InitiativeForm/>
         </div>
    </div>
  )
}

export default page