import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { AppointmentProvider } from "@/context/AppointmentContext";
import { BillingProvider } from "@/context/BillingContext";
import { DepartmentProvider } from "@/context/DepartmentContext";
import { ExpenseProvider } from "@/context/ExpenseContext";
import { InventoryProvider } from "@/context/InventoryContext";
import { LogProvider } from "@/context/LogContext";
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
      <RoleProvider>
        <Navbar />
        <div className="w-full flex flex-row h-screen">
          <div className="w-80 px-2 fixed left-0 top-24">
            <Sidebar />
          </div>
          <LogProvider>
            <DepartmentProvider>
              <PatientProvider>
                <MedicalServiceProvider>
                  <MedicationProvider>
                    <InventoryProvider>
                      <ExpenseProvider>
                        <BillingProvider>
                          <AppointmentProvider>
                            <UserProvider>
                              <div
                                className="ml-80 mt-24 w-3/4 px-2 overflow-y-auto min-h-full"
                                style={{
                                  scrollbarWidth: "none",
                                  msOverflowStyle: "none",
                                }}
                              >
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
            </DepartmentProvider>
          </LogProvider>
        </div>
      </RoleProvider>
    </div>
  );
};

export default MainLayout;
