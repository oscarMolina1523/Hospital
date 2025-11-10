import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "@/services/auth.service";
import { getUserFromToken } from "@/hooks/getUserFromToken";
import { rolePermissions } from "@/hooks/useRolePermitions";

const authService = new AuthService();

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    //const areaId = areaIdRef.current || "0";

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (!email || !password) {
      setError("El email y la contraseña son obligatorios.");
      return;
    }

    try {
      const token = await authService.signIn(email, password);
      localStorage.setItem("authToken", token.token);

      // After storing token, decode user and redirect to first allowed route for their role
      const user = getUserFromToken();
      if (user && user.roleId && rolePermissions[user.roleId] && rolePermissions[user.roleId].length > 0) {
        navigate(rolePermissions[user.roleId][0]);
      } else {
        navigate("/home");
      }
    } catch (error) {
      setError(`${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-[1.3rem]">Iniciar Sesión</h2>
      {error && <span className="text-red-600">{error}</span>}
      <div className="flex flex-col items-start min-w-[20rem]">
        <label>Correo electrónico</label>
        <Input
          id="emailRef"
          ref={emailRef}
          required
          className="bg-gray-200 focus:bg-white"
          type="email"
          placeholder="ej. oscar@gmail.com"
        />
      </div>
      <div className="flex flex-col items-start min-w-[20rem]">
        <label>Contraseña</label>
        <Input
          id="passwordRef"
          ref={passwordRef}
          required
          className="bg-gray-200 focus:bg-white"
          type="password"
          placeholder="ej. *********"
        />
      </div>
      <Button type="submit" className="bg-blue-600">
        Iniciar Sesion
      </Button>
      <div className="flex flex-row gap-2 w-full text-surface-neutral items-center">
        <div className="w-1/2 h-px bg-black"></div>
        <label className="text-surface-neutral">or</label>
        <div className="w-1/2 h-px bg-black"></div>
      </div>
      <div className="flex flex-row gap-2 w-full text-end items-center justify-center">
        <label>No tienes cuenta?</label>
        <a
          onClick={() => navigate("/auth/register")}
          className="text-blue-500 font-semibold hover:underline"
        >
          Registrarse
        </a>
      </div>
    </form>
  );
};

export default LoginPage;
