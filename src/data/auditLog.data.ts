import { Action } from "@/entities/action.enum";
import AuditLog from "@/entities/auditLog.model";

const now = new Date();

export const auditLogData: AuditLog[] = [
  new AuditLog({
    id: "log-001",
    entity: "User",
    entityId: "u-001",
    action: Action.CREATE,
    changes: "Se creó el usuario 'Carlos Perez' con rol 'Doctor'.",
    performedBy: "u-000",
    performedAt: new Date(now.getTime() - 86400000), // hace 1 día
  }),
  new AuditLog({
    id: "log-002",
    entity: "Patient",
    entityId: "p-002",
    action: Action.UPDATE,
    changes: "Se actualizó la dirección y teléfono del paciente Ana Lopez.",
    performedBy: "u-003",
    performedAt: new Date(now.getTime() - 7200000), // hace 2 horas
  }),
  new AuditLog({
    id: "log-003",
    entity: "Appointment",
    entityId: "a-005",
    action: Action.DELETE,
    changes: "Se eliminó la cita programada para Carlos Gonzalez el 12/09/2025.",
    performedBy: "u-002",
    performedAt: new Date(now.getTime() - 3600000), // hace 1 hora
  }),
  new AuditLog({
    id: "log-004",
    entity: "InventoryItem",
    entityId: "inv-001",
    action: Action.UPDATE,
    changes: "Se ajustó la cantidad de guantes quirúrgicos de 150 a 120 unidades.",
    performedBy: "u-008",
    performedAt: new Date(now.getTime() - 5400000), // hace 1.5 horas
  }),
  new AuditLog({
    id: "log-005",
    entity: "Billing",
    entityId: "b-001",
    action: Action.UPDATE,
    changes: "Se cambió el estado de la factura de pendiente a pagado.",
    performedBy: "u-004",
    performedAt: now,
  }),
];
