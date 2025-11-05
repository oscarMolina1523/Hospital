import BaseModel from "./base.model";

export default class Inventory extends BaseModel {
  departmentId: string;
  medicationId: string;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;

  constructor({
    id,
    departmentId,
    medicationId,
    quantity,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
  }: {
    id: string;
    departmentId: string;
    medicationId: string;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
  }) {
    super(id);
    this.departmentId = departmentId;
    this.medicationId = medicationId;
    this.quantity = quantity;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  }

  static fromJson(json: any): Inventory {
    const id = String(json["id"] || "");
    const departmentId = String(json["departmentId"] || "");
    const medicationId = String(json["medicationId"] || "");
    const quantity = Number(json["quantity"] || 0);
    const createdAt = json["createdAt"] ? new Date(json["createdAt"]) : undefined;
    const updatedAt = json["updatedAt"] ? new Date(json["updatedAt"]) : undefined;
    const createdBy = json["createdBy"] ? String(json["createdBy"]) : undefined;
    const updatedBy = json["updatedBy"] ? String(json["updatedBy"]) : undefined;

    return new Inventory({
      id,
      departmentId,
      medicationId,
      quantity,
      createdAt,
      updatedAt,
      createdBy,
      updatedBy,
    });
  }

  static fromJsonModel(json: any): Inventory {
    const id = String(json["id"] || "");
    const departmentId = String(json["departmentId"] || "");
    const medicationId = String(json["medicationId"] || "");
    const quantity = Number(json["quantity"] || 0);

    return new Inventory({
      id,
      departmentId,
      medicationId,
      quantity,
    });
  }


  toJsonDTO() {
    return {
      departmentId: this.departmentId,
      medicationId: this.medicationId,
      quantity: this.quantity,
    };
  }
}
