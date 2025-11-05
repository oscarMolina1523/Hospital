import Billing from "@/entities/billing.model";
import HTTPService from "./http-service";

export default class BillingService extends HTTPService {
  private path: string;

  constructor() {
    super();
    this.path = "billings";
  }

  async getBillings(): Promise<Billing[]> {
    const response = await super.get(this.path);
    const data = response.data || [];
    return data.map((item: any) => Billing.fromJson(item));
  }

  async getById(id: string): Promise<Billing | null> {
    const response = await super.get(`${this.path}/${id}`);
    if (!response) return null;

    return Billing.fromJson(response);
  }

  async addBilling(billing: Billing): Promise<Billing | null> {
    const body = Billing.fromJsonModel(billing).toJsonDTO();
    const response = await super.post(this.path, body);

    if (!response) return null;
    return Billing.fromJson(response);
  }

  async updateBilling(id: string, billing: Billing): Promise<Billing | null> {
    const body = Billing.fromJsonModel(billing).toJsonDTO();
    const response = await super.put(`${this.path}/${id}`, body);

    if (!response) return null;
    return Billing.fromJson(response);
  }

  async deleteBilling(id: string): Promise<void> {
    await super.delete(`${this.path}/${id}`);
  }
}
