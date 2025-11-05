export interface MedicationRequest {
  name: string;
  description: string;
  expirationDate?: Date;
  active: boolean;
  unit: string; // "tableta", "ml", etc.
}
