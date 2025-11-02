import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import type Expense from "@/entities/expense.model";
import { OperatingCosts } from "@/entities/operatingCosts.enum";

export function getExpenseColumns(
  handleEdit: (expense: Expense) => void,
  handleDelete: (id: string) => void
): ColumnDef<Expense>[] {
  return [
    {
      accessorKey: "departmentId",
      header: "Departamento",
      cell: ({ row }) => <div>{row.getValue("departmentId")}</div>,
    },
    {
      accessorKey: "description",
      header: "Descripción",
      cell: ({ row }) => <div>{row.getValue("description")}</div>,
    },
    {
      accessorKey: "category",
      header: "Categoría",
      cell: ({ row }) => {
        const category = row.getValue("category") as OperatingCosts;
        let variant = "bg-gray-500";
        switch (category) {
          case OperatingCosts.INVENTORY:
            variant = "bg-blue-500";
            break;
          case OperatingCosts.MAINTENANCE:
            variant = "bg-yellow-500";
            break;
          case OperatingCosts.SALARY:
            variant = "bg-green-500";
            break;
          case OperatingCosts.OTHER:
            variant = "bg-purple-500";
            break;
        }
        return <Badge className={variant}>{category}</Badge>;
      },
    },
    {
      accessorKey: "amount",
      header: "Monto",
      cell: ({ row }) => {
        const amount = row.getValue("amount") as number;
        const formatted = new Intl.NumberFormat("es-NI", {
          style: "currency",
          currency: "NIO",
        }).format(amount);
        return <div className="text-right font-medium">{formatted}</div>;
      },
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
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const expense = row.original;
        return (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleEdit(expense)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDelete(expense.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}
