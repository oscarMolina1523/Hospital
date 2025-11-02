import { Button } from "@/components/ui/button";
import React from "react";
import { getMedicalServiceColumns } from "./medicalServiceColumns";
import { medicalServiceData as data } from "@/data/medicalService.data";
import type MedicalService from "@/entities/medicalService.model";
import { DataTable } from "@/components/dataTable";

const MedicalServicePage: React.FC = () => {
  function handleEdit(medicalService: MedicalService) {
    console.log("Editar medicalService:", medicalService);
  }

  function handleDelete(id: string) {
    console.log("Eliminar inentory con ID:", id);
  }

  const columns = getMedicalServiceColumns(handleEdit, handleDelete);

  return (
    <div className="bg-white h-full rounded-2xl items-start justify-start flex flex-col gap-2 p-4">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <p className="text-[#0f172a] text-[1.25rem] leading-7">
            Servicios Medicos
          </p>
        </div>
        <div>
          <Button className="bg-sky-600 text-white">Nuevo Servicio</Button>
        </div>
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
