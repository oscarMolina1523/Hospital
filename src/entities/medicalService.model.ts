import BaseModel from "./base.model";

export default class MedicalService extends BaseModel{
  name: string;              // "Consulta general", "Ecografía", "Cirugía menor"
  departmentId: string;      
  baseCost: number;          
  active: boolean;

  constructor({id, name, departmentId, baseCost, active}:{id:string, name:string, departmentId:string, baseCost:number, active:boolean}) {
    super(id);
    this.name = name;
    this.departmentId = departmentId;
    this.baseCost = baseCost;
    this.active = active;
  }

  static fromJson(json: any): MedicalService {
    const id = String(json["id"] || "");
    const name = String(json["name"] || "");
    const departmentId = String(json["departmentId"] || "");
    const baseCost = Number(json["baseCost"] || 0);
    const active = Boolean(json["active"]);

    return new MedicalService({
      id,
      name,
      departmentId,
      baseCost,
      active,
    });
  }

  static fromJsonModel(json: any): MedicalService {
    const id = String(json["id"] || "");
    const name = String(json["name"] || "");
    const departmentId = String(json["departmentId"] || "");
    const baseCost = Number(json["baseCost"] || 0);
    const active = Boolean(json["active"]);

    return new MedicalService({
      id,
      name,
      departmentId,
      baseCost,
      active,
    });
  }

  toJsonDTO() {
    return {
      name: this.name,
      departmentId: this.departmentId,
      baseCost: this.baseCost,
      active: this.active,
    };
  }
}