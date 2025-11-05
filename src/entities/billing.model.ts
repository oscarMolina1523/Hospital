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
  createdAt?: Date;
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
    createdAt?: Date;
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

  static fromJson(json: any): Billing {
    const id = String(json["id"] || "");
    const patientId = String(json["patientId"] || "");
    const appointmentId = json["appointmentId"]
      ? String(json["appointmentId"])
      : undefined;
    const serviceId = String(json["serviceId"] || "");
    const departmentId = String(json["departmentId"] || "");
    const amount = Number(json["amount"] || 0);
    const status = (json["status"] as BillingStatus) || BillingStatus.PENDING;
    const paymentMethod = (json["paymentMethod"] as Payment) || Payment.CASH;
    const createdAt = json["createdAt"]
      ? new Date(json["createdAt"])
      : new Date();
    const paidAt = json["paidAt"] ? new Date(json["paidAt"]) : undefined;

    return new Billing({
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
    });
  }

  static fromJsonModel(json: any): Billing {
    const id = String(json["id"] || "");
    const patientId = String(json["patientId"] || "");
    const appointmentId = json["appointmentId"]
      ? String(json["appointmentId"])
      : undefined;
    const serviceId = String(json["serviceId"] || "");
    const departmentId = String(json["departmentId"] || "");
    const amount = Number(json["amount"] || 0);
    const status = (json["status"] as BillingStatus) || BillingStatus.PENDING;
    const paymentMethod = (json["paymentMethod"] as Payment) || Payment.CASH;
    const paidAt = json["paidAt"] ? new Date(json["paidAt"]) : undefined;

    return new Billing({
      id,
      patientId,
      appointmentId,
      serviceId,
      departmentId,
      amount,
      status,
      paymentMethod,
      paidAt,
    });
  }

  toJsonDTO() {
    return {
      patientId: this.patientId,
      appointmentId: this.appointmentId,
      serviceId: this.serviceId,
      departmentId: this.departmentId,
      amount: this.amount,
      status: this.status,
      paymentMethod: this.paymentMethod,
      paidAt: this.paidAt ? this.paidAt.toISOString() : undefined,
    };
  }
}
