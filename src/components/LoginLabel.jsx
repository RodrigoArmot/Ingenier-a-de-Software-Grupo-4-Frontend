import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
export const LoginLabel = ({ type, name, placeholder, required = false }) => {
  const [show, setShow] = useState(false);
  return type === "password" ? (
    <label className="block text-sm">
      <span className="mb-2 block text-text">Contraseña</span>
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
    </label>
  ) : (
    <label className="block text-sm">
      <span className="mb-2 block text-text">{name}</span>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl bg-surface-2 px-4 py-3 text-base placeholder:text-muted ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-focus"
      />
    </label>
  );
};
