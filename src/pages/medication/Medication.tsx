import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { getMedicationColumns } from "./medicationColumns";
import { Medication } from "@/entities/medication.model";
import { DataTable } from "@/components/dataTable";
import { useMedicationContext } from "@/context/MedicationContext";
import MedicationService from "@/services/medication.service";
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

const service = new MedicationService();

const MedicationPage: React.FC = () => {
  const {
    medications: data,
    loadingMedication,
    errorMedication,
    fetchMedications,
    refetchMedications,
  } = useMedicationContext();

  // Edit dialog state
  const [editOpen, setEditOpen] = useState(false);
  const [selectedMedication, setSelectedMedication] =
    useState<Medication | null>(null);

  // Delete confirmation state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [unit, setUnit] = useState("");

  useEffect(() => {
    fetchMedications();
  }, [fetchMedications]);

  // Unified submit handler for create and edit
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = {
      name,
      description,
      unit,
      expirationDate: new Date(expirationDate),
      active: true,
    };

    const model = Medication.fromJsonModel(formData);

    if (selectedMedication) {
      // Update
      await service.updateMedication(selectedMedication.id, model);
    } else {
      // Create
      await service.addMedication(model);
    }

    await refetchMedications();
    setEditOpen(false);
    setSelectedMedication(null);

    // Clear form
    setName("");
    setDescription("");
    setUnit("");
    setExpirationDate("");
  }

  async function handleEdit(medication: Medication) {
    setSelectedMedication(medication);
    setEditOpen(true);
  }

  async function handleDelete(id: string) {
    setDeleteId(id);
    setDeleteOpen(true);
  }

  const columns = getMedicationColumns(handleEdit, handleDelete);

  // Populate edit form when selectedMedication changes
  useEffect(() => {
    if (!selectedMedication) {
      // Clear form for create
      setName("");
      setDescription("");
      setUnit("");
      setExpirationDate("");
      return;
    }

    // Populate for edit
    setName(selectedMedication.name);
    setDescription(selectedMedication.description || "");
    setUnit(selectedMedication.unit);

    const d = new Date(selectedMedication.expirationDate ?? Date.now());
    const tzOffset = d.getTimezoneOffset() * 60000;
    const localISO = new Date(d.getTime() - tzOffset)
      .toISOString()
      .slice(0, 16);
    setExpirationDate(localISO);
  }, [selectedMedication]);

  async function confirmDelete() {
    if (!deleteId) return;
    await service.deleteMedication(deleteId);
    await refetchMedications();
    setDeleteOpen(false);
    setDeleteId(null);
  }

  if (loadingMedication) {
    return <div className="p-4 text-gray-500">Cargando medicamentos...</div>;
  }

  if (errorMedication) {
    return <div className="p-4 text-red-600">Error: {errorMedication}</div>;
  }

  return (
    <div className="bg-white h-full rounded-2xl items-start justify-start flex flex-col gap-2 p-4">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <p className="text-[#0f172a] text-[1.25rem] leading-7">
            Medicamentos
          </p>
        </div>
        <div>
          <Button
            onClick={() => {
              setSelectedMedication(null);
              setEditOpen(true);
            }}
            className="bg-sky-600 text-white"
          >
            Nuevo Medicamento
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
                  {selectedMedication
                    ? "Editar medicamento"
                    : "Nuevo medicamento"}
                </DialogTitle>
                <DialogDescription>
                  {selectedMedication
                    ? "Actualiza los datos del medicamento seleccionado."
                    : "Ingresa los datos para un nuevo medicamento"}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <label htmlFor="name">Nombre</label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="description">Descripcion</label>
                  <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="unit">Unidad</label>
                  <Input
                    id="unit"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="editExpirationDate">
                    Fecha de vencimiento:
                  </label>
                  <Input
                    id="editExpirationDate"
                    type="datetime-local"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
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
                ¿Estás seguro que deseas eliminar este medicamento? Esta acción no se
                puede deshacer.
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
          filterColumn="name"
          filterPlaceholder="Filtrar por medicamento..."
        />
      </div>
    </div>
  );
};

export default MedicationPage;
