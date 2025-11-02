import { Button } from "@/components/ui/button";
import React from "react";
import { getInventoryColumns } from "./inventoryColumns";
import type Inventory from "@/entities/inventory.model";
import { DataTable } from "@/components/dataTable";
import { inventoryData as data } from "@/data/inventory.data";

const InventoryPage: React.FC = () => {
  function handleEdit(inventory: Inventory) {
    console.log("Editar inventory:", inventory);
  }

  function handleDelete(id: string) {
    console.log("Eliminar inentory con ID:", id);
  }

  const columns = getInventoryColumns(handleEdit, handleDelete);

  const lowStockItems = data.filter((item) => item.quantity < 50);

  return (
    <div className="bg-white h-full rounded-2xl items-start justify-start flex flex-col gap-2 p-4">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <p className="text-[#0f172a] text-[1.25rem] leading-7">Inventarios</p>
          <p className="text-gray-500">Alertas de bajo stock: {lowStockItems.length}</p>
        </div>
        <div>
          <Button className="bg-sky-600 text-white">Nuevo Inventario</Button>
        </div>
      </div>
      {/* table */}
      <div className="mt-6 w-full">
        <DataTable
          columns={columns}
          data={data}
          filterColumn="medicationId"
          filterPlaceholder="Filtrar por medicamento..."
        />
      </div>
    </div>
  );
};

export default InventoryPage;
