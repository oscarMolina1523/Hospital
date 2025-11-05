import AuditLog from "@/entities/auditLog.model";
import HTTPService from "./http-service";

export default class AuditLogService extends HTTPService {
  private path: string;

  constructor() {
    super();
    this.path = "logs";
  }

  async getAuditLogs(): Promise<AuditLog[]> {
    const response = await super.get(this.path);
    const data = response.data || [];
    return data.map((item: any) => AuditLog.fromJson(item));
  }

}
