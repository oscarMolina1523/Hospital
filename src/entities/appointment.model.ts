import { AppointmentStatus } from "./appointment.enum";
import BaseModel from "./base.model";

export default class Appointment extends BaseModel {
  patientId: string; 
  departmentId: string; 
  doctorId: string; 
  scheduledAt: Date;
  status: AppointmentStatus;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;

  constructor({
    id,
    patientId,
    departmentId,
    doctorId,
    scheduledAt,
    status,
    notes,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
  }: {
    id: string;
    patientId: string;
    departmentId: string;
    doctorId: string;
    scheduledAt: Date;
    status: AppointmentStatus;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
  }) {
    super(id);
    this.patientId = patientId;
    this.departmentId = departmentId;
    this.doctorId = doctorId;
    this.scheduledAt = scheduledAt;
    this.status = status;
    this.notes = notes;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  }
}
