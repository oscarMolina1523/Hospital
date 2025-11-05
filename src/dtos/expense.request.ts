import { OperatingCosts } from "../../../Domain.Endpoint/entities/operatingCosts.enum";

export interface ExpenseRequest {
  departmentId: string;
  description: string; // "Compra de guantes quirúrgicos", "Pago técnico de mantenimiento"
  category: OperatingCosts;
  amount: number;
}
