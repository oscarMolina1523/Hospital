import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import AuditLog from "@/entities/auditLog.model";
import type { LogContextType } from "./TypesContext";
import AuditLogService from "@/services/auditLog.service";

const LogContext = createContext<LogContextType | undefined>(undefined);
const logService = new AuditLogService();

export const LogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loadingLog, setLoadingLog] = useState<boolean>(false);
  const [errorLog, setErrorLog] = useState<string>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const fetchLogs = useCallback(async () => {
    if (isLoaded && logs.length > 0) {
      console.log("⚡ Logs already loaded, skipping fetch");
      return;
    }

    console.log("📡 Fetching audit logs...");
    setLoadingLog(true);
    try {
      const allLogs = await logService.getAuditLogs();

      // 🔽 Ordenar de más reciente a más antiguo
      const sortedLogs = [...allLogs].sort(
        (a, b) => new Date(b.performedAt).getTime() - new Date(a.performedAt).getTime()
      );

      setLogs(sortedLogs);
      setIsLoaded(true);
    } catch (error) {
      setErrorLog("Error fetching logs: " + error);
    } finally {
      setLoadingLog(false);
    }
  }, [logs, isLoaded]);

  const refetchLogs = useCallback(async () => {
    setIsLoaded(false); // Forzar recarga
    await fetchLogs();
  }, [fetchLogs]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return (
    <LogContext.Provider
      value={{
        logs,
        loadingLog,
        errorLog,
        fetchLogs,
        refetchLogs,
      }}
    >
      {children}
    </LogContext.Provider>
  );
};

export const useLogContext = () => {
  const context = useContext(LogContext);
  if (!context) {
    throw new Error("useLogContext must be used within a LogProvider");
  }
  return context;
};
