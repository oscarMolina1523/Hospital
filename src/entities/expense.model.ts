import BaseModel from "./base.model";
import { OperatingCosts } from "./operatingCosts.enum";

export default class Expense extends BaseModel {
  departmentId: string;
  description: string; // "Compra de guantes quirúrgicos", "Pago técnico de mantenimiento"
  category: OperatingCosts;
  amount: number;
  createdAt?: Date;

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
    createdAt?: Date;
  }) {
    super(id);
    this.departmentId = departmentId;
    this.description = description;
    this.category = category;
    this.amount = amount;
    this.createdAt = createdAt;
  }

  static fromJson(json: any): Expense {
    const id = String(json["id"] || "");
    const departmentId = String(json["departmentId"] || "");
    const description = String(json["description"] || "");
    const category = (json["category"] as OperatingCosts) || OperatingCosts.INVENTORY;
    const amount = Number(json["amount"] || 0);
    const createdAt = json["createdAt"] ? new Date(json["createdAt"]) : undefined;

    return new Expense({
      id,
      departmentId,
      description,
      category,
      amount,
      createdAt,
    });
  }

  static fromJsonModel(json: any): Expense {
    const id = String(json["id"] || "");
    const departmentId = String(json["departmentId"] || "");
    const description = String(json["description"] || "");
    const category = (json["category"] as OperatingCosts) || OperatingCosts.INVENTORY;
    const amount = Number(json["amount"] || 0);

    return new Expense({
      id,
      departmentId,
      description,
      category,
      amount,
    });
  }

  toJsonDTO() {
    return {
      departmentId: this.departmentId,
      description: this.description,
      category: this.category,
      amount: this.amount,
    };
  }
}
