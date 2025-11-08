import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { getInventoryColumns } from "./inventoryColumns";
import Inventory from "@/entities/inventory.model";
import { DataTable } from "@/components/dataTable";
import { useInventoryContext } from "@/context/InventoryContext";
import InventoryService from "@/services/inventory.service";
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

const service = new InventoryService();

const InventoryPage: React.FC = () => {
  const {
    inventories: data,
    loadingInventory,
    errorInventory,
    fetchInventories,
    refetchInventories,
  } = useInventoryContext();

  // Edit dialog state
  const [editOpen, setEditOpen] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState<Inventory | null>(
    null
  );

  // Delete confirmation state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form states
  const [departmentId, setDepartmentId] = useState("");
  const [medicationId, setMedicationId] = useState("");
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    fetchInventories();
  }, [fetchInventories]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = {
      departmentId,
      medicationId,
      quantity,
    };

    const model = Inventory.fromJsonModel(formData);

    if (selectedInventory) {
      // Update
      await service.updateInventory(selectedInventory.id, model);
    } else {
      // Create
      await service.addInventory(model);
    }

    await refetchInventories();
    setEditOpen(false);
    setSelectedInventory(null);

    // Clear form
    setDepartmentId("");
    setMedicationId("");
    setQuantity(0);
  }

  async function handleEdit(inventory: Inventory) {
    setSelectedInventory(inventory);
    setEditOpen(true);
  }

  async function handleDelete(id: string) {
    setDeleteId(id);
    setDeleteOpen(true);
  }

  const columns = getInventoryColumns(handleEdit, handleDelete);

  const lowStockItems = data.filter((item) => item.quantity < 50);

  // Populate edit form when selectedInventory changes
  useEffect(() => {
    if (!selectedInventory) {
      // Clear form for create
      setDepartmentId("");
      setMedicationId("");
      setQuantity(0);
      return;
    }

    // Populate for edit
    setDepartmentId(selectedInventory.departmentId);
    setMedicationId(selectedInventory.medicationId || "");
    setQuantity(selectedInventory.quantity);
  }, [selectedInventory]);

  async function confirmDelete() {
    if (!deleteId) return;
    await service.deleteInventory(deleteId);
    await refetchInventories();
    setDeleteOpen(false);
    setDeleteId(null);
  }

  if (loadingInventory) {
    return <div className="p-4 text-gray-500">Cargando inventario...</div>;
  }

  if (errorInventory) {
    return <div className="p-4 text-red-600">Error: {errorInventory}</div>;
  }

  return (
    <div className="bg-white h-full rounded-2xl items-start justify-start flex flex-col gap-2 p-4">
      <div className="w-full flex flex-row items-center justify-between">
        <div>
          <p className="text-[#0f172a] text-[1.25rem] leading-7">Inventarios</p>
          <p className="text-gray-500">
            Alertas de bajo stock: {lowStockItems.length}
          </p>
        </div>
        <div>
          <Button
            onClick={() => {
              setSelectedInventory(null);
              setEditOpen(true);
            }}
            className="bg-sky-600 text-white"
          >
            Nuevo Inventario
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
                  {selectedInventory
                    ? "Editar Inventario"
                    : "Registrar nuevo inventario"}
                </DialogTitle>
                <DialogDescription>
                  {selectedInventory
                    ? "Actualiza los datos del inventario seleccionado."
                    : "Ingresa los datos para el nuevo inventario."}
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
                  <label htmlFor="medicationId">Medicamento</label>
                  <Input
                    id="medicationId"
                    value={medicationId}
                    onChange={(e) => setMedicationId(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="editQuantity">Cantidad:</label>
                  <Input
                    className="border border-gray-400 p-2"
                    id="editQuantity"
                    type="number"
                    value={quantity === 0 ? "" : quantity}
                    min={0}
                    onChange={(e) => setQuantity(Number(e.target.value))}
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
                ¿Estás seguro que deseas eliminar este inventario? Esta acción no se
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
          filterColumn="medicationId"
          filterPlaceholder="Filtrar por medicamento..."
        />
      </div>
    </div>
  );
};

export default InventoryPage;
