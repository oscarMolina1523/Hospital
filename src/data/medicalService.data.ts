import type MedicalService from "@/entities/medicalService.model";

export const medicalServiceData: MedicalService[] = [
    {
    id: "s-001",
    name: "Consulta General",
    departmentId: "d-consultas",
    baseCost: 30,
    active: true,
  },
  {
    id: "s-002",
    name: "Consulta Pediátrica",
    departmentId: "d-pediatria",
    baseCost: 35,
    active: true,
  },
  {
    id: "s-003",
    name: "Urgencias Básicas",
    departmentId: "d-emergencias",
    baseCost: 50,
    active: true,
  },
  {
    id: "s-004",
    name: "Cirugía Menor",
    departmentId: "d-cirugia",
    baseCost: 150,
    active: true,
  },
  {
    id: "s-005",
    name: "Ecografía Abdominal",
    departmentId: "d-radiologia",
    baseCost: 60,
    active: true,
  },
  {
    id: "s-006",
    name: "Laboratorio de Sangre",
    departmentId: "d-laboratorio",
    baseCost: 25,
    active: true,
  },
  {
    id: "s-007",
    name: "Radiografía Torácica",
    departmentId: "d-radiologia",
    baseCost: 40,
    active: true,
  },
  {
    id: "s-008",
    name: "Control de Enfermería",
    departmentId: "d-internamiento",
    baseCost: 20,
    active: true,
  },
  {
    id: "s-009",
    name: "Administración de Medicamentos",
    departmentId: "d-farmacia",
    baseCost: 15,
    active: true,
  },
  {
    id: "s-010",
    name: "Evaluación Preoperatoria",
    departmentId: "d-cirugia",
    baseCost: 45,
    active: true,
  },
];