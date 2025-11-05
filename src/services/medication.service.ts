import { Medication } from "@/entities/medication.model";
import HTTPService from "./http-service";

export default class MedicationService extends HTTPService {
  private path: string;

  constructor() {
    super();
    this.path = "medications";
  }

  async getMedications(): Promise<Medication[]> {
    const response = await super.get(this.path);
    const data = response.data || [];
    return data.map((item: any) => Medication.fromJson(item));
  }

  async getById(id: string): Promise<Medication | null> {
    const response = await super.get(`${this.path}/${id}`);
    if (!response) return null;

    return Medication.fromJson(response);
  }

  async addMedication(medication: Medication): Promise<Medication | null> {
    const body = Medication.fromJsonModel(medication).toJsonDTO();
    const response = await super.post(this.path, body);

    if (!response) return null;
    return Medication.fromJson(response);
  }

  async updateMedication(id: string, medication: Medication): Promise<Medication | null> {
    const body = Medication.fromJsonModel(medication).toJsonDTO();
    const response = await super.put(`${this.path}/${id}`, body);

    if (!response) return null;
    return Medication.fromJson(response);
  }

  async deleteMedication(id: string): Promise<void> {
    await super.delete(`${this.path}/${id}`);
  }
}
