import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthService from "@/services/auth.service";

const authService = new AuthService();

const RegisterPage: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const name = nameRef.current?.value || "";
    const confirmPassword = confirmPasswordRef.current?.value || "";

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (!name || password !== confirmPassword) {
      setError("Nombre es obligatorio y las contraseñas no coinciden.");
      return;
    }

    if (!email || !password) {
      setError("El email y la contraseña son obligatorios.");
      return;
    }

    try {
      await authService.signUp(name, email, password);
      navigate("/auth/login");
    } catch (error) {
      setError(`${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-[1.3rem]">Registrarse</h2>
      {error && <span className="text-red-600">{error}</span>}
      <div className="flex flex-col items-start min-w-[20rem]">
        <label>Nombre completo</label>
        <Input
          id="nameRef"
          className="bg-gray-200 focus:bg-white"
          type="text"
          placeholder="ej. Eduardo Nahum Rigoberto"
          ref={nameRef}
          required
        />
      </div>
      <div className="flex flex-col items-start min-w-[20rem]">
        <label>Correo electrónico</label>
        <Input
          className="bg-gray-200 focus:bg-white"
          type="email"
          id="emailRef"
          ref={emailRef}
          required
          placeholder="ej. oscar@gmail.com"
        />
      </div>
      <div className="flex flex-col items-start min-w-[20rem]">
        <label>Contraseña</label>
        <Input
          className="bg-gray-200 focus:bg-white"
          type="password"
          id="passwordRef"
          placeholder="ej. *********"
          ref={passwordRef}
          required
        />
      </div>
      <div className="flex flex-col items-start min-w-[20rem]">
        <label>Confirmar contraseña</label>
        <Input
          id="confirmPasswordRef"
          className="bg-gray-200 focus:bg-white"
          type="password"
          placeholder="ej. *********"
          ref={confirmPasswordRef}
          required
        />
      </div>
      <Button type="submit" className="bg-blue-600">
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
    </form>
  );
};

export default RegisterPage;
