import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Medication } from "@/entities/medication.model";
import type { MedicationContextType } from "./TypesContext";
import MedicationService from "@/services/medication.service";

const MedicationContext = createContext<MedicationContextType | undefined>(undefined);
const medicationService = new MedicationService();

export const MedicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loadingMedication, setLoadingMedication] = useState<boolean>(false);
  const [errorMedication, setErrorMedication] = useState<string>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const fetchMedications = useCallback(async () => {
    if (isLoaded && medications.length > 0) return;

    setLoadingMedication(true);
    try {
      const allMedications = await medicationService.getMedications();
      setMedications(allMedications);
      setIsLoaded(true);
    } catch (error) {
      setErrorMedication("Error fetching medications: " + error);
    } finally {
      setLoadingMedication(false);
    }
  }, [medications, isLoaded]);

  const refetchMedications = useCallback(async () => {
    setIsLoaded(false); // reset cache
    await fetchMedications();
  }, [fetchMedications]);

  useEffect(() => {
    fetchMedications();
  }, [fetchMedications]);

  return (
    <MedicationContext.Provider
      value={{
        medications,
        loadingMedication,
        errorMedication,
        fetchMedications,
        refetchMedications,
      }}
    >
      {children}
    </MedicationContext.Provider>
  );
};

export const useMedicationContext = () => {
  const context = useContext(MedicationContext);
  if (!context) {
    throw new Error("useMedicationContext must be used within a MedicationProvider");
  }
  return context;
};
