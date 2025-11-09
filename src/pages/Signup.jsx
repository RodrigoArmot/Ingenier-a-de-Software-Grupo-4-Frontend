import { Ticket } from "lucide-react";
import Button from "../components/ui/Button";
import { LoginLabel } from "../components/LoginLabel";
import { Link } from "react-router-dom";
import { useState } from "react";
import Validation from "../components/SignupValidation";

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    dni: "",
    address: "",
    phonenumber: "",
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
      {/* Contenedor centrado */}
      <div className="w-full h-full flex justify-center place-items-center px-6">
        <div className="w-full max-w-2xl">
          {/* Marca */}
          <header className="mt-4 mb-8 flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background-dark text-primary">
              <Ticket className="h-12 w-10" />
            </div>
            <span className="text-text text-4xl font-semibold tracking-tight">
              Tikea
            </span>
          </header>

          {/* Card */}
          <section
            aria-labelledby="signup-title"
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
            <form className="text-text mt-8 space-y-6" onSubmit={handleSubmit}>
              {/* Nombres */}
              <div className="mb-6">
                <LoginLabel
                  type="text"
                  name="name"
                  label="Nombres"
                  placeholder="JUAN"
                  onChange={handleInput}
                />
                {errors.name && (
                  <span className="text-red-400 text-sm">{errors.name}</span>
                )}
              </div>

              {/* Apellidos */}
              <div className="mb-6">
                <LoginLabel
                  type="text"
                  name="lastname"
                  label="Apellidos"
                  placeholder="CORTEZ"
                  onChange={handleInput}
                />
                {errors.lastname && (
                  <span className="text-red-400 text-sm">{errors.lastname}</span>
                )}
              </div>

              {/* DNI */}
              <div className="mb-6">
                <LoginLabel
                  type="text"
                  name="dni"
                  label="DNI"
                  placeholder="12345678"
                  onChange={handleInput}
                />
                {errors.dni && (
                  <span className="text-red-400 text-sm">{errors.dni}</span>
                )}
              </div>

              {/* Dirección */}
              <div className="mb-6">
                <LoginLabel
                  type="text"
                  name="address"
                  label="Dirección"
                  placeholder="Av. Universitaria 1081"
                  onChange={handleInput}
                />
                {errors.address && (
                  <span className="text-red-400 text-sm">{errors.address}</span>
                )}
              </div>

              {/* Teléfono */}
              <div className="mb-6">
                <LoginLabel
                  type="text"
                  name="phonenumber"
                  label="Teléfono"
                  placeholder="987654321"
                  onChange={handleInput}
                />
                {errors.phonenumber && (
                  <span className="text-red-400 text-sm">{errors.phonenumber}</span>
                )}
              </div>

              {/* Email */}
              <div className="mb-6">
                <LoginLabel
                  type="email"
                  name="email"
                  label="Correo electrónico"
                  placeholder="tu@correo.com"
                  onChange={handleInput}
                />
                {errors.email && (
                  <span className="text-red-400 text-sm">{errors.email}</span>
                )}
              </div>

              {/* Contraseña */}
              <div className="mb-6">
                <LoginLabel
                  type="password"
                  name="password"
                  onChange={handleInput}
                />
                {errors.password && (
                  <span className="text-red-400 text-sm">{errors.password}</span>
                )}
              </div>

              {/* CTA */}
              <Button
                type="submit"
                className="mt-4 w-full h-12 md:h-14 text-base md:text-lg"
              >
                Registrarse
              </Button>
            </form>
          </section>
          <p className="pt-4 mb-2 text-center text-sm text-muted">
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
