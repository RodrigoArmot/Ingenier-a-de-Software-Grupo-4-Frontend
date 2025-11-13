import { Flex, Heading, Text } from "@radix-ui/themes";
import { CalendarClock, Percent, Minus, Ticket } from "lucide-react";

const iconMap = {
  "Descuento Porcentaje": <Percent size={20} />,
  "Descuento Fijo": <Minus size={20} />,
  "Cupón": <Ticket size={20} />,
};

const dataMap = {
  "Descuento Porcentaje" : "DESCUENTO_PORCENTAJE",
  "Descuento Fijo" : "DESCUENTO_FIJO",
  "Cupón" : "CUPON",
};

export const SeleccionarPromocion = ({ data, updateData }) => {
  // Genera el array directamente desde las claves del mapa
  const tiposDePromocion = [
    "Descuento Porcentaje",
    "Descuento Fijo",
    "Cupón",
  ];

  return (
    <Flex direction="column" gap="4">
      <Heading size="6" className="text-text">
        Paso 1: Selecciona tu promoción
      </Heading>
      <Text size="3" className="text-subtle">
        Elige la promoción que prefieras.
      </Text>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 mt-6">
        {tiposDePromocion.map((tipo) => (
          <button
            key={tipo}
            className={`
              p-4 rounded-lg border-2 cursor-pointer transition-all duration-150
              flex flex-col items-center justify-center gap-2
              ${
                data.tipoPromocion === dataMap[tipo]
                  ? "bg-primary text-white border-primary-600 shadow-lg"
                  : "bg-slate-900/50 border-slate-700 hover:border-slate-500 text-subtle"
              }
            `}
            onClick={() => updateData("tipoPromocion", dataMap[tipo])}
          >
            {iconMap[tipo]}
            <span className="text-lg font-bold">{tipo}</span>
          </button>
        ))}
      </div>
    </Flex>
  );
};
