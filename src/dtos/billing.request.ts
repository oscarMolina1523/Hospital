import { BillingStatus } from "../../../Domain.Endpoint/entities/billingStatus.enum";
import { Payment } from "../../../Domain.Endpoint/entities/payment.enum";

export interface BillingRequest {
  patientId: string;
  appointmentId?: string;
  serviceId: string;
  departmentId: string;
  amount: number; // Monto total (calculado)
  status: BillingStatus;
  paymentMethod: Payment;
  paidAt?: Date;
}
