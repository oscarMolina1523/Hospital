import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { getRoleColumns } from "./roleColumns";
import type Role from "@/entities/role.model";
import { DataTable } from "@/components/dataTable";
import { useRoleContext } from "@/context/RoleContext";

const RolePage: React.FC = () => {
  const { roles: data, loadingRole, errorRole, fetchRoles } = useRoleContext();

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  function handleEdit(role: Role) {
    console.log("Editar role:", role);
    // Aquí puedes abrir un modal o navegar a otra ruta:
    // navigate(`/appointments/edit/${role.id}`)
  }

  function handleDelete(id: string) {
    console.log("Eliminar role con ID:", id);
    // Aquí puedes mostrar un confirm() o eliminar desde Firestore
  }

  const columns = getRoleColumns(handleEdit, handleDelete);

  if (loadingRole) {
    return <div className="p-4 text-gray-500">Cargando roles...</div>;
  }

  if (loadingRole) {
    return <div className="p-4 text-red-600">Error: {loadingRole}</div>;
  }

  return (
    <div className="p-4 rounded-2xl bg-white w-full flex flex-col gap-2">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <p className="text-[#0f172a] text-[1.25rem] leading-7">Roles</p>
        </div>
        <div>
          <Button className="bg-sky-600 text-white">Nuevo rol</Button>
        </div>
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
