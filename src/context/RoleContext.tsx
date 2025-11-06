import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Role from "@/entities/role.model";
import type { RoleContextType } from "./TypesContext";
import RoleService from "@/services/role.service";

const RoleContext = createContext<RoleContextType | undefined>(undefined);
const roleService = new RoleService();

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loadingRole, setLoadingRole] = useState<boolean>(false);
  const [errorRole, setErrorRole] = useState<string>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const fetchRoles = useCallback(async () => {
    if (isLoaded && roles.length > 0) return;

    setLoadingRole(true);
    try {
      const allRoles = await roleService.getRoles();
      setRoles(allRoles);
      setIsLoaded(true);
    } catch (error) {
      setErrorRole("Error fetching roles: " + error);
    } finally {
      setLoadingRole(false);
    }
  }, [roles, isLoaded]);

  const refetchRoles = useCallback(async () => {
    setIsLoaded(false); // reset cache to force refetch
    await fetchRoles();
  }, [fetchRoles]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return (
    <RoleContext.Provider
      value={{
        roles,
        loadingRole,
        errorRole,
        fetchRoles,
        refetchRoles,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRoleContext = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRoleContext must be used within a RoleProvider");
  }
  return context;
};
