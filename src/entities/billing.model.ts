import BaseModel from "./base.model";
import { BillingStatus } from "./billingStatus.enum";
import { Payment } from "./payment.enum";

export default class Billing extends BaseModel {
  patientId: string;
  appointmentId?: string;
  serviceId: string;
  departmentId: string;
  amount: number; // Monto total (calculado)
  status: BillingStatus;
  paymentMethod: Payment;
  createdAt: Date;
  paidAt?: Date;

  constructor({
    id,
    patientId,
    appointmentId,
    serviceId,
    departmentId,
    amount,
    status,
    paymentMethod,
    createdAt,
    paidAt,
  }: {
    id: string;
    patientId: string;
    appointmentId?: string;
    serviceId: string;
    departmentId: string;
    amount: number;
    status: BillingStatus;
    paymentMethod: Payment;
    createdAt: Date;
    paidAt?: Date;
  }) {
    super(id);
    this.patientId = patientId;
    this.appointmentId = appointmentId;
    this.serviceId = serviceId;
    this.departmentId = departmentId;
    this.amount = amount;
    this.status = status;
    this.paymentMethod = paymentMethod;
    this.createdAt = createdAt;
    this.paidAt = paidAt;
  }
}
