import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { getExpenseColumns } from "./expenseColumns";
import Expense from "@/entities/expense.model";
import { DataTable } from "@/components/dataTable";
import { useExpenseContext } from "@/context/ExpenseContext";
import { OperatingCosts } from "@/entities/operatingCosts.enum";
import ExpenseService from "@/services/expense.service";
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
import { useDepartmentContext } from "@/context/DepartmentContext";
import { useEntityMap } from "@/hooks/useEntityMap";

const service = new ExpenseService();

const ExpensePage: React.FC = () => {
  const {
    expenses: data,
    loadingExpense,
    errorExpense,
    fetchExpenses,
    refetchExpenses,
  } = useExpenseContext();

  const { departments } = useDepartmentContext();

  // Edit dialog state
  const [editOpen, setEditOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  // Delete confirmation state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form states
  const [description, setDescription] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [category, setCategory] = useState<OperatingCosts | "">("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = {
      departmentId,
      description,
      amount,
      category: category as OperatingCosts,
    };

    const model = Expense.fromJsonModel(formData);

    if (selectedExpense) {
      // Update
      await service.updateExpense(selectedExpense.id, model);
    } else {
      // Create
      await service.addExpense(model);
    }

    await refetchExpenses();
    setEditOpen(false);
    setSelectedExpense(null);

    // Clear form
    setDepartmentId("");
    setDescription("");
    setAmount(0);
    setCategory("");
  }

  async function handleEdit(expense: Expense) {
    setSelectedExpense(expense);
    setEditOpen(true);
  }

  async function handleDelete(id: string) {
    setDeleteId(id);
    setDeleteOpen(true);
  }

  const columns = getExpenseColumns(handleEdit, handleDelete);

  const departmentsMap = useEntityMap(departments, "id", "name");

  const enrichedData = React.useMemo(() => {
    return data.map((a) => ({
      ...a,
      departmentName: departmentsMap[a.departmentId] ?? a.departmentId,
    }));
  }, [data, departmentsMap]);

  // Populate edit form when selectedExpense changes
  useEffect(() => {
    if (!selectedExpense) {
      // Clear form for create
      setDepartmentId("");
      setDescription("");
      setAmount(0);
      setCategory("");
      return;
    }

    // Populate for edit
    setDepartmentId(selectedExpense.departmentId);
    setDescription(selectedExpense.description || "");
    setAmount(selectedExpense.amount);
    setCategory(selectedExpense.category);
  }, [selectedExpense]);

  async function confirmDelete() {
    if (!deleteId) return;
    await service.deleteExpense(deleteId);
    await refetchExpenses();
    setDeleteOpen(false);
    setDeleteId(null);
  }

  if (loadingExpense) {
    return <div className="p-4 text-gray-500">Cargando gastos...</div>;
  }

  if (errorExpense) {
    return <div className="p-4 text-red-600">Error: {errorExpense}</div>;
  }

  return (
    <div className="bg-white rounded-2xl items-start justify-start flex flex-col gap-2 p-4">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <p className="text-[#0f172a] text-[1.25rem] leading-7">Gastos</p>
        </div>
        <div>
          <Button
            onClick={() => {
              setSelectedExpense(null);
              setEditOpen(true);
            }}
            className="bg-sky-600 text-white"
          >
            Nuevo Gasto
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
                  {selectedExpense ? "Editar Gasto" : "Registrar nuevo gasto"}
                </DialogTitle>
                <DialogDescription>
                  {selectedExpense
                    ? "Actualiza los datos del gasto seleccionado."
                    : "Ingresa los datos para el nuevo gasto."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <label htmlFor="editDepartmentId">Departamento</label>
                  <Input
                    id="editDepartmentId"
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e.target.value)}
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
                  <label htmlFor="editCategory">Categoria</label>
                  <select
                    id="editCategory"
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value as OperatingCosts)
                    }
                    className="border rounded-md p-2"
                  >
                    {Object.values(OperatingCosts).map((statusOption) => (
                      <option key={statusOption} value={statusOption}>
                        {statusOption.charAt(0) +
                          statusOption.slice(1).toLowerCase()}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-3">
                  <label htmlFor="editAmount">Monto:</label>
                  <Input
                    className="border border-gray-400 p-2"
                    id="editAmount"
                    type="number"
                    value={amount === 0 ? "" : amount}
                    min={0}
                    onChange={(e) => setAmount(Number(e.target.value))}
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
                ¿Estás seguro que deseas eliminar este gasto? Esta acción no se
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
          data={enrichedData as unknown as Expense[]}
          filterColumn="departmentName"
          filterPlaceholder="Filtrar por departamento..."
        />
      </div>
    </div>
  );
};

export default ExpensePage;
