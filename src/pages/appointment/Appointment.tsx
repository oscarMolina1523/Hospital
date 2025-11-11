import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Appointment from "@/entities/appointment.model";
import { DataTable } from "@/components/dataTable";
import { getAppointmentColumns } from "./appointmentColumns";
import { useAppointmentContext } from "@/context/AppointmentContext";
import { usePatientContext } from "@/context/PatientContext";
import { useUserContext } from "@/context/UserContext";
import { useDepartmentContext } from "@/context/DepartmentContext";
import AppointmentService from "@/services/appointment.service";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AppointmentStatus } from "@/entities/appointment.enum";
import { useEntityMap } from "@/hooks/useEntityMap";

const service = new AppointmentService();

const AppointmentPage: React.FC = () => {
  const {
    appointments: data,
    loadingAppointment,
    errorAppointment,
    fetchAppointments,
    refetchAppointments,
  } = useAppointmentContext();
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Edit dialog state
  const [editOpen, setEditOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // Delete confirmation state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form states
  const [patientId, setPatientId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [status, setStatus] = useState<AppointmentStatus | "">("");
  const [scheduledAt, setScheduledAt] = useState("");  // String para datetime-local
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // Unified submit handler for create and edit
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = {
      patientId,
      departmentId,
      doctorId,
      status: status as AppointmentStatus,
      scheduledAt: new Date(scheduledAt),
      notes,
    };

    const model = Appointment.fromJsonModel(formData);

    if (selectedAppointment) {
      // Update
      await service.updateAppointment(selectedAppointment.id, model);
    } else {
      // Create
      await service.addAppointment(model);
    }

    await refetchAppointments();
    setEditOpen(false);
    setSelectedAppointment(null);

    // Clear form
    setPatientId("");
    setDepartmentId("");
    setDoctorId("");
    setStatus("");
    setScheduledAt("");
    setNotes("");
  }

  async function handleEdit(appointment: Appointment) {
    setSelectedAppointment(appointment);
    setEditOpen(true);
  }

  async function handleDelete(id: string) {
    setDeleteId(id);
    setDeleteOpen(true);
  }

  const columns = getAppointmentColumns(handleEdit, handleDelete);
  
  // Build lookup maps from global contexts so we can enrich appointments without extra requests
  const { patients } = usePatientContext();
  const { users } = useUserContext();
  const { departments } = useDepartmentContext();

  const usersMap= useEntityMap(users, "id", "username");
  const departmentsMap= useEntityMap(departments, "id", "name");
  const patientsMap= useEntityMap(patients, "id", "fullName");

  // Enrich appointments with readable names (no extra API calls)
  const enrichedData = React.useMemo(() => {
    return data.map((a) => ({
      ...a,
      patientName: patientsMap[a.patientId] ?? a.patientId,
      doctorName: usersMap[a.doctorId] ?? a.doctorId,
      departmentName: departmentsMap[a.departmentId] ?? a.departmentId,
    }));
  }, [data, patientsMap, usersMap, departmentsMap]);

  // Populate edit form when selectedAppointment changes
  useEffect(() => {
    if (!selectedAppointment) {
      // Clear form for create
      setPatientId("");
      setDepartmentId("");
      setDoctorId("");
      setStatus("");
      setScheduledAt("");
      setNotes("");
      return;
    }

    // Populate for edit
    setPatientId(selectedAppointment.patientId);
    setDepartmentId(selectedAppointment.departmentId);
    setDoctorId(selectedAppointment.doctorId);
    setStatus(selectedAppointment.status);
    setNotes(selectedAppointment.notes || "");

    // Convert scheduledAt to string for datetime-local
    const d = new Date(selectedAppointment.scheduledAt);
    const tzOffset = d.getTimezoneOffset() * 60000;
    const localISO = new Date(d.getTime() - tzOffset).toISOString().slice(0, 16);
    setScheduledAt(localISO);
  }, [selectedAppointment]);

  async function confirmDelete() {
    if (!deleteId) return;
    await service.deleteAppointment(deleteId);
    await refetchAppointments();
    setDeleteOpen(false);
    setDeleteId(null);
  }

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
        <div>
          <Button
            variant="outline"
            className="bg-sky-600 text-white"
            onClick={() => {
              setSelectedAppointment(null);
              setEditOpen(true);
            }}
          >
            Nueva Cita
          </Button>
        </div>
        {/* Edit dialog  */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent
            className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>
                  {selectedAppointment ? "Editar cita" : "Nueva cita"}
                </DialogTitle>
                <DialogDescription>
                  {selectedAppointment
                    ? "Actualiza los datos de la cita seleccionada."
                    : "Ingresa los datos para la nueva cita."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <label htmlFor="editPatientId">Paciente</label>
                  <Input
                    id="editPatientId"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="editDepartmentId">Departamento</label>
                  <Input
                    id="editDepartmentId"
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="editDoctorId">Doctor</label>
                  <Input
                    id="editDoctorId"
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="editStatus">Estado</label>
                  <select
                    id="editStatus"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as AppointmentStatus)}
                    className="border rounded-md p-2"
                  >
                    {Object.values(AppointmentStatus).map((statusOption) => (
                      <option key={statusOption} value={statusOption}>
                        {statusOption.charAt(0) + statusOption.slice(1).toLowerCase()}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-3">
                  <label htmlFor="editScheduledAt">Programada para:</label>
                  <Input
                    id="editScheduledAt"
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="editNotes">Notas:</label>
                  <textarea
                    className="border border-gray-400 p-2"
                    id="editNotes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter className="pt-4">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="bg-sky-600 text-white">
                  Guardar
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete confirmation dialog  */}
        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Confirmar eliminación</DialogTitle>
              <DialogDescription>
                ¿Estás seguro que deseas eliminar esta cita? Esta acción no se puede deshacer.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button variant="destructive" onClick={confirmDelete}>
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {/* principal code*/}
      <div className="flex flex-row gap-2">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border w-1/3"
        />
        <div className="border flex flex-col gap-4 max-w-92 rounded-2xl p-4 border-gray-300">
          <p className="font-medium leading-2">Citas del día</p>
          {enrichedData.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="flex flex-row bg-[#f8fafc] rounded-2xl p-4"
            >
              <div>
                <p className="text-left">
                  Paciente: {item.patientName} — {item.doctorName} (
                  {item.departmentName}) —{" "}
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
          <p className="font-medium leading-2">Próximas citas</p>
          {enrichedData.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="flex flex-row bg-[#f8fafc] rounded-2xl p-4"
            >
              <div>
                <p className="text-left">
                  Paciente: {item.patientName} — {item.doctorName} (
                  {item.departmentName}) —{" "}
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
      {/* Table */}
      <div className="mt-6">
        <DataTable
          columns={columns}
          data={enrichedData as unknown as Appointment[]}
          filterColumn="patientName"
          filterPlaceholder="Filtrar por paciente..."
        />
      </div>
    </div>
  );
};

export default AppointmentPage;
