import { useState } from "react";
import { Eye, EyeOff, Ticket } from "lucide-react";
import Button from "../components/ui/Button";
import { LoginLabel } from "../components/LoginLabel";
import { Link } from "react-router-dom";

export const Signup = () => {
  const [show, setShow] = useState(false);

  return (
    <main className="flex h-full bg-background-dark ">
      {/* contenedor centrado */}
      <div className="w-full h-full flex justify-center place-items-center px-6">
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
            className="rounded-2xl bg-slate-950/95 p-10 md:p-12 ring-1 ring-border shadow-2xl mb-5"
          >
            <h1
              id="login-title"
              className="text-center text-text text-3xl md:text-4xl font-semibold"
            >
              Crea tu cuenta
            </h1>
            <p className="mt-2 text-center text-base text-subtle">
              Y empieza a descubrir tus próximos eventos favoritos
            </p>

            {/* Form */}
            <form
              className="text-text mt-8 space-y-6"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Nombres */}
              <LoginLabel
                type="text"
                name="Nombres"
                placeholder="JUAN"
                required
              />

              {/* Apellidos */}
              <LoginLabel
                type="text"
                name="Apellidos"
                placeholder="CORTEZ"
                required
              />

              {/* DNI */}
              <LoginLabel
                type="number"
                name="DNI"
                placeholder="12345678"
                required
              />

              {/* Email */}
              <LoginLabel
                type="email"
                name="Correo electrónico"
                placeholder="tu@correo.com"
                required
              />

              {/* Contraseña */}
              <LoginLabel type="password" />

              {/* CTA */}
              <Button
                type="submit"
                className="mt-4 w-full h-12 md:h-14 text-base md:text-lg"
              >
                Registrarse
              </Button>
            </form>
          </section>
          <p className="pt-4 text-center text-sm text-muted">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};
