import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { getMedicalServiceColumns } from "./medicalServiceColumns";
import MedicalService from "@/entities/medicalService.model";
import { DataTable } from "@/components/dataTable";
import { useMedicalServiceContext } from "@/context/MedicalServiceContext";
import MedicalServiceService from "@/services/medicalService.service";
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

const service = new MedicalServiceService();

const MedicalServicePage: React.FC = () => {
  const {
    medicalServices: data,
    loadingMedicalService,
    errorMedicalService,
    fetchMedicalServices,
    refetchMedicalServices,
  } = useMedicalServiceContext();

  // Edit dialog state
  const [editOpen, setEditOpen] = useState(false);
  const [selectedMedicalService, setSelectedMedicalService] =
    useState<MedicalService | null>(null);

  // Delete confirmation state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    fetchMedicalServices();
  }, [fetchMedicalServices]);

  // Unified submit handler for create and edit
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = {
      name,
      departmentId,
      baseCost: quantity,
      active: true,
    };

    const model = MedicalService.fromJsonModel(formData);

    if (selectedMedicalService) {
      // Update
      await service.updateMedicalService(selectedMedicalService.id, model);
    } else {
      // Create
      await service.addMedicalService(model);
    }

    await refetchMedicalServices();
    setEditOpen(false);
    setSelectedMedicalService(null);

    // Clear form
    setName("");
    setDepartmentId("");
    setQuantity(0);
  }

  async function handleEdit(medicalService: MedicalService) {
    setSelectedMedicalService(medicalService);
    setEditOpen(true);
  }

  async function handleDelete(id: string) {
    setDeleteId(id);
    setDeleteOpen(true);
  }

  const columns = getMedicalServiceColumns(handleEdit, handleDelete);

  // Populate edit form when selectedMedicalService changes
  useEffect(() => {
    if (!selectedMedicalService) {
      // Clear form for create
      setName("");
      setDepartmentId("");
      setQuantity(0);
      return;
    }

    // Populate for edit
    setName(selectedMedicalService.name);
    setDepartmentId(selectedMedicalService.departmentId || "");
    setQuantity(selectedMedicalService.baseCost);
  }, [selectedMedicalService]);

  async function confirmDelete() {
    if (!deleteId) return;
    await service.deleteMedicalService(deleteId);
    await refetchMedicalServices();
    setDeleteOpen(false);
    setDeleteId(null);
  }

  if (loadingMedicalService) {
    return (
      <div className="p-4 text-gray-500">Cargando servicios medicos...</div>
    );
  }

  if (errorMedicalService) {
    return <div className="p-4 text-red-600">Error: {errorMedicalService}</div>;
  }

  return (
    <div className="bg-white h-full rounded-2xl items-start justify-start flex flex-col gap-2 p-4">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <p className="text-[#0f172a] text-[1.25rem] leading-7">
            Servicios Medicos
          </p>
        </div>
        <div>
          <Button
            onClick={() => {
              setSelectedMedicalService(null);
              setEditOpen(true);
            }}
            className="bg-sky-600 text-white"
          >
            Nuevo Servicio
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
                  {selectedMedicalService
                    ? "Editar servicio medico"
                    : "Nuevo servicio medico"}
                </DialogTitle>
                <DialogDescription>
                  {selectedMedicalService
                    ? "Actualiza los datos del servicio seleccionado."
                    : "Ingresa los datos para un nuevo servicio"}
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
                  <label htmlFor="departmentId">Departamento</label>
                  <Input
                    id="departmentId"
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="editAmount">Monto:</label>
                  <Input
                    className="border border-gray-400 p-2"
                    id="editAmount"
                    type="number"
                    value={quantity === 0 ? "" : quantity}
                    min={0}
                    onChange={(e) => setQuantity(Number(e.target.value))}
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
                ¿Estás seguro que deseas eliminar este servicio medico? Esta acción
                no se puede deshacer.
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
          filterPlaceholder="Filtrar por servicio..."
        />
      </div>
    </div>
  );
};

export default MedicalServicePage;
