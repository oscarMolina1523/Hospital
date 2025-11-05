import BaseModel from "./base.model";

export class Medication extends BaseModel {
  name: string;
  description: string;
  expirationDate?: Date;
  unit: string; // "tableta", "ml", etc.
  active: boolean;

  constructor({
    id,
    name,
    description,
    expirationDate,
    unit,
    active,
  }: {
    id: string;
    name: string;
    description: string;
    expirationDate?: Date;
    unit: string;
    active: boolean;
  }) {
    super(id);
    this.name = name;
    this.description = description;
    this.expirationDate = expirationDate;
    this.unit = unit;
    this.active = active;
  }

  static fromJson(json: any): Medication {
    const id = String(json["id"] || "");
    const name = String(json["name"] || "");
    const description = String(json["description"] || "");
    const expirationDate = json["expirationDate"] ? new Date(json["expirationDate"]) : undefined;
    const unit = String(json["unit"] || "");
    const active = Boolean(json["active"]);

    return new Medication({
      id,
      name,
      description,
      expirationDate,
      unit,
      active,
    });
  }

  static fromJsonModel(json: any): Medication {
    const id = String(json["id"] || "");
    const name = String(json["name"] || "");
    const description = String(json["description"] || "");
    const expirationDate = json["expirationDate"] ? new Date(json["expirationDate"]) : undefined;
    const unit = String(json["unit"] || "");
    const active = Boolean(json["active"]);

    return new Medication({
      id,
      name,
      description,
      expirationDate,
      unit,
      active,
    });
  }

  toJsonDTO() {
    return {
      name: this.name,
      description: this.description,
      expirationDate: this.expirationDate ? this.expirationDate.toISOString() : undefined,
      unit: this.unit,
      active: this.active,
    };
  }
}
