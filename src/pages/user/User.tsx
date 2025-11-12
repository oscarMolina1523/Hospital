import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { getUserColumns } from "./userColumns";
import { DataTable } from "@/components/dataTable";
import User from "@/entities/user.model";
import { useUserContext } from "@/context/UserContext";
import UserService from "@/services/user.service";
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

const service = new UserService();

const UserPage: React.FC = () => {
  const {
    users: data,
    loadingUser,
    errorUser,
    fetchUsers,
    refetchUsers,
  } = useUserContext();

  // Edit dialog state
  const [editOpen, setEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Delete confirmation state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Unified submit handler for create and edit
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = {
      username,
      email,
      password,
      roleId,
      departmentId,
    };

    const model = User.fromJsonModel(formData);

    if (selectedUser) {
      // Update
      await service.updateUser(selectedUser.id, model);
    } else {
      // Create
      await service.addUser(model);
    }

    await refetchUsers();
    setEditOpen(false);
    setSelectedUser(null);

    // Clear form
    setUsername("");
    setEmail("");
    setPassword("");
    setRoleId("");
    setDepartmentId("");
  }

  async function handleEdit(user: User) {
    setSelectedUser(user);
    setEditOpen(true);
  }

  async function handleDelete(id: string) {
    setDeleteId(id);
    setDeleteOpen(true);
  }

  const columns = getUserColumns(handleEdit, handleDelete);

  // Populate edit form when selectedUser changes
  useEffect(() => {
    if (!selectedUser) {
      // Clear form for create
      setUsername("");
      setEmail("");
      setPassword("");
      setRoleId("");
      setDepartmentId("");
      return;
    }

    // Populate for edit
    setUsername(selectedUser.username);
    setEmail(selectedUser.email);
    setPassword(selectedUser.password);
    setRoleId(selectedUser.roleId);
    setDepartmentId(selectedUser.departmentId || "");
  }, [selectedUser]);

  async function confirmDelete() {
    if (!deleteId) return;
    await service.deleteUser(deleteId);
    await refetchUsers();
    setDeleteOpen(false);
    setDeleteId(null);
  }

  if (loadingUser) {
    return <div className="p-4 text-gray-500">Cargando usuarios...</div>;
  }

  if (errorUser) {
    return <div className="p-4 text-red-600">Error: {errorUser}</div>;
  }

  return (
    <div className="bg-white rounded-2xl items-start justify-start flex flex-col gap-2 p-4">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <p className="text-[#0f172a] text-[1.25rem] leading-7">Usuarios</p>
        </div>
        <div>
          <Button
            onClick={() => {
              setSelectedUser(null);
              setEditOpen(true);
            }}
            className="bg-sky-600 text-white"
          >
            Nuevo Usuario
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
                  {selectedUser ? "Editar usuario" : "Nuevo usuario"}
                </DialogTitle>
                <DialogDescription>
                  {selectedUser
                    ? "Actualiza los datos del usuario seleccionada."
                    : "Ingresa los datos para el nuevo usuario."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <label htmlFor="username">Username</label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="email">Correo electronico</label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="password">Contraseña</label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="roleId">Role:</label>
                  <Input
                    id="roleId"
                    type="text"
                    value={roleId}
                    onChange={(e) => setRoleId(e.target.value)}
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
                ¿Estás seguro que deseas eliminar esta usuario? Esta acción no se
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
          filterColumn="username"
          filterPlaceholder="Filtrar por nombre de usuario..."
        />
      </div>
    </div>
  );
};

export default UserPage;
