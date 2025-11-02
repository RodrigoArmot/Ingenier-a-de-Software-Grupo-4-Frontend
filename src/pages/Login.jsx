import { useState } from "react";
import { Eye, EyeOff, Ticket } from "lucide-react";
import Button from "../components/ui/Button";

export const Login = () => {
  const [show, setShow] = useState(false);

  return (
    <main className="h-full bg-background-dark ">
      {/* contenedor centrado */}
      <div className="h-full grid place-items-center px-6">
        <div className="w-full max-w-2xl">
          {/* Marca */}
          <header className="mb-8 flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Ticket className="h-6 w-6" />
            </div>
            <span className="text-text text-4xl font-semibold tracking-tight">Tikea</span>
          </header>

          {/* Card */}
          <section
            aria-labelledby="login-title"
            className="rounded-2xl bg-slate-950/95 p-10 md:p-12 ring-1 ring-border shadow-2xl"
          >
            <h1 id="login-title" className="text-center text-text text-3xl md:text-4xl font-semibold">
              Bienvenido de nuevo
            </h1>
            <p className="mt-2 text-center text-base text-subtle">
              Inicia sesión para continuar
            </p>

            {/* Form */}
            <form className="text-text mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
              {/* Email */}
              <label className="block text-sm">
                <span className="mb-2 block text-text">Correo electrónico</span>
                <input
                  type="email"
                  required
                  placeholder="tu@correo.com"
                  className="w-full rounded-xl bg-surface-2 px-4 py-3 text-base placeholder:text-muted ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-focus"
                />
              </label>

              {/* Password + forgot */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-text">Contraseña</span>
                <a href="#" className="text-xs text-muted hover:text-text transition-colors">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  required
                  placeholder="Ingresa tu contraseña"
                  className="w-full rounded-xl bg-surface-2 px-4 py-3 pr-12 text-base placeholder:text-muted ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-focus"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-2 text-muted hover:text-text focus:outline-none focus:ring-2 focus:ring-focus"
                  aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {/* CTA */}
              <Button type="submit" className="mt-4 w-full h-12 md:h-14 text-base md:text-lg">
                Iniciar Sesión
              </Button>

              {/* Link registro dentro de la card */}
              <p className="pt-4 text-center text-sm text-muted">
                ¿No tienes una cuenta?{" "}
                <a href="#" className="text-primary hover:underline">Regístrate</a>
              </p>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
};
