export interface RoleRequest {
  name: string; // CEO, Junta, JefeDepto, Medico, Enfermero, Auxiliar, Admin
  description: string;
  hierarchyLevel: number;
}
