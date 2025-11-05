import Patient from "@/entities/patient.model";
import HTTPService from "./http-service";

export default class PatientService extends HTTPService {
  private path: string;

  constructor() {
    super();
    this.path = "patients";
  }

  async getPatients(): Promise<Patient[]> {
    const response = await super.get(this.path);
    const data = response.data || [];
    return data.map((item: any) => Patient.fromJson(item));
  }

  async getById(id: string): Promise<Patient | null> {
    const response = await super.get(`${this.path}/${id}`);
    if (!response) return null;

    return Patient.fromJson(response);
  }

  async getPatientByDepartment() {
    const response = await super.get(`${this.path}/area`);
    const data = response.data || [];
    return data.map((item: any) => Patient.fromJson(item));
  }

  async addPatient(patient: Patient): Promise<Patient | null> {
    const body = Patient.fromJsonModel(patient).toJsonDTO();
    const response = await super.post(this.path, body);

    if (!response) return null;
    return Patient.fromJson(response);
  }

  async updatePatient(id: string, patient: Patient): Promise<Patient | null> {
    const body = Patient.fromJsonModel(patient).toJsonDTO();
    const response = await super.put(`${this.path}/${id}`, body);

    if (!response) return null;
    return Patient.fromJson(response);
  }

  async deletePatient(id: string): Promise<void> {
    await super.delete(`${this.path}/${id}`);
  }
}
