import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { getDepartmentColumns } from "./departmentColumns";
import { DataTable } from "@/components/dataTable";
import Department from "@/entities/department.model";
import { useDepartmentContext } from "@/context/DepartmentContext";
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
import DepartmentService from "@/services/department.service";

const service = new DepartmentService();

const DepartmentPage: React.FC = () => {
  const {
    departments: data,
    loadingDepartment,
    errorDepartment,
    fetchDepartments,
    refetchDepartments,
  } = useDepartmentContext();

  // Edit dialog state
  const [editOpen, setEditOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);

  // Delete confirmation state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [headId, setHeadId] = useState("");

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = {
      name,
      description,
      headId,
    };

    const model = Department.fromJsonModel(formData);

    if (selectedDepartment) {
      // Update
      await service.updateDepartment(selectedDepartment.id, model);
    } else {
      // Create
      await service.addDepartment(model);
    }

    await refetchDepartments();
    setEditOpen(false);
    setSelectedDepartment(null);

    // Clear form
    setName("");
    setDescription("");
    setHeadId("");
  }

  async function handleEdit(department: Department) {
    setSelectedDepartment(department);
    setEditOpen(true);
  }

  async function handleDelete(id: string) {
    setDeleteId(id);
    setDeleteOpen(true);
  }

  const columns = getDepartmentColumns(handleEdit, handleDelete);

  // Populate edit form when selectedDepartment changes
  useEffect(() => {
    if (!selectedDepartment) {
      // Clear form for create
      setName("");
      setDescription("");
      setHeadId("");
      return;
    }

    // Populate for edit
    setName(selectedDepartment.name);
    setDescription(selectedDepartment.description || "");
    setHeadId(selectedDepartment.headId);
  }, [selectedDepartment]);

  async function confirmDelete() {
    if (!deleteId) return;
    await service.deleteDepartment(deleteId);
    await refetchDepartments();
    setDeleteOpen(false);
    setDeleteId(null);
  }

  if (loadingDepartment) {
    return <div className="p-4 text-gray-500">Cargando departamentos...</div>;
  }

  if (errorDepartment) {
    return <div className="p-4 text-red-600">Error: {errorDepartment}</div>;
  }

  return (
    <div className="bg-white rounded-2xl items-start justify-start flex flex-col gap-2 p-4">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <p className="text-[#0f172a] text-[1.25rem] leading-7">
            Departamentos
          </p>
        </div>
        <div>
          <Button
            onClick={() => {
              setSelectedDepartment(null);
              setEditOpen(true);
            }}
            className="bg-sky-600 text-white"
          >
            Nuevo Departamento
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
                  {selectedDepartment
                    ? "Editar Departamento"
                    : "Registrar nuevo departamento"}
                </DialogTitle>
                <DialogDescription>
                  {selectedDepartment
                    ? "Actualiza los datos del departamento seleccionado."
                    : "Ingresa los datos para el nuevo departamento."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <label htmlFor="name">Titulo</label>
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
                  <label htmlFor="headId">Jefe del departamento:</label>
                  <Input
                    className="border border-gray-400 p-2"
                    id="headId"
                    type="text"
                    value={headId}
                    onChange={(e) => setHeadId(e.target.value)}
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
                ¿Estás seguro que deseas eliminar este departamento? Esta acción no se
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
          filterPlaceholder="Filtrar por departamento..."
        />
      </div>
    </div>
  );
};

export default DepartmentPage;
