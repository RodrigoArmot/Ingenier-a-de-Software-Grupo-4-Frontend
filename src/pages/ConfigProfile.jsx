import { LoginLabel } from "../components/LoginLabel";
import Button from "../components/ui/Button";

export const ConfigProfile = () => {
  return (
    <main className="flex h-full bg-background-dark ">
      {/* Contenedor centrado */}
      <div className="w-full h-full justify-center place-items-center px-6">
        <div className="w-full max-w-4xl">
          <header className="text-4xl text-text p-6 mb-2">
            Modificar mi perfil
          </header>
          <section className="rounded-2xl bg-slate-950/95 p-10 md:p-12 ring-1 ring-border shadow-2xl mb-5">
            <header className="text-text mb-4 text-xl">
              Información Personal
            </header>
            <div className="flex flex-col text-white/50">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-4">
                <LoginLabel type="text" name="name" label="Nombres" />
                <LoginLabel type="text" name="lastname" label="Apellidos" />
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-4">
                <LoginLabel type="text" name="phonenumber" label="Teléfono" />
                <LoginLabel type="text" name="lastname" label="Apellidos" />
              </div>
              <div className="mb-4">
                <LoginLabel
                  type="text"
                  name="email"
                  label="Correo electrónico"
                />
              </div>
              <div className="mb-4">
                <LoginLabel type="text" name="address" label="Dirección" />
              </div>
            </div>
          </section>
          <section className="rounded-2xl bg-slate-950/95 p-10 md:p-12 ring-1 ring-border shadow-2xl mb-5">
            <header className="text-text mb-4 text-xl">
              Cambiar Contraseña
            </header>
            <div className="flex flex-col text-white/50">
              <div className="mb-4">
                <LoginLabel
                  type="password"
                  name="password"
                  label="Contraseña actual"
                />
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-4">
                <LoginLabel
                  type="password"
                  name="password"
                  label="Nueva contraseña"
                />
                <LoginLabel
                  type="password"
                  name="password"
                  label="Confirmar nueva contraseña"
                />
              </div>
            </div>
          </section>
          <div class="flex justify-end p-4">
            <Button className="flex h-12 min-w-40 items-center justify-center">
              Guardar cambios
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};
