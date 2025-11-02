import type Role from "@/entities/role.model";

const now = new Date();

export const roleData: Role[] = [
  {
    id: "r-ceo",
    name: "CEO",
    description:
      "Director general del hospital. Supervisa todas las operaciones, finanzas y métricas globales.",
    hierarchyLevel: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "r-junta",
    name: "Junta Directiva",
    description:
      "Miembros encargados de la planificación estratégica y toma de decisiones administrativas.",
    hierarchyLevel: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "r-jefe-depto",
    name: "Jefe de Departamento",
    description:
      "Responsable de coordinar y supervisar el funcionamiento de un departamento específico.",
    hierarchyLevel: 3,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "r-medico",
    name: "Médico",
    description:
      "Profesional de la salud encargado de diagnosticar, tratar y dar seguimiento a los pacientes.",
    hierarchyLevel: 4,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "r-enfermero",
    name: "Enfermero",
    description:
      "Encargado del cuidado directo del paciente, administración de medicamentos y asistencia médica.",
    hierarchyLevel: 5,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "r-auxiliar",
    name: "Auxiliar",
    description:
      "Apoya al personal médico y de enfermería en tareas básicas y logísticas dentro del hospital.",
    hierarchyLevel: 6,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "r-admin",
    name: "Administrador del Sistema",
    description:
      "Usuario técnico encargado de la gestión del sistema, usuarios y mantenimiento técnico.",
    hierarchyLevel: 7,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "r-recepcionista",
    name: "Recepcionista",
    description:
      "Encargado de registrar pacientes, gestionar citas y coordinar la admisión.",
    hierarchyLevel: 8,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "r-farmaceutico",
    name: "Farmacéutico",
    description:
      "Responsable de la dispensación de medicamentos y control del inventario de farmacia.",
    hierarchyLevel: 9,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "r-laboratorista",
    name: "Laboratorista",
    description:
      "Encargado de la toma y análisis de muestras clínicas, colaborando en diagnósticos médicos.",
    hierarchyLevel: 10,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "r-viewer",
    name: "Viewer",
    description:
      "Solamente tiene permisos de visualización de datos sin capacidad de edición.",
    hierarchyLevel: 11,
    createdAt: now,
    updatedAt: now,
  },
];
