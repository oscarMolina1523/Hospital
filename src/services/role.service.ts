import Role from "@/entities/role.model";
import HTTPService from "./http-service";

export default class RoleService extends HTTPService {
  private path: string;

  constructor() {
    super();
    this.path = "roles";
  }

  async getRoles(): Promise<Role[]> {
    const response = await super.get(this.path);
    const data = response.data || [];
    return data.map((item: any) => Role.fromJson(item));
  }

  async getById(id: string): Promise<Role | null> {
    const response = await super.get(`${this.path}/${id}`);
    if (!response) return null;

    return Role.fromJson(response);
  }

  async addRole(role: Role): Promise<Role | null> {
    const body = Role.fromJsonModel(role).toJsonDTO();
    const response = await super.post(this.path, body);

    if (!response) return null;
    return Role.fromJson(response);
  }

  async updateRole(id: string, role: Role): Promise<Role | null> {
    const body = Role.fromJsonModel(role).toJsonDTO();
    const response = await super.put(`${this.path}/${id}`, body);

    if (!response) return null;
    return Role.fromJson(response);
  }

  async deleteRole(id: string): Promise<void> {
    await super.delete(`${this.path}/${id}`);
  }
}
