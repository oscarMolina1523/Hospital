import { AppointmentStatus } from "../../../Domain.Endpoint/entities/appointment.enum";

export interface AppointmentRequest {
  patientId: string;
  departmentId: string;
  doctorId: string;
  scheduledAt: Date;
  status: AppointmentStatus;
  notes: string;
}
