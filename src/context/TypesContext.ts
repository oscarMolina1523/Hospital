import type Appointment from "@/entities/appointment.model";
import type Billing from "@/entities/billing.model";
import type Expense from "@/entities/expense.model";
import type Inventory from "@/entities/inventory.model";
import type MedicalService from "@/entities/medicalService.model";
import type { Medication } from "@/entities/medication.model";
import type Patient from "@/entities/patient.model";
import type Role from "@/entities/role.model";
import type User from "@/entities/user.model";

export type UserContextType = {
  users: User[];
  usersByDepartment:User[];
  loadingUser: boolean;
  errorUser?: string;
  fetchUsers: () => Promise<void>;
  fetchUsersByDepartment: () => Promise<void>;
  refetchUsers: () => Promise<void>;
};

export type AppointmentContextType = {
  appointments: Appointment[];
  appointmentsByDepartment:Appointment[];
  loadingAppointment: boolean;
  errorAppointment?: string;
  fetchAppointments: () => Promise<void>;
  fetchAppointmentsByDepartment: () => Promise<void>;
  refetchAppointments: () => Promise<void>;
};

export type BillingContextType = {
  billings: Billing[];
  loadingBilling: boolean;
  errorBilling?: string;
  fetchBillings: () => Promise<void>;
  refetchBillings: () => Promise<void>;
};

export type ExpenseContextType = {
  expenses: Expense[];
  expensesByDepartment:Expense[];
  loadingExpense: boolean;
  errorExpense?: string;
  fetchExpenses: () => Promise<void>;
  fetchExpensesByDepartment: () => Promise<void>;
  refetchExpenses: () => Promise<void>;
};

export type InventoryContextType = {
  inventories: Inventory[];
  inventoriesByDepartment:Inventory[];
  loadingInventory: boolean;
  errorInventory?: string;
  fetchInventories: () => Promise<void>;
  fetchInventoriesByDepartment: () => Promise<void>;
  refetchInventories: () => Promise<void>;
};

export type MedicationContextType = {
  medications: Medication[];
  loadingMedication: boolean;
  errorMedication?: string;
  fetchMedications: () => Promise<void>;
  refetchMedications: () => Promise<void>;
};

export type MedicalServiceContextType = {
  medicalServices: MedicalService[];
  medicalServicesByDepartment:MedicalService[];
  loadingMedicalService: boolean;
  errorMedicalService?: string;
  fetchMedicalServices: () => Promise<void>;
  fetchMedicalServicesByDepartment: () => Promise<void>;
  refetchMedicalServices: () => Promise<void>;
};

export type PatientContextType = {
  patients: Patient[];
  patientsByDepartment:Patient[];
  loadingPatient: boolean;
  errorPatient?: string;
  fetchPatients: () => Promise<void>;
  fetchPatientsByDepartment: () => Promise<void>;
  refetchPatients: () => Promise<void>;
};

export type RoleContextType = {
  roles: Role[];
  loadingRole: boolean;
  errorRole?: string;
  fetchRoles: () => Promise<void>;
  refetchRoles: () => Promise<void>;
};