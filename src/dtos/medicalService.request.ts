export interface MedicalServiceRequest {
  name: string; // "Consulta general", "Ecografía", "Cirugía menor"
  departmentId: string;
  baseCost: number;
  active: boolean;
}
