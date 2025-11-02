import { Button } from "@/components/ui/button";
import React from "react";
import { Calendar } from "@/components/ui/calendar";

const AppointmentPage: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="p-4 rounded-2xl bg-white w-full flex flex-col gap-2">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <p className="text-[#0f172a] text-[1.25rem] leading-7">Citas</p>
        </div>
        <div>
          <Button className="bg-sky-600 text-white">Nueva cita</Button>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border w-1/3"
        />
        <div className="border rounded-2xl p-4 border-gray-300">
          <p className="font-medium leading-2">citas del día</p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
