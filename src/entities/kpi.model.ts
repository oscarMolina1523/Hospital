import BaseModel from "./base.model";

export default class KPI extends BaseModel {
  departmentId?: string; // Null si global
  name: string; // Crecimiento de pacientes, ingresos, stock crítico
  value: number;
  metricDate: Date;
  createdAt: Date;
  createdBy: string;

  constructor({
    id,
    name,
    departmentId,
    value,
    metricDate,
    createdAt,
    createdBy,
  }: {
    id: string;
    name: string;
    departmentId?: string;
    value: number;
    metricDate: Date;
    createdAt: Date;
    createdBy: string;
  }) {
    super(id);
    this.name = name;
    this.departmentId = departmentId;
    this.value = value;
    this.metricDate = metricDate;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
  }
}
