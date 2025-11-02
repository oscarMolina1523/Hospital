import { Button } from "@/components/ui/button";
import React from "react";
import { getRoleColumns } from "./roleColumns";
import { roleData as data } from "@/data/role.data";
import type Role from "@/entities/role.model";
import { DataTable } from "@/components/dataTable";

const RolePage: React.FC = () => {
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
