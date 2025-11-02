import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import type Department from "@/entities/department.model";

export function getDepartmentColumns(
  handleEdit: (department: Department) => void,
  handleDelete: (id: string) => void,
  getUserNameById?: (id: string) => string // opcional: mostrar nombre del jefe
): ColumnDef<Department>[] {
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
      accessorKey: "headId",
      header: "Jefe de Departamento",
      cell: ({ row }) => {
        const headId = row.getValue("headId") as string | undefined;
        const displayName = getUserNameById
          ? getUserNameById(headId || "")
          : headId || "No asignado";

        return (
          <Badge
            className={
              headId
                ? "bg-blue-500 text-white capitalize"
                : "bg-gray-400 text-white"
            }
          >
            {displayName}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Creado",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        const formatted = date.toLocaleDateString("es-NI", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
        return <div>{formatted}</div>;
      },
    },
    // {
    //   accessorKey: "updatedAt",
    //   header: "Actualizado",
    //   cell: ({ row }) => {
    //     const date = new Date(row.getValue("updatedAt"));
    //     const formatted = date.toLocaleDateString("es-NI", {
    //       day: "2-digit",
    //       month: "short",
    //       year: "numeric",
    //     });
    //     return <div>{formatted}</div>;
    //   },
    // },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const department = row.original;
        return (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleEdit(department)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDelete(department.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}
