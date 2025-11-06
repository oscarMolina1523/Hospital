import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { getBillingColumns } from "./billingColumns";
import type Billing from "@/entities/billing.model";
import { DataTable } from "@/components/dataTable";
import { useBillingContext } from "@/context/BillingContext";

export const BillingPage: React.FC = () => {
  const {
    billings: data,
    loadingBilling,
    errorBilling,
    fetchBillings,
  } = useBillingContext();

  useEffect(() => {
    fetchBillings();
  }, [fetchBillings]);

  function handleEdit(billing: Billing) {
    console.log("Editar factura:", billing);
  }

  function handleDelete(id: string) {
    console.log("Eliminar billing con ID:", id);
  }

  const columns = getBillingColumns(handleEdit, handleDelete);

  if (loadingBilling) {
    return <div className="p-4 text-gray-500">Cargando facturas...</div>;
  }

  if (errorBilling) {
    return <div className="p-4 text-red-600">Error: {errorBilling}</div>;
  }

  return (
    <div className="bg-white h-full rounded-2xl items-start justify-start flex flex-col gap-2 p-4">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <p className="text-[#0f172a] text-[1.25rem] leading-7">Facturación</p>
        </div>
        <div>
          <Button className="bg-sky-600 text-white">Nueva factura</Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 w-full h-24">
        <div className="border border-gray-300 rounded-2xl text-left flex flex-col gap-2 p-4">
          <span className="text-[#475569] ">Total facturado este mes</span>
          <span className="font-semibold text-[1.5rem]">C$1000</span>
        </div>
        <div className="border border-gray-300 rounded-2xl text-left flex flex-col gap-2 p-4">
          <span className="text-[#475569] ">Pendiente</span>
          <span className="font-semibold text-[1.5rem]">C$150</span>
        </div>
        <div className="border border-gray-300 rounded-2xl text-left flex flex-col gap-2 p-4">
          <span className="text-[#475569] ">Pagado</span>
          <span className="font-semibold text-[1.5rem]">C$1800</span>
        </div>
      </div>
      {/* table */}
      <div className="mt-6 w-full">
        <DataTable
          columns={columns}
          data={data}
          filterColumn="serviceId"
          filterPlaceholder="Filtrar por servicios..."
        />
      </div>
    </div>
  );
};

export default BillingPage;
