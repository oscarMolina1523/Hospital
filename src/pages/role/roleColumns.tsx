import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import type Role from "@/entities/role.model";

export function getRoleColumns(
  handleEdit: (role: Role) => void,
  handleDelete: (id: string) => void
): ColumnDef<Role>[] {
  return [
    {
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Descripción",
      cell: ({ row }) => (
        <div className="whitespace-normal text-left wrap-break-word max-w-xs">
          {row.getValue("description")}
        </div>
      ),
    },
    {
      accessorKey: "hierarchyLevel",
      header: "Nivel Jerárquico",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("hierarchyLevel")}</div>
      ),
    },
    // {
    //   accessorKey: "createdAt",
    //   header: "Creado",
    //   cell: ({ row }) => {
    //     const date = new Date(row.getValue("createdAt"));
    //     return date.toLocaleDateString("es-NI", {
    //       weekday: "short",
    //       day: "2-digit",
    //       month: "short",
    //       year: "numeric",
    //     });
    //   },
    // },
    // {
    //   accessorKey: "updatedAt",
    //   header: "Actualizado",
    //   cell: ({ row }) => {
    //     const date = new Date(row.getValue("updatedAt"));
    //     return date.toLocaleDateString("es-NI", {
    //       weekday: "short",
    //       day: "2-digit",
    //       month: "short",
    //       year: "numeric",
    //     });
    //   },
    // },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const role = row.original;
        return (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleEdit(role)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDelete(role.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}
