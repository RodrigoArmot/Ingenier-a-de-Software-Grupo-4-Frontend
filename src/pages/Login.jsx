import { useState } from "react";
import { Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { LoginCarousel } from "../components/LoginCarousel";
import { LoginLabel } from "../components/LoginLabel";
import Validation from "../components/LoginValidation";
// import { loginCliente } from "../services/clienteService"; // lo usaremos luego

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const navigate = useNavigate(); // cuando conectemos con el back

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = Validation(formData);
    setErrors(validationErrors);
    setApiError("");

    if (Object.keys(validationErrors).length > 0) return;

    // Cuando conectes con el back:
    /*
    try {
      setIsSubmitting(true);
      const data = await loginCliente({
        email: formData.email,
        password: formData.password,
      });

      // guardar usuario
      localStorage.setItem("cliente", JSON.stringify(data));
      navigate("/"); // redirigir a inicio
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "No se pudo iniciar sesión. Verifica tus datos.";
      setApiError(msg);
    } finally {
      setIsSubmitting(false);
    }
    */

    console.log("Login submit (mock):", formData);
  };

  return (
    <div className="flex h-full bg-background-dark">
      {/* Columna izquierda: formulario */}
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center px-6">
        <div className="w-full max-w-2xl">
          {/* Marca */}
          <header className="mb-8 flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background-dark text-primary">
              <Ticket className="h-10 w-10" />
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

            <form
              className="text-text mt-8 space-y-6"
              onSubmit={handleSubmit}
              noValidate
            >
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
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Password */}
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
                  <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                )}
                <div className="mt-1 text-right">
                  <a
                    href="#"
                    className="text-xs text-muted hover:text-text transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
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
                {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>

              {/* Link registro */}
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
      {/* Columna derecha: carrusel sólo en pantallas grandes */}
      <LoginCarousel />
    </div>
  );
};
