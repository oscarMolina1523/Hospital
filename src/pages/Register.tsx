import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[1.3rem]">Registrarse</h2>
      <div className="flex flex-col items-start min-w-[20rem]">
        <label>Nombre completo</label>
        <Input
          className="bg-gray-200 focus:bg-white"
          type="text"
          placeholder="ej. Eduardo Nahum Rigoberto"
        />
      </div>
      <div className="flex flex-col items-start min-w-[20rem]">
        <label>Correo electrónico</label>
        <Input
          className="bg-gray-200 focus:bg-white"
          type="email"
          placeholder="ej. oscar@gmail.com"
        />
      </div>
      <div className="flex flex-col items-start min-w-[20rem]">
        <label>Contraseña</label>
        <Input
          className="bg-gray-200 focus:bg-white"
          type="password"
          placeholder="ej. *********"
        />
      </div>
      <div className="flex flex-col items-start min-w-[20rem]">
        <label>Confirmar contraseña</label>
        <Input
          className="bg-gray-200 focus:bg-white"
          type="password"
          placeholder="ej. *********"
        />
      </div>
      <Button onClick={() => navigate("/home")} className="bg-blue-600">
        Registrarse
      </Button>
      <div className="flex flex-row gap-2 w-full text-surface-neutral items-center">
        <div className="w-1/2 h-px bg-black"></div>
        <label className="text-surface-neutral">or</label>
        <div className="w-1/2 h-px bg-black"></div>
      </div>
      <div className="flex flex-row gap-2 w-full text-end items-center justify-center">
        <label>Ya tienes cuenta?</label>
        <a
          onClick={() => navigate("/auth/login")}
          className="text-blue-500 font-semibold hover:underline"
        >
          login
        </a>
      </div>
    </div>
  );
};

export default RegisterPage;
