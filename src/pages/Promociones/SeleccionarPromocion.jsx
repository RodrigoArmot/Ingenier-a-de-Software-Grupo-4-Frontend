import { Flex, Heading, Text } from '@radix-ui/themes';
import { Clock } from 'lucide-react';

// --- PASO 1: Seleccionar Horario ---
export const SeleccionarPromocion = ({ data, updateData }) => {
  const horarios = ['10:00 AM', '1:30 PM', '4:00 PM', '7:15 PM'];

  return (
    <Flex direction="column" gap="4">
      <Heading size="6" className="text-text">
        Paso 1: Selecciona tu horario
      </Heading>
      <Text size="3" className="text-subtle">
        Elige la función que prefieras.
      </Text>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {horarios.map((time) => (
          <button
            key={time}
            // Cambiamos el estilo basado en la selección
            className={`
              p-4 rounded-lg border-2 cursor-pointer transition-all duration-150
              flex flex-col items-center justify-center gap-2
              ${
                data.schedule === time
                  ? 'bg-primary text-white border-primary-600 shadow-lg'
                  : 'bg-slate-900/50 border-slate-700 hover:border-slate-500 text-subtle'
              }
            `}
            onClick={() => updateData('schedule', time)}
          >
            <Clock size={20} />
            <span className="text-lg font-bold">{time}</span>
          </button>
        ))}
      </div>
    </Flex>
  );
}