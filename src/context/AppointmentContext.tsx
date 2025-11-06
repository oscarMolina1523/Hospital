import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Appointment from "@/entities/appointment.model";
import type { AppointmentContextType } from "./TypesContext";
import AppointmentService from "@/services/appointment.service";

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);
const appointmentService = new AppointmentService();

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointmentsByDepartment, setAppointmentsByDepartment] = useState<Appointment[]>([]);
  const [loadingAppointment, setLoadingAppointment] = useState<boolean>(false);
  const [errorAppointment, setErrorAppointment] = useState<string>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const fetchAppointments = useCallback(async () => {
    if (isLoaded && appointments.length > 0) return;

    setLoadingAppointment(true);
    try {
      const allAppointments = await appointmentService.getAppointments();
      setAppointments(allAppointments);
      setIsLoaded(true); 
    } catch (error) {
      setErrorAppointment("Error fetching appointments: " + error);
    } finally {
      setLoadingAppointment(false);
    }
  }, [appointments, isLoaded]);

  const fetchAppointmentsByDepartment = useCallback(async () => {
    setLoadingAppointment(true);
    try {
      const byDept = await appointmentService.getAppointmentByDepartment();
      setAppointmentsByDepartment(byDept);
    } catch (error) {
      setErrorAppointment("Error fetching appointments by department: " + error);
    } finally {
      setLoadingAppointment(false);
    }
  }, []);

  const refetchAppointments = useCallback(async () => {
    setIsLoaded(false); 
    await fetchAppointments();
  }, [fetchAppointments]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        appointmentsByDepartment,
        loadingAppointment,
        errorAppointment,
        fetchAppointments,
        fetchAppointmentsByDepartment,
        refetchAppointments
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointmentContext = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error("useAppointmentContext must be used within an AppointmentProvider");
  }
  return context;
};
