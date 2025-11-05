import { Action } from "./action.enum";
import BaseModel from "./base.model";

export default class AuditLog extends BaseModel {
  entity: string; // User, Patient, Appointment, InventoryItem
  entityId: string;
  action: Action;
  changes: string; // Detalle de cambios
  performedBy: string;
  performedAt: Date;

  constructor({
    id,
    entity,
    entityId,
    action,
    changes,
    performedAt,
    performedBy,
  }: {
    id: string;
    entity: string;
    entityId: string;
    action: Action;
    changes: string;
    performedAt: Date;
    performedBy: string;
  }) {
    super(id);
    this.entity = entity;
    this.entityId = entityId;
    this.action = action;
    this.changes = changes;
    this.performedAt = performedAt;
    this.performedBy = performedBy;
  }

  // Crea una instancia desde el JSON crudo del backend
  static fromJson(json: any): AuditLog {
    const id = String(json["id"] || "");
    const entity = String(json["entity"] || "");
    const entityId = String(json["entityId"] || "");
    const action = (json["action"] as Action) || Action.VIEW;
    const changes = String(json["changes"] || "");
    const performedAt = json["performedAt"] ? new Date(json["performedAt"]) : new Date();
    const performedBy = String(json["performedBy"] || "");

    return new AuditLog({
      id,
      entity,
      entityId,
      action,
      changes,
      performedAt,
      performedBy,
    });
  }
}
