import { useState } from "react";
import { Ticket } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import { LoginLabel } from "../../components/usuarios/LoginLabel";
import Validation from "../../components/usuarios/SignupValidation";
import { registrarCliente } from "../../api/clienteService";
import { enviarMailTexto } from "../../api/mailService";

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
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    const validationErrors = Validation(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setIsSubmitting(true);

      // Llamada real al backend
      await registrarCliente(formData);

      // Enviar correo de bienvenida
      try {
        await enviarMailTexto({
          to: formData.email,
          subject: "Bienvenido a Tikea",
          body: `Hola ${formData.name}, gracias por registrarte en Tikea. ¡Explora tus próximos eventos con nosotros!`,
        });
      } catch (mailErr) {
        console.warn("No se pudo enviar el correo de bienvenida:", mailErr);
      }

      // Aquí se podría mostrar un toast
      // Luego redirigir al login
      navigate("/login");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Ocurrió un error al registrar tu cuenta. Inténtalo nuevamente.";
      setApiError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex h-full bg-background-dark">
      {/* Contenedor centrado */}
      <div className="w-full h-full flex justify-center items-center px-6">
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
              id="signup-title"
              className="text-center text-text text-3xl md:text-4xl font-semibold"
            >
              Crea tu cuenta
            </h1>
            <p className="mt-2 text-center text-base text-subtle">
              Y empieza a descubrir tus próximos eventos favoritos
            </p>

            <form
              className="text-text mt-8 space-y-6"
              onSubmit={handleSubmit}
              noValidate
            >
              {/* Nombres */}
              <div>
                <LoginLabel
                  type="text"
                  name="name"
                  label="Nombres"
                  placeholder="JUAN"
                  value={formData.name}
                  onChange={handleInput}
                />
                {errors.name && (
                  <p className="mt-1 text-red-400 text-sm">{errors.name}</p>
                )}
              </div>

              {/* Apellidos */}
              <div>
                <LoginLabel
                  type="text"
                  name="lastname"
                  label="Apellidos"
                  placeholder="CORTEZ"
                  value={formData.lastname}
                  onChange={handleInput}
                />
                {errors.lastname && (
                  <p className="mt-1 text-red-400 text-sm">{errors.lastname}</p>
                )}
              </div>

              {/* DNI */}
              <div>
                <LoginLabel
                  type="text"
                  name="dni"
                  label="DNI"
                  placeholder="12345678"
                  value={formData.dni}
                  onChange={handleInput}
                />
                {errors.dni && (
                  <p className="mt-1 text-red-400 text-sm">{errors.dni}</p>
                )}
              </div>

              {/* Dirección */}
              <div>
                <LoginLabel
                  type="text"
                  name="address"
                  label="Dirección"
                  placeholder="Av. Universitaria 1081"
                  value={formData.address}
                  onChange={handleInput}
                />
                {errors.address && (
                  <p className="mt-1 text-red-400 text-sm">{errors.address}</p>
                )}
              </div>

              {/* Teléfono */}
              <div>
                <LoginLabel
                  type="text"
                  name="phonenumber"
                  label="Teléfono"
                  placeholder="987654321"
                  value={formData.phonenumber}
                  onChange={handleInput}
                />
                {errors.phonenumber && (
                  <p className="mt-1 text-red-400 text-sm">
                    {errors.phonenumber}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <LoginLabel
                  type="email"
                  name="email"
                  label="Correo electrónico"
                  placeholder="tu@correo.com"
                  value={formData.email}
                  onChange={handleInput}
                />
                {errors.email && (
                  <p className="mt-1 text-red-400 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Contraseña */}
              <div>
                <LoginLabel
                  type="password"
                  name="password"
                  label="Contraseña"
                  placeholder="Ingresa tu contraseña"
                  value={formData.password}
                  onChange={handleInput}
                />
                {errors.password && (
                  <p className="mt-1 text-red-400 text-sm">{errors.password}</p>
                )}
              </div>

              {/* Error del backend */}
              {apiError && (
                <p className="text-sm text-red-400 text-center">{apiError}</p>
              )}

              {/* CTA */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 w-full h-12 md:h-14 text-base md:text-lg"
              >
                {isSubmitting ? "Registrando..." : "Registrarse"}
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
