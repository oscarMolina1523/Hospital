import React, { useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type Appointment from "@/entities/appointment.model";
import { DataTable } from "@/components/dataTable";
import { getAppointmentColumns } from "./appointmentColumns";
import { useAppointmentContext } from "@/context/AppointmentContext";
import AppointmentService from "@/services/appointment.service";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

const service = new AppointmentService();

const AppointmentPage: React.FC = () => {
  const {
    appointments: data,
    loadingAppointment,
    errorAppointment,
    fetchAppointments,
  } = useAppointmentContext();
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  async function handleCreate(appointment: Appointment) {
    await service.addAppointment(appointment);
  }

  async function handleEdit(appointment: Appointment) {
    await service.updateAppointment(appointment.id, appointment);
  }

  async function handleDelete(id: string) {
    await service.deleteAppointment(id);
  }

  const columns = getAppointmentColumns(handleEdit, handleDelete);

  if (loadingAppointment) {
    return <div className="p-4 text-gray-500">Cargando citas...</div>;
  }

  if (errorAppointment) {
    return <div className="p-4 text-red-600">Error: {errorAppointment}</div>;
  }

  return (
    <div className="p-4 rounded-2xl bg-white w-full flex flex-col gap-2">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <p className="text-[#0f172a] text-[1.25rem] leading-7">Citas</p>
        </div>
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-sky-600 text-white">Nueva Cita</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Crear nueva cita</DialogTitle>
                <DialogDescription>
                  Estamos creando una nueva cita , se mostrará en la base de datos
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <label htmlFor="patient-1">Paciente</label>
                  <Input id="patientId" name="patient" />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="department-1">Departamento</label>
                  <Input
                    id="departmentId"
                    name="department"
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="doctor-1">Doctor</label>
                  <Input
                    id="doctorId"
                    name="doctor"
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="status-1">Estado</label>
                  <Input
                    id="status"
                    name="status"
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="scheduled-1">Programada para:</label>
                  <Input
                    id="scheduled"
                    name="scheduled"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="bg-sky-600 text-white">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
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
          {data.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="flex flex-row bg-[#f8fafc] rounded-2xl p-4"
            >
              <div>
                <p className="text-left">
                  Paciente: {item.patientId} — {item.doctorId} (
                  {item.departmentId}) —{" "}
                  {item.scheduledAt.toLocaleTimeString("es-NI", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
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
          {data.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="flex flex-row bg-[#f8fafc] rounded-2xl p-4"
            >
              <div>
                <p className="text-left">
                  Paciente: {item.patientId} — {item.doctorId} (
                  {item.departmentId}) —{" "}
                  {item.scheduledAt.toLocaleTimeString("es-NI", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div>
                <Badge variant="destructive">{item.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* table */}
      <div className="mt-6">
        <DataTable
          columns={columns}
          data={data}
          filterColumn="patientId"
          filterPlaceholder="Filtrar por paciente..."
        />
      </div>
    </div>
  );
};

export default AppointmentPage;
