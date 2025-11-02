import type Department from "@/entities/department.model";

const now = new Date();

export const departmentData: Department[] = [
  {
    id: "d-admision",
    name: "Admisión",
    description:
      "Departamento encargado de la gestión de ingresos, registros y atención inicial de pacientes.",
    headId: "u-005",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "d-consultas",
    name: "Consultas Externas",
    description:
      "Área responsable de la atención médica ambulatoria, citas y control de pacientes externos.",
    headId: "u-003", 
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "d-emergencias",
    name: "Emergencias",
    description:
      "Encargado de brindar atención médica inmediata y de urgencia las 24 horas.",
    headId: "u-004",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "d-cirugia",
    name: "Cirugía",
    description:
      "Departamento especializado en intervenciones quirúrgicas programadas y de emergencia.",
    headId: "u-009", 
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "d-farmacia",
    name: "Farmacia",
    description:
      "Responsable del control, almacenamiento y entrega de medicamentos y material médico.",
    headId: "u-008", 
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "d-laboratorio",
    name: "Laboratorio",
    description:
      "Encargado de realizar análisis clínicos, pruebas de diagnóstico y procesamiento de muestras.",
    headId: "u-007", 
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "d-radiologia",
    name: "Radiología",
    description:
      "Área especializada en estudios de imagen, rayos X, tomografía y resonancia magnética.",
    headId: "u-006",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "d-pediatria",
    name: "Pediatría",
    description:
      "Brinda atención médica integral a niños y adolescentes, con enfoque preventivo y curativo.",
    headId: "u-010", 
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "d-internamiento",
    name: "Internamiento",
    description:
      "Área destinada a la hospitalización y cuidado continuo de pacientes ingresados.",
    headId: "u-001", 
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "d-administracion",
    name: "Administración",
    description:
      "Encargado de la gestión administrativa, financiera y de recursos humanos del hospital.",
    headId: "u-002", 
    createdAt: now,
    updatedAt: now,
  },
];
