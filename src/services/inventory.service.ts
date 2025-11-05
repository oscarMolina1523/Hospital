import Inventory from "@/entities/inventory.model";
import HTTPService from "./http-service";

export default class InventoryService extends HTTPService {
  private path: string;

  constructor() {
    super();
    this.path = "inventories";
  }

  async getInventories(): Promise<Inventory[]> {
    const response = await super.get(this.path);
    const data = response.data || [];
    return data.map((item: any) => Inventory.fromJson(item));
  }

  async getById(id: string): Promise<Inventory | null> {
    const response = await super.get(`${this.path}/${id}`);
    if (!response) return null;

    return Inventory.fromJson(response);
  }

  async getAppointmentByDepartment() {
    const response = await super.get(`${this.path}/area`);
    const data = response.data || [];
    return data.map((item: any) => Inventory.fromJson(item));
  }

  async addInventory(inventory: Inventory): Promise<Inventory | null> {
    const body = Inventory.fromJsonModel(inventory).toJsonDTO();
    const response = await super.post(this.path, body);

    if (!response) return null;
    return Inventory.fromJson(response);
  }

  async updateInventory(
    id: string,
    inventory: Inventory
  ): Promise<Inventory | null> {
    const body = Inventory.fromJsonModel(inventory).toJsonDTO();
    const response = await super.put(`${this.path}/${id}`, body);

    if (!response) return null;
    return Inventory.fromJson(response);
  }

  async deleteInventory(id: string): Promise<void> {
    await super.delete(`${this.path}/${id}`);
  }
}
