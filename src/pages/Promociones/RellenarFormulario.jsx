import { Flex, Heading, Text } from '@radix-ui/themes';
import { Armchair } from 'lucide-react';

// --- PASO 2: Seleccionar Asientos ---
export const RellenarFormulario = ({ data, updateData }) => {
  const seats = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];

  const handleSelectSeat = (seat) => {
    const isSelected = data.seats.includes(seat);
    let newSeats;
    if (isSelected) {
      newSeats = data.seats.filter((s) => s !== seat);
    } else {
      newSeats = [...data.seats, seat];
    }
    updateData('seats', newSeats);
  };

  return (
    <Flex direction="column" gap="4">
      <Heading size="6" className="text-text">
        Paso 2: Selecciona tus asientos
      </Heading>
      <Text size="3" className="text-subtle">
        Has seleccionado {data.seats.length} asientos.
      </Text>
      <div className="grid grid-cols-5 gap-3 md:grid-cols-6">
        {seats.map((seat) => (
          <button
            key={seat}
            className={`
              flex items-center justify-center p-3 rounded-lg border-2 
              cursor-pointer aspect-square transition-all duration-150
              ${
                data.seats.includes(seat)
                  ? 'bg-primary text-white border-primary-600 shadow-lg'
                  : 'bg-slate-900/50 border-slate-700 hover:border-slate-500 text-subtle'
              }
            `}
            onClick={() => handleSelectSeat(seat)}
          >
            <Armchair size={16} className="md:hidden" />
            <span className="hidden md:inline font-medium">{seat}</span>
          </button>
        ))}
      </div>
    </Flex>
  );
}