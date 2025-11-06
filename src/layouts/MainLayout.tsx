import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { AppointmentProvider } from "@/context/AppointmentContext";
import { BillingProvider } from "@/context/BillingContext";
import { ExpenseProvider } from "@/context/ExpenseContext";
import { InventoryProvider } from "@/context/InventoryContext";
import { MedicalServiceProvider } from "@/context/MedicalServiceContext";
import { MedicationProvider } from "@/context/MedicationContext";
import { PatientProvider } from "@/context/PatientContext";
import { RoleProvider } from "@/context/RoleContext";
import { UserProvider } from "@/context/UserContext";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <Navbar />
      <div className="w-full flex flex-row h-full">
        <div className="w-1/4 px-2">
          <Sidebar />
        </div>
        <RoleProvider>
          <PatientProvider>
            <MedicalServiceProvider>
              <MedicationProvider>
                <InventoryProvider>
                  <ExpenseProvider>
                    <BillingProvider>
                      <AppointmentProvider>
                        <UserProvider>
                          <div className="w-3/4 px-2">
                            <Outlet />
                          </div>
                        </UserProvider>
                      </AppointmentProvider>
                    </BillingProvider>
                  </ExpenseProvider>
                </InventoryProvider>
              </MedicationProvider>
            </MedicalServiceProvider>
          </PatientProvider>
        </RoleProvider>
      </div>
    </div>
  );
};

export default MainLayout;
