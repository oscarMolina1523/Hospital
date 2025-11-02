import { Button } from "@/components/ui/button";
import React from "react";
import { getMedicationColumns } from "./medicationColumns";
import { medicationData as data } from "@/data/medication.data";
import type { Medication } from "@/entities/medication.model";
import { DataTable } from "@/components/dataTable";

const MedicationPage: React.FC = () => {
  function handleEdit(medication: Medication) {
    console.log("Editar medication:", medication);
  }

  function handleDelete(id: string) {
    console.log("Eliminar medication con ID:", id);
  }

  const columns = getMedicationColumns(handleEdit, handleDelete);

  return (
    <div className="bg-white h-full rounded-2xl items-start justify-start flex flex-col gap-2 p-4">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <p className="text-[#0f172a] text-[1.25rem] leading-7">
            Medicamentos
          </p>
        </div>
        <div>
          <Button className="bg-sky-600 text-white">Nuevo Medicamento</Button>
        </div>
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
