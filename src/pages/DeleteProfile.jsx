import { TriangleAlert, Ticket, History, UserMinus } from "lucide-react";
import Button from "../components/ui/Button";
import { Heading, Text } from "@radix-ui/themes";

export const DeleteProfile = () => {
  return (
    <main className="flex h-full items-center justify-center bg-background-dark text-text px-6">
      {/* Contenedor centrado */}
      <div className="w-full max-w-2xl">
        <section className="rounded-2xl bg-slate-950/95 p-10 md:p-12 ring-1 ring-zinc-800 shadow-2xl space-y-8">
          {/* Encabezado */}
          <header className="flex flex-col items-center text-center space-y-4">
            <div className="rounded-full bg-amber-400/20 p-4">
              <TriangleAlert size={40} className="text-amber-400" />
            </div>
            <Heading size="8" className="text-white font-semibold">
              Eliminar tu cuenta
            </Heading>
            <Text className="text-zinc-400 max-w-md">
              Esta acción es final y no se puede deshacer. Por favor, lee atentamente las consecuencias.
            </Text>
          </header>

          {/* Consecuencias */}
          <div className="space-y-4">
            <div className="flex gap-3 rounded-lg bg-slate-900/80 p-4 items-center">
              <Ticket size={32} className="text-primary" />
              <div className="flex flex-col">
                <Text className="font-medium text-white">Pérdida de todas tus entradas</Text>
                <Text size="2" className="text-subtle">
                  Perderás el acceso a todas las entradas activas y pasadas en tu cuenta.
                </Text>
              </div>
            </div>

            <div className="flex gap-3 rounded-lg bg-slate-900/80 p-4 items-center">
              <History size={32} className="text-primary" />
              <div className="flex flex-col">
                <Text className="font-medium text-white">Eliminación del historial de compras</Text>
                <Text size="2" className="text-subtle">
                  Tu historial completo de compras y eventos será eliminado permanentemente.
                </Text>
              </div>
            </div>

            <div className="flex gap-3 rounded-lg bg-slate-900/80 p-4 items-center">
              <UserMinus size={32} className="text-primary" />
              <div className="flex flex-col">
                <Text className="font-medium text-white">Borrado de datos personales</Text>
                <Text size="2" className="text-subtle">
                  Tus datos personales, preferencias y configuraciones de la cuenta se borrarán.
                </Text>
              </div>
            </div>
          </div>

          {/* Confirmación */}
          <div className="space-y-3 border-t border-zinc-800 pt-6">
            <Text className="text-zinc-300">
              Para confirmar que entiendes las consecuencias y deseas continuar, por favor ingresa tu contraseña.
            </Text>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              className="w-full mt-3 rounded-xl px-4 py-3 mb-1 text-base placeholder:text-muted ring-1 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          {/* Botones */}
          <div className="flex justify-between">
            <Button variant="gray" >
              Cancelar
            </Button>
            <Button variant="danger">
              Eliminar mi cuenta permanentemente
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
};
