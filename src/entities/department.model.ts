import BaseModel from "./base.model";

export default class Department extends BaseModel {
  name: string; // Cirugía, Pediatría, etc.
  description: string;
  headId: string; 
  createdAt?: Date;
  updatedAt?: Date;

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
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    super(id);
    this.name = name;
    this.description = description;
    this.headId = headId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json: any): Department {
    const id = String(json["id"] || "");
    const name = String(json["name"] || "");
    const description = String(json["description"] || "");
    const headId = String(json["headId"] || "");
    const createdAt = json["createdAt"] ? new Date(json["createdAt"]) : undefined;
    const updatedAt = json["updatedAt"] ? new Date(json["updatedAt"]) : undefined;

    return new Department({
      id,
      name,
      description,
      headId,
      createdAt,
      updatedAt,
    });
  }

  static fromJsonModel(json: any): Department {
    const id = String(json["id"] || "");
    const name = String(json["name"] || "");
    const description = String(json["description"] || "");
    const headId = String(json["headId"] || "");

    return new Department({
      id,
      name,
      description,
      headId,
    });
  }

  toJsonDTO() {
    return {
      name: this.name,
      description: this.description,
      headId: this.headId,
    };
  }
}
