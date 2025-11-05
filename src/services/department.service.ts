import Department from "@/entities/department.model";
import HTTPService from "./http-service";

export default class DepartmentService extends HTTPService {
  private path: string;

  constructor() {
    super();
    this.path = "departments";
  }

  async getDepartments(): Promise<Department[]> {
    const response = await super.get(this.path);
    const data = response.data || [];
    return data.map((item: any) => Department.fromJson(item));
  }

  async getById(id: string): Promise<Department | null> {
    const response = await super.get(`${this.path}/${id}`);
    if (!response) return null;

    return Department.fromJson(response);
  }

  async addDepartment(department: Department): Promise<Department | null> {
    const body = Department.fromJsonModel(department).toJsonDTO();
    const response = await super.post(this.path, body);

    if (!response) return null;
    return Department.fromJson(response);
  }

  async updateDepartment(id: string, department: Department): Promise<Department | null> {
    const body = Department.fromJsonModel(department).toJsonDTO();
    const response = await super.put(`${this.path}/${id}`, body);

    if (!response) return null;
    return Department.fromJson(response);
  }

  async deleteDepartment(id: string): Promise<void> {
    await super.delete(`${this.path}/${id}`);
  }
}
