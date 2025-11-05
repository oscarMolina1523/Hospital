import KPI from "@/entities/kpi.model";
import HTTPService from "./http-service";

export default class KPIService extends HTTPService {
  private path: string;

  constructor() {
    super();
    this.path = "kpis";
  }

  async getKPIs(): Promise<KPI[]> {
    const response = await super.get(this.path);
    const data = response.data || [];
    return data.map((item: any) => KPI.fromJson(item));
  }
}
