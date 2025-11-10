import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import AppointmentPage from "@/pages/appointment/Appointment";
import BillingPage from "@/pages/billing/Billing";
import DashboardPage from "@/pages/Dashboard";
import DepartmentPage from "@/pages/department/Department";
import ErrorPage from "@/pages/Error";
import ExpensePage from "@/pages/expense/Expense";
import InventoryPage from "@/pages/inventory/Inventory";
import LoginPage from "@/pages/Login";
import AuditLogPage from "@/pages/logs/AuditLog";
import MedicalServicePage from "@/pages/medicalService/MedicalService";
import MedicationPage from "@/pages/medication/Medication";
import PatientPage from "@/pages/patients/Patient";
import RegisterPage from "@/pages/Register";
import RolePage from "@/pages/role/Role";
import UserPage from "@/pages/user/User";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./protectedRoutes";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true, // Esta propiedad indica que esta es la ruta por defecto
        element: <Navigate to="login" />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/home" />,
      },
      {
        path: "home",
        element: <AppointmentPage />,
      },
      {
        path: "billing",
        element: <BillingPage />,
      },
      {
        path: "expense",
        element: <ExpensePage />,
      },
      {
        path: "inventory",
        element: <InventoryPage />,
      },
      {
        path: "medication",
        element: <MedicationPage />,
      },
      {
        path: "medical-service",
        element: <MedicalServicePage />,
      },
      {
        path: "user",
        element: <UserPage />,
      },
      {
        path: "patient",
        element: <PatientPage />,
      },
      {
        path: "role",
        element: <RolePage />,
      },
      {
        path: "department",
        element: <DepartmentPage />,
      },
      {
        path: "log",
        element: <AuditLogPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
    ],
  },
  { path: "*", element: <ErrorPage /> },
]);

export default router;
