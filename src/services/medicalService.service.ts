import MedicalService from "@/entities/medicalService.model";
import HTTPService from "./http-service";

export default class MedicalServiceService extends HTTPService {
  private path: string;

  constructor() {
    super();
    this.path = "services";
  }

  async getMedicalServices(): Promise<MedicalService[]> {
    const response = await super.get(this.path);
    const data = response.data || [];
    return data.map((item: any) => MedicalService.fromJson(item));
  }

  async getById(id: string): Promise<MedicalService | null> {
    const response = await super.get(`${this.path}/${id}`);
    if (!response) return null;

    return MedicalService.fromJson(response);
  }

  async getMedicalServiceByDepartment() {
    const response = await super.get(`${this.path}/area`);
    const data = response.data || [];
    return data.map((item: any) => MedicalService.fromJson(item));
  }

  async addMedicalService(
    service: MedicalService
  ): Promise<MedicalService | null> {
    const body = MedicalService.fromJsonModel(service).toJsonDTO();
    const response = await super.post(this.path, body);

    if (!response) return null;
    return MedicalService.fromJson(response);
  }

  async updateMedicalService(
    id: string,
    service: MedicalService
  ): Promise<MedicalService | null> {
    const body = MedicalService.fromJsonModel(service).toJsonDTO();
    const response = await super.put(`${this.path}/${id}`, body);

    if (!response) return null;
    return MedicalService.fromJson(response);
  }

  async deleteMedicalService(id: string): Promise<void> {
    await super.delete(`${this.path}/${id}`);
  }
}
