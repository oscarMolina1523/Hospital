import MainLayout from "@/layouts/MainLayout";
import AppointmentPage from "@/pages/appointment/Appointment";
import BillingPage from "@/pages/billing/Billing";
import DashboardPage from "@/pages/Dashboard";
import DepartmentPage from "@/pages/department/Department";
import ErrorPage from "@/pages/Error";
import ExpensePage from "@/pages/expense/Expense";
import InventoryPage from "@/pages/inventory/Inventory";
import MedicalServicePage from "@/pages/medicalService/MedicalService";
import MedicationPage from "@/pages/medication/Medication";
import UserPage from "@/pages/user/User";
import { createBrowserRouter, Navigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" />
      },
      {
        path: "home",
        element: <AppointmentPage />,
      },
      {
        path: "billing",
        element: <BillingPage/>,
      },
      {
        path: "expense",
        element: <ExpensePage/>,
      },
      {
        path: "inventory",
        element: <InventoryPage/>,
      },
      {
        path: "medication",
        element: <MedicationPage/>,
      },
      {
        path: "medical-service",
        element: <MedicalServicePage/>,
      },
      {
        path: "user",
        element: <UserPage/>,
      },
      {
        path: "department",
        element: <DepartmentPage/>,
      },
      {
        path: "dashboard",
        element: <DashboardPage/>,
      },
    ],
  },
  { path: "*", element: <ErrorPage /> },
]);

export default router;