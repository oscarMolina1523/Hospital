import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import type { Medication } from "@/entities/medication.model";

export function getMedicationColumns(
  handleEdit: (medication: Medication) => void,
  handleDelete: (id: string) => void
): ColumnDef<Medication>[] {
  return [
    {
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "description",
      header: "Descripción",
      cell: ({ row }) => (
        <div className="text-sm text-gray-700 line-clamp-2 max-w-xs">
          {row.getValue("description")}
        </div>
      ),
    },
    {
      accessorKey: "unit",
      header: "Unidad",
      cell: ({ row }) => (
        <Badge className="bg-blue-500 text-white capitalize">
          {row.getValue("unit")}
        </Badge>
      ),
    },
    {
      accessorKey: "expirationDate",
      header: "Vencimiento",
      cell: ({ row }) => {
        const date = new Date(row.getValue("expirationDate"));
        const formatted = date.toLocaleDateString("es-NI", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

        // Marcar si ya venció o está por vencer
        const today = new Date();
        const isExpired = date < today;
        const daysDiff = Math.ceil(
          (date.getTime() - today.getTime()) / (1000 * 3600 * 24)
        );
        const isNearExpiration = daysDiff <= 30 && daysDiff > 0;

        let color = "bg-green-500";
        if (isNearExpiration) color = "bg-yellow-500";
        if (isExpired) color = "bg-red-500";

        return (
          <Badge className={`${color} text-white`}>
            {isExpired ? "Vencido" : formatted}
          </Badge>
        );
      },
    },
    {
      accessorKey: "active",
      header: "Estado",
      cell: ({ row }) => {
        const active = row.getValue("active") as boolean;
        return (
          <Badge
            variant={active ? "default" : "destructive"}
            className={active ? "bg-green-600" : "bg-red-600"}
          >
            {active ? "Activo" : "Inactivo"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const medication = row.original;
        return (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleEdit(medication)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDelete(medication.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}
