import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const initiativeForm = () => {
    const [category, setCategory] = useState("");
    const [borough, setBorough] = useState("");

    const submitHandler =async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const currentData = Object.fromEntries(data.entries());
        const res = await fetch('http://localhost:5050/add_events',{
            method: "POST",
            headers: {
                'Content-Type':"application/JSON"
            },
            body:JSON.stringify(currentData)
        })
        const resData=await res.json();
        console.log(resData);
    }

  return (
     <div className="w-full rounded-[28px] border border-[#D8E5DB] bg-white p-6 sm:p-8 md:p-12">

      <form onSubmit={submitHandler}
        className="space-y-8"
      >

        {/* Initiative title */}
        <div className="space-y-3">
          <Label htmlFor="title" className="text-base font-semibold text-[#14231B]">
            Initiative title
          </Label>

          <Input
            id="title"
            name="title"
            placeholder="e.g. Canal Towpath Clean-up"
            required
            className="h-[60px] rounded-2xl border-[#D8E5DB] px-5 text-base"
          />
        </div>

        {/* Category */}
        <div className="space-y-3">
          <Label className="text-base font-semibold text-[#14231B]">
            Category
          </Label>

          <Select
            value={category}
            onValueChange={(value) => setCategory(value ?? "")}
            required
          >
            <SelectTrigger className="h-[60px]! w-full rounded-2xl border-[#D8E5DB] px-5 text-base">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="urban-rewilding">
                Urban Rewilding
              </SelectItem>

              <SelectItem value="clean-up">
                Community Clean-up
              </SelectItem>

              <SelectItem value="tree-planting">
                Tree Planting
              </SelectItem>

              <SelectItem value="education">
                Education
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Borough */}
        <div className="space-y-3">
          <Label className="text-base font-semibold text-[#14231B]">
            Borough
          </Label>

          <Select
            value={borough}
            onValueChange={(value) => setBorough(value ?? "")}
            required
          >
            <SelectTrigger className="h-[60px]! w-full rounded-2xl border-[#D8E5DB] px-5 text-base">
              <SelectValue placeholder="Select borough" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="hackney">
                Hackney
              </SelectItem>

              <SelectItem value="camden">
                Camden
              </SelectItem>

              <SelectItem value="greenwich">
                Greenwich
              </SelectItem>

              <SelectItem value="islington">
                Islington
              </SelectItem>

              <SelectItem value="lambeth">
                Lambeth
              </SelectItem>

              <SelectItem value="southwark">
                Southwark
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date and time */}
        <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2">

          <div className="space-y-3">
            <Label htmlFor="date" className="text-base font-semibold text-[#14231B]">
              Date
            </Label>

            <Input
              id="date"
              name="date"
              type="date"
              required
              className="h-[60px] rounded-2xl border-[#D8E5DB] px-5 text-base"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="time" className="text-base font-semibold text-[#14231B]">
              Start time
            </Label>

            <Input
              id="time"
              name="time"
              type="time"
              defaultValue="10:00"
              required
              className="h-[60px] rounded-2xl border-[#D8E5DB] px-5 text-base"
            />
          </div>

        </div>

        {/* Meeting point */}
        <div className="space-y-3">
          <Label htmlFor="meetingPoint" className="text-base font-semibold text-[#14231B]">
            Meeting point
          </Label>

          <Input
            id="meetingPoint"
            name="meetingPoint"
            placeholder="Street, park or postcode"
            required
            className="h-[60px] rounded-2xl border-[#D8E5DB] px-5 text-base"
          />
        </div>

        {/* Description */}
        <div className="space-y-3">
          <Label htmlFor="description" className="text-base font-semibold text-[#14231B]">
            Description
          </Label>

          <Textarea
            id="description"
            name="description"
            placeholder="What will volunteers do?"
            required
            className="min-h-[140px] resize-y rounded-2xl border-[#D8E5DB] px-5 py-4 text-base"
          />
        </div>

        {/* Volunteers */}
        <div className="space-y-3">
          <Label htmlFor="volunteers" className="text-base font-semibold text-[#14231B]">
            Volunteers needed
          </Label>

          <Input
            id="volunteers"
            name="volunteers"
            type="number"
            min="1"
            defaultValue="20"
            required
            className="h-[60px] rounded-2xl border-[#D8E5DB] px-5 text-base"
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="h-16 rounded-full bg-[#3DB874] px-8 text-lg font-semibold text-[#14231B] hover:bg-[#32A866]"
        >
          Publish initiative
        </Button>

      </form>
    </div>
  )
}

export default initiativeForm
