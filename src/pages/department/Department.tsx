import { Button } from "@/components/ui/button";
import React from "react";
import { getDepartmentColumns } from "./departmentColumns";
import { departmentData as data } from "@/data/department.data";
import { DataTable } from "@/components/dataTable";
import type Department from "@/entities/department.model";

const DepartmentPage: React.FC = () => {
  function handleEdit(department: Department) {
    console.log("Editar department:", department);
  }

  function handleDelete(id: string) {
    console.log("Eliminar inentory con ID:", id);
  }

  const columns=getDepartmentColumns(handleEdit, handleDelete);

  return (
    <div className="bg-white h-full rounded-2xl items-start justify-start flex flex-col gap-2 p-4">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <p className="text-[#0f172a] text-[1.25rem] leading-7">
            Departamentos
          </p>
        </div>
        <div>
          <Button className="bg-sky-600 text-white">Nuevo Departamento</Button>
        </div>
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
