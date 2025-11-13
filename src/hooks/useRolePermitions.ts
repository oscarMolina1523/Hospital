import { useMemo } from "react";
import { getUserFromToken } from "./getUserFromToken";

// Tabla de permisos por rol
export const rolePermissions: Record<string, string[]> = {
  "r-junta": [
    "/home",
    "/billing",
    "/expense",
    "/inventory",
    "/medication",
    "/medical-service",
    "/user",
    "/patient",
    "/role",
    "/department",
    "/log",
    "/dashboard",
  ],
  "r-recepcionista": ["/home", "/patient", "/billing"],
  "r-medico": ["/home", "/patient", "/medical-service", "/medication", "/inventory"],
  "r-farmaceutico": ["/inventory", "/medication"],
  "r-laboratorista": ["/medical-service", "/patient"],
  "r-enfermero": ["/medical-service", "/patient"],
  "r-jefe-depto": ["/billing", "/expense"],
  "r-ceo": ["/dashboard", "/log", "/billing", "/expense"],
//   "r-junta": ["/dashboard", "/log", "/billing", "/expense"],
  "r-auxiliar": ["/billing", "/expense"],
  //le doy todos los permisos debido a que la gente que desee registrarse 
  //y ver el software lo pueda ver completo pero sin permisos de modificacion
  //este no debe ser capaz de editar ni eliminar solo de ver
  "r-viewer": [
    "/home",
    "/billing",
    "/expense",
    "/inventory",
    "/medication",
    "/medical-service",
    "/user",
    "/patient",
    "/role",
    "/department",
    "/log",
    "/dashboard",
  ],
};

export function useRolePermissions() {
  const user = getUserFromToken();

  const permissions = useMemo(() => {
    if (!user?.roleId) return [];
    //le pasas el id
    return rolePermissions[user.roleId] || [];
  }, [user]);

  return { user, permissions };
}
