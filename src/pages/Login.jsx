import { Ticket } from "lucide-react";
import Button from "../components/ui/Button";
import { LoginCarousel } from "../components/LoginCarousel";
import { LoginLabel } from "../components/LoginLabel";
import { Link } from "react-router-dom";
import { useState } from "react";
import Validation from "../components/LoginValidation";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(formData));
    console.log(formData);
  };

  return (
    <main className="flex h-full bg-background-dark ">
      {/* contenedor centrado */}
      <div className="w-full h-full lg:w-1/2 flex justify-center place-items-center px-6">
        <div className="w-full max-w-2xl">
          {/* Marca */}
          <header className="mb-8 flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background-dark text-primary">
              <Ticket className="h-12 w-10" />
            </div>
            <span className="text-text text-4xl font-semibold tracking-tight">
              Tikea
            </span>
          </header>

          {/* Card */}
          <section
            aria-labelledby="login-title"
            className="rounded-2xl bg-slate-950/95 p-10 md:p-12 ring-1 ring-border shadow-2xl"
          >
            <h1
              id="login-title"
              className="text-center text-text text-3xl md:text-4xl font-semibold"
            >
              Bienvenido de nuevo
            </h1>
            <p className="mt-2 text-center text-base text-subtle">
              Inicia sesión para continuar
            </p>

            {/* Form */}
            <form className="text-text mt-8 space-y-6" onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-6">
                <LoginLabel
                  type="email"
                  name="email"
                  label="Correo electrónico"
                  placeholder="tu@correo.com"
                  onChange={handleInput}
                />
                {errors.email && <span className="text-red-400 text-sm">{errors.email}</span>}
              </div>

              {/* Password + forgot */}
              <div className="mb-6">
                <LoginLabel type="password" onChange={handleInput} />
                {errors.password && <span className="text-red-400 text-sm">{errors.password}</span>}
              </div>

              {/* CTA */}
              <Button
                type="submit"
                className="mt-4 w-full h-12 md:h-14 text-base md:text-lg"
              >
                Iniciar Sesión
              </Button>

              {/* Link registro dentro de la card */}
              <p className="pt-4 text-center text-sm text-muted">
                ¿No tienes una cuenta?{" "}
                <Link to="/signup" className="text-primary hover:underline">
                  Regístrate
                </Link>
              </p>
            </form>
          </section>
        </div>
      </div>
      <LoginCarousel />
    </main>
  );
};
