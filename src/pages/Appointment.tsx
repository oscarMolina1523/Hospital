import { Button } from "@/components/ui/button";
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";

const data = [
  {
    name: "Ana López",
    doctor: "Dr. Pérez",
    department: "Cardiología",
    date: "15:30",
    status: "Scheduled",
  },
  {
    name: "Juan Ortiz",
    doctor: "Dr. Garcia",
    department: "Pediatria",
    date: "10:00",
    status: "Canceled",
  },
];

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
        <div className="border flex flex-col gap-4 max-w-92 rounded-2xl p-4 border-gray-300">
          <p className="font-medium leading-2">Citas del día</p>
          {data.map((item, index) => (
            <div key={index} className="flex flex-row bg-[#f8fafc] rounded-2xl p-4">
              <div>
                <p className="text-left">
                  Paciente: {item.name} — {item.doctor} ({item.department}) —{" "}
                  {item.date}
                </p>
              </div>
              <div>
                <Badge variant="default">{item.status}</Badge>
              </div>
            </div>
          ))}
        </div>
        <div className="border flex flex-col gap-4 max-w-92 rounded-2xl p-4 border-gray-300">
          <p className="font-medium leading-2">Proximas citas</p>
          {data.map((item, index) => (
            <div key={index} className="flex flex-row bg-[#f8fafc] rounded-2xl p-4">
              <div>
                <p className="text-left">
                  Paciente: {item.name} — {item.doctor} ({item.department}) — {item.date}
                </p>
              </div>
              <div>
                <Badge variant="destructive">{item.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default AppointmentPage;
