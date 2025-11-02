import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import type Inventory from "@/entities/inventory.model";

export function getInventoryColumns(
  handleEdit: (inventory: Inventory) => void,
  handleDelete: (id: string) => void
): ColumnDef<Inventory>[] {
  return [
    {
      accessorKey: "departmentId",
      header: "Departamento",
      cell: ({ row }) => <div>{row.getValue("departmentId")}</div>,
    },
    {
      accessorKey: "medicationId",
      header: "Medicamento",
      cell: ({ row }) => <div>{row.getValue("medicationId")}</div>,
    },
    {
      accessorKey: "quantity",
      header: "Cantidad",
      cell: ({ row }) => {
        const qty = row.getValue("quantity") as number;
        const variant =
          qty > 100
            ? "bg-green-500"
            : qty > 50
            ? "bg-yellow-500"
            : "bg-red-500";
        return (
          <Badge className={`${variant} text-white font-medium`}>
            {qty}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdBy",
      header: "Creado por",
      cell: ({ row }) => <div>{row.getValue("createdBy")}</div>,
    },
    {
      accessorKey: "updatedBy",
      header: "Actualizado por",
      cell: ({ row }) => <div>{row.getValue("updatedBy")}</div>,
    },
    {
      accessorKey: "createdAt",
      header: "Creado",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        return date.toLocaleDateString("es-NI", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Actualizado",
      cell: ({ row }) => {
        const date = new Date(row.getValue("updatedAt"));
        return date.toLocaleDateString("es-NI", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      },
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const inventory = row.original;
        return (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleEdit(inventory)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDelete(inventory.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}
