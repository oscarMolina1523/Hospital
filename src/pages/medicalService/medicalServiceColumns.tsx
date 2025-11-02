import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import type MedicalService from "@/entities/medicalService.model";

export function getMedicalServiceColumns(
  handleEdit: (service: MedicalService) => void,
  handleDelete: (id: string) => void,
  getDepartmentNameById?: (id: string) => string // opcional para mostrar nombre del departamento
): ColumnDef<MedicalService>[] {
  return [
    {
      accessorKey: "name",
      header: "Servicio Médico",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "departmentId",
      header: "Departamento",
      cell: ({ row }) => {
        const departmentId = row.getValue("departmentId") as string | undefined;
        const departmentName = getDepartmentNameById
          ? getDepartmentNameById(departmentId || "")
          : departmentId || "No asignado";

        return (
          <Badge
            className={
              departmentId
                ? "bg-blue-500 text-white capitalize"
                : "bg-gray-400 text-white"
            }
          >
            {departmentName}
          </Badge>
        );
      },
    },
    {
      accessorKey: "baseCost",
      header: "Costo Base (USD)",
      cell: ({ row }) => {
        const cost = Number(row.getValue("baseCost"));
        return <div>${cost.toFixed(2)}</div>;
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
        const service = row.original;
        return (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleEdit(service)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDelete(service.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}
