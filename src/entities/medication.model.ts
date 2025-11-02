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
}
