import React, { useEffect, useRef } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Appointment from "@/entities/appointment.model";
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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AppointmentStatus } from "@/entities/appointment.enum";

const service = new AppointmentService();

const AppointmentPage: React.FC = () => {
  const {
    appointments: data,
    loadingAppointment,
    errorAppointment,
    fetchAppointments,
    refetchAppointments,
  } = useAppointmentContext();
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const patientRef = useRef<HTMLInputElement>(null);
  const departmentRef = useRef<HTMLInputElement>(null);
  const doctorRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);
  const scheduledRef = useRef<HTMLInputElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // evita que recargue la página
    e.preventDefault();

    if (
      !patientRef.current ||
      !departmentRef.current ||
      !doctorRef.current ||
      !statusRef.current ||
      !scheduledRef.current
    )
      return;

    const formData = {
      patientId: patientRef.current.value,
      departmentId: departmentRef.current.value,
      doctorId: doctorRef.current.value,
      status: statusRef.current.value as AppointmentStatus,
      scheduledAt: new Date(scheduledRef.current.value),
      notes: notesRef.current?.value || "",
    };
    const appointment = Appointment.fromJsonModel(formData);

    await service.addAppointment(appointment);
    await refetchAppointments(); // recarga la lista

    patientRef.current.value = "";
    departmentRef.current.value = "";
    doctorRef.current.value = "";
    statusRef.current.value = "";
    scheduledRef.current.value = "";
    if (notesRef.current) notesRef.current.value = "";
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
          <DialogTrigger asChild>
            <Button variant="outline" className="bg-sky-600 text-white">
              Nueva Cita
            </Button>
          </DialogTrigger>
          <DialogContent
            className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto"
            style={{
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE 10+
            }}
          >
            <form onSubmit={handleCreate}>
              <DialogHeader>
                <DialogTitle>Crear nueva cita</DialogTitle>
                <DialogDescription>
                  Estamos creando una nueva cita , se mostrará en la base de
                  datos
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <label htmlFor="patientId">Paciente</label>
                  <Input id="patientId" ref={patientRef} />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="departmentId">Departamento</label>
                  <Input id="departmentId" ref={departmentRef} />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="doctorId">Doctor</label>
                  <Input id="doctorId" ref={doctorRef} />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="status">Estado</label>
                  <select
                    id="status"
                    ref={statusRef}
                    className="border rounded-md p-2"
                  >
                    {Object.values(AppointmentStatus).map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0) + status.slice(1).toLowerCase()}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-3">
                  <label htmlFor="scheduledAt">Programada para:</label>
                  <Input
                    id="scheduledAt"
                    type="datetime-local"
                    ref={scheduledRef}
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="notes">Notas:</label>
                  <textarea
                    className="border border-gray-400"
                    id="notes"
                    ref={notesRef}
                  />
                </div>
              </div>
              <DialogFooter className="pt-4">
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button type="submit" className="bg-sky-600 text-white">
                  Guardar
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
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
