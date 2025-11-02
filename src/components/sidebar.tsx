import { Book, BrickWallIcon, Calendar, ChartArea, Pill, User2, Wallet } from "lucide-react";
import React from "react";

const items = [
  { title: "Citas", url: "/", icon: Calendar },
  { title: "Facturacion", url: "/", icon: Book },
  { title: "Gastos", url: "/", icon: Wallet },
  { title: "Inventario", url: "/", icon: Pill },
  { title: "Usuarios", url: "/", icon: User2 },
  { title: "Crecimiento monetario", url: "/", icon: ChartArea },
];

const Sidebar: React.FC = () => {
  return (
    <div className="bg-white h-full rounded-2xl items-start justify-start flex flex-col gap-2 p-4">
      {items.map((item) => (
        <div className="w-full rounded-xl h-8 p-2 flex flex-row gap-4 items-center justify-start hover:bg-gray-400">
          <item.icon className="h-4 w-4" />
          <p className="w">{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
