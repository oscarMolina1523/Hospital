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
}