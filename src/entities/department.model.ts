import BaseModel from "./base.model";

export default class Department extends BaseModel {
  name: string; // Cirugía, Pediatría, etc.
  description: string;
  headId: string; 
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    name,
    description,
    headId,
    createdAt,
    updatedAt,
  }: {
    id: string;
    name: string;
    description: string;
    headId: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    super(id);
    this.name = name;
    this.description = description;
    this.headId = headId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
