import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { getPatientColumns } from "./patientColumns";
import Patient from "@/entities/patient.model";
import { DataTable } from "@/components/dataTable";
import { usePatientContext } from "@/context/PatientContext";
import PatientService from "@/services/patient.service";
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

const service = new PatientService();

const PatientPage: React.FC = () => {
  const {
    patients: data,
    loadingPatient,
    errorPatient,
    fetchPatients,
    refetchPatients,
  } = usePatientContext();

  // Edit dialog state
  const [editOpen, setEditOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Delete confirmation state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  // Unified submit handler for create and edit
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = {
      firstName,
      lastName,
      birthdate,
      gender,
      departmentId,
      medicalHistory,
    };

    const model = Patient.fromJsonModel(formData);

    if (selectedPatient) {
      // Update
      await service.updatePatient(selectedPatient.id, model);
    } else {
      // Create
      await service.addPatient(model);
    }

    await refetchPatients();
    setEditOpen(false);
    setSelectedPatient(null);

    // Clear form
    setFirstName("");
    setLastName("");
    setBirthdate("");
    setGender("");
    setDepartmentId("");
    setMedicalHistory("");
  }

  async function handleEdit(patient: Patient) {
    setSelectedPatient(patient);
    setEditOpen(true);
  }

  async function handleDelete(id: string) {
    setDeleteId(id);
    setDeleteOpen(true);
  }

  const columns = getPatientColumns(handleEdit, handleDelete);

  useEffect(() => {
    if (!selectedPatient) {
      // Clear form for create
      setFirstName("");
      setLastName("");
      setBirthdate("");
      setGender("");
      setDepartmentId("");
      setMedicalHistory("");
      return;
    }

    // Populate for edit
    setFirstName(selectedPatient.firstName);
    setLastName(selectedPatient.lastName);
    setGender(selectedPatient.gender);
    setDepartmentId(selectedPatient.departmentId || "");
    setMedicalHistory(selectedPatient.medicalHistory || "");

    const d = new Date(selectedPatient.birthDate);
    const tzOffset = d.getTimezoneOffset() * 60000;
    const localISO = new Date(d.getTime() - tzOffset)
      .toISOString()
      .slice(0, 16);

    setBirthdate(localISO);
  }, [selectedPatient]);

  async function confirmDelete() {
    if (!deleteId) return;
    await service.deletePatient(deleteId);
    await refetchPatients();
    setDeleteOpen(false);
    setDeleteId(null);
  }

  if (loadingPatient) {
    return <div className="p-4 text-gray-500">Cargando pacientes...</div>;
  }

  if (errorPatient) {
    return <div className="p-4 text-red-600">Error: {errorPatient}</div>;
  }

  return (
    <div className="bg-white h-full rounded-2xl items-start justify-start flex flex-col gap-2 p-4">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <p className="text-[#0f172a] text-[1.25rem] leading-7">Pacientes</p>
        </div>
        <div>
          <Button
            onClick={() => {
              setSelectedPatient(null);
              setEditOpen(true);
            }}
            className="bg-sky-600 text-white"
          >
            Nuevo Paciente
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
                  {selectedPatient ? "Editar paciente" : "Nuevo paciente"}
                </DialogTitle>
                <DialogDescription>
                  {selectedPatient
                    ? "Actualiza los datos del paciente seleccionado."
                    : "Ingresa los datos para el nuevo paciente."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <label htmlFor="firstName">Nombres</label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="lastName">Apellidos</label>
                  <Input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="birthdate">Fecha de nacimiento</label>
                  <Input
                    id="birthdate"
                    value={birthdate}
                    type="datetime-local"
                    onChange={(e) => setBirthdate(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="gender">Genero:</label>
                  <Input
                    id="gender"
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="departmentId">Departamento:</label>
                  <Input
                    className="border border-gray-400 p-2"
                    id="departmentId"
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="medicalHistory">Historial medico:</label>
                  <textarea
                    className="border border-gray-400 p-2"
                    id="medicalHistory"
                    value={medicalHistory}
                    onChange={(e) => setMedicalHistory(e.target.value)}
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
                ¿Estás seguro que deseas eliminar este paciente? Esta acción no
                se puede deshacer.
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

      {/* table */}
      <div className="mt-6 w-full">
        <DataTable
          columns={columns}
          data={data}
          filterColumn="firstName"
          filterPlaceholder="Filtrar por nombre..."
        />
      </div>
    </div>
  );
};

export default PatientPage;
