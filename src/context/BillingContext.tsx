import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Billing from "@/entities/billing.model";
import BillingService from "@/services/billing.service";
import type { BillingContextType } from "./TypesContext";

const BillingContext = createContext<BillingContextType | undefined>(undefined);
const billingService = new BillingService();

export const BillingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [billings, setBillings] = useState<Billing[]>([]);
  const [loadingBilling, setLoadingBilling] = useState<boolean>(false);
  const [errorBilling, setErrorBilling] = useState<string>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const fetchBillings = useCallback(async () => {
    if (isLoaded && billings.length > 0) return;

    setLoadingBilling(true);
    try {
      const allBillings = await billingService.getBillings();
      setBillings(allBillings);
      setIsLoaded(true);
    } catch (error) {
      setErrorBilling("Error fetching billings: " + error);
    } finally {
      setLoadingBilling(false);
    }
  }, [billings, isLoaded]);

  const refetchBillings = useCallback(async () => {
    setIsLoaded(false); // limpiamos cache para volver a hacer fetch
    await fetchBillings();
  }, [fetchBillings]);

  useEffect(() => {
    fetchBillings();
  }, [fetchBillings]);

  return (
    <BillingContext.Provider
      value={{
        billings,
        loadingBilling,
        errorBilling,
        fetchBillings,
        refetchBillings,
      }}
    >
      {children}
    </BillingContext.Provider>
  );
};

export const useBillingContext = () => {
  const context = useContext(BillingContext);
  if (!context) {
    throw new Error("useBillingContext must be used within a BillingProvider");
  }
  return context;
};
