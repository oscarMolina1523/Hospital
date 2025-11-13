import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { getRoleColumns } from "./roleColumns";
import Role from "@/entities/role.model";
import { DataTable } from "@/components/dataTable";
import { useRoleContext } from "@/context/RoleContext";
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
import RoleService from "@/services/role.service";

const service = new RoleService();

const RolePage: React.FC = () => {
  const {
    roles: data,
    loadingRole,
    errorRole,
    fetchRoles,
    refetchRoles,
  } = useRoleContext();

  // Edit dialog state
  const [editOpen, setEditOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  // Delete confirmation state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [hierarchyLevel, setHierarchyLevel] = useState(0);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = {
      name,
      description,
      hierarchyLevel,
    };

    const model = Role.fromJsonModel(formData);

    if (selectedRole) {
      // Update
      await service.updateRole(selectedRole.id, model);
    } else {
      // Create
      await service.addRole(model);
    }

    await refetchRoles();
    setEditOpen(false);
    setSelectedRole(null);

    // Clear form
    setName("");
    setDescription("");
    setHierarchyLevel(0);
  }

  async function handleEdit(role: Role) {
    setSelectedRole(role);
    setEditOpen(true);
  }

  async function handleDelete(id: string) {
    setDeleteId(id);
    setDeleteOpen(true);
  }

  const columns = getRoleColumns(handleEdit, handleDelete);

  // Populate edit form when selectedRole changes
  useEffect(() => {
    if (!selectedRole) {
      // Clear form for create
      setName("");
      setDescription("");
      setHierarchyLevel(0);
      return;
    }

    // Populate for edit
    setName(selectedRole.name);
    setDescription(selectedRole.description || "");
    setHierarchyLevel(selectedRole.hierarchyLevel);
  }, [selectedRole]);

  async function confirmDelete() {
    if (!deleteId) return;
    await service.deleteRole(deleteId);
    await refetchRoles();
    setDeleteOpen(false);
    setDeleteId(null);
  }

  if (loadingRole) {
    return <div className="p-4 text-gray-500">Cargando roles...</div>;
  }

  if (errorRole) {
    return <div className="p-4 text-red-600">Error: {errorRole}</div>;
  }

  return (
    <div className="p-4 rounded-2xl bg-white w-full flex flex-col gap-2">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <p className="text-[#0f172a] text-[1.25rem] leading-7">Roles</p>
        </div>
        <div>
          <Button
            onClick={() => {
              setSelectedRole(null);
              setEditOpen(true);
            }}
            className="bg-sky-600 text-white"
          >
            Nuevo rol
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
                  {selectedRole ? "Editar Role" : "Registrar nuevo role"}
                </DialogTitle>
                <DialogDescription>
                  {selectedRole
                    ? "Actualiza los datos del role seleccionado."
                    : "Ingresa los datos para el nuevo rol."}
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
                  <label htmlFor="hierarchyLevel">Nivel de jerarquia:</label>
                  <Input
                    className="border border-gray-400 p-2"
                    id="hierarchyLevel"
                    type="number"
                    value={hierarchyLevel === 0 ? "" : hierarchyLevel}
                    min={0}
                    onChange={(e) => setHierarchyLevel(Number(e.target.value))}
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
                ¿Estás seguro que deseas eliminar este rol? Esta acción
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
      <div className="mt-6">
        <DataTable
          columns={columns}
          data={data}
          filterColumn="name"
          filterPlaceholder="Filtrar por role..."
        />
      </div>
    </div>
  );
};

export default RolePage;
