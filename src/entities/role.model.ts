import BaseModel from "./base.model";

export default class Role extends BaseModel {
  name: string; // CEO, Junta, JefeDepto, Medico, Enfermero, Auxiliar, Admin
  description: string;
  hierarchyLevel: number; // Para determinar jerarquía ej: 1-CEO, 2-Junta, 3-JefeDepto, 4-Medico, 5-Enfermero, 6-Auxiliar, 7-Admin
  createdAt?: Date;
  updatedAt?: Date;

  constructor({
    id,
    name,
    description,
    hierarchyLevel,
    createdAt,
    updatedAt,
  }: {
    id: string;
    description: string;
    name: string;
    hierarchyLevel: number;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    super(id);
    this.description = description;
    this.name = name;
    this.hierarchyLevel = hierarchyLevel;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json: any): Role {
    const id = String(json["id"] || "");
    const name = String(json["name"] || "");
    const description = String(json["description"] || "");
    const hierarchyLevel = Number(json["hierarchyLevel"] || 0);
    const createdAt = json["createdAt"] ? new Date(json["createdAt"]) : undefined;
    const updatedAt = json["updatedAt"] ? new Date(json["updatedAt"]) : undefined;

    return new Role({
      id,
      name,
      description,
      hierarchyLevel,
      createdAt,
      updatedAt,
    });
  }

  static fromJsonModel(json: any): Role {
    const id = String(json["id"] || "");
    const name = String(json["name"] || "");
    const description = String(json["description"] || "");
    const hierarchyLevel = Number(json["hierarchyLevel"] || 0);

    return new Role({
      id,
      name,
      description,
      hierarchyLevel,
    });
  }

  toJsonDTO() {
    return {
      name: this.name,
      description: this.description,
      hierarchyLevel: this.hierarchyLevel,
    };
  }
}
