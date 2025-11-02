import BaseModel from "./base.model";
import { OperatingCosts } from "./operatingCosts.enum";

export default class Expense extends BaseModel {
  departmentId: string;
  description: string; // "Compra de guantes quirúrgicos", "Pago técnico de mantenimiento"
  category: OperatingCosts;
  amount: number;
  createdAt: Date;

  constructor({
    id,
    departmentId,
    description,
    category,
    amount,
    createdAt,
  }: {
    id: string;
    departmentId: string;
    description: string;
    category: OperatingCosts;
    amount: number;
    createdAt: Date;
  }) {
    super(id);
    this.departmentId = departmentId;
    this.description = description;
    this.category = category;
    this.amount = amount;
    this.createdAt = createdAt;
  }
}
