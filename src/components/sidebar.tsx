import { Accessibility, Book, BrickWallShield, Calendar, ChartArea, ClipboardClock, Home, Pill, PillBottle, Stethoscope, User2, Wallet } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const items = [
  { title: "Citas", url: "/home", icon: Calendar },
  { title: "Facturacion", url: "/billing", icon: Book },
  { title: "Gastos", url: "/expense", icon: Wallet },
  { title: "Inventario", url: "/inventory", icon: Pill },
  { title: "Medicamentos", url: "/medication", icon: PillBottle },
  { title: "Servicios medicos", url: "/medical-service", icon: Stethoscope },
  { title: "Usuarios", url: "/user", icon: User2 },
  { title: "Pacientes", url: "/patient", icon: Accessibility },
  { title: "Roles", url: "/role", icon: BrickWallShield },
  { title: "Departamentos", url: "/department", icon: Home },
  { title: "Logs", url: "/log", icon: ClipboardClock },
  { title: "Crecimiento monetario", url: "/dashboard", icon: ChartArea },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bg-white h-full rounded-2xl items-start justify-start flex flex-col gap-2 p-4">
      {items.map((item) => {
        const isActive = location.pathname === item.url;
        return (
          <div
            key={item.title}
            onClick={() => navigate(item.url)}
            className={`w-full rounded-xl h-8 p-2 flex flex-row gap-4 items-center justify-start cursor-pointer transition-colors ${
              isActive ? "bg-sky-500 text-white font-medium" : "hover:bg-sky-300 hover:text-white"
            }`}
          >
            <item.icon className="h-4 w-4" />
            <p>{item.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
