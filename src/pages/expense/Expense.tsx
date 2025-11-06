import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { getExpenseColumns } from "./expenseColumns";
import type Expense from "@/entities/expense.model";
import { DataTable } from "@/components/dataTable";
import { useExpenseContext } from "@/context/ExpenseContext";

const ExpensePage: React.FC = () => {
  const {
    expenses: data,
    loadingExpense,
    errorExpense,
    fetchExpenses,
  } = useExpenseContext();

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  function handleEdit(expense: Expense) {
    console.log("Editar expense:", expense);
  }

  function handleDelete(id: string) {
    console.log("Eliminar expense con ID:", id);
  }

  const columns = getExpenseColumns(handleEdit, handleDelete);

  if (loadingExpense) {
    return <div className="p-4 text-gray-500">Cargando gastos...</div>;
  }

  if (errorExpense) {
    return <div className="p-4 text-red-600">Error: {errorExpense}</div>;
  }

  return (
    <div className="bg-white h-full rounded-2xl items-start justify-start flex flex-col gap-2 p-4">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <p className="text-[#0f172a] text-[1.25rem] leading-7">Gastos</p>
        </div>
        <div>
          <Button className="bg-sky-600 text-white">Nuevo Gasto</Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 w-full h-24">
        <div className="border border-gray-300 rounded-2xl text-left flex flex-col gap-2 p-4">
          <span className="text-[#475569] ">Gastos del mes</span>
          <span className="font-semibold text-[1.5rem]">C$1000</span>
        </div>
        <div className="border border-gray-300 rounded-2xl text-left flex flex-col gap-2 p-4">
          <span className="text-[#475569] ">Categoria Principal</span>
          <span className="font-semibold text-[1.5rem]">C$150</span>
        </div>
        <div className="border border-gray-300 rounded-2xl text-left flex flex-col gap-2 p-4">
          <span className="text-[#475569] ">Gasto promedio</span>
          <span className="font-semibold text-[1.5rem]">C$1800</span>
        </div>
      </div>
      {/* table */}
      <div className="mt-6 w-full">
        <DataTable
          columns={columns}
          data={data}
          filterColumn="departmentId"
          filterPlaceholder="Filtrar por departamento..."
        />
      </div>
    </div>
  );
};

export default ExpensePage;
