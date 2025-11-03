import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[1.3rem]">Iniciar Sesión</h2>
      <div className="flex flex-col items-start min-w-[20rem]">
        <label>Correo electrónico</label>
        <Input className="bg-gray-200 focus:bg-white" type="email" placeholder="ej. oscar@gmail.com" />
      </div>
      <div className="flex flex-col items-start min-w-[20rem]">
        <label>Contraseña</label>
        <Input className="bg-gray-200 focus:bg-white" type="password" placeholder="ej. *********" />
      </div>
      <Button className="bg-blue-600">Iniciar Sesion</Button>
      <div className="flex flex-row gap-2 w-full text-surface-neutral items-center">
        <div className="w-1/2 h-px bg-black"></div>
        <label className="text-surface-neutral">or</label>
        <div className="w-1/2 h-px bg-black"></div>
      </div>
      <div className="flex flex-row gap-2 w-full text-end items-center justify-center">
        <label>No tienes cuenta?</label>
        <a onClick={() => navigate("/auth/register")} className="text-ocean-sky-blue hover:underline">Registrarse</a>
      </div>
    </div>
  );
};

export default LoginPage;
