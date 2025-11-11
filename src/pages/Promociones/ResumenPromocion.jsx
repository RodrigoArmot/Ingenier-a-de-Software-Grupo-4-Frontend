import { Flex, Heading, Text,  TextField } from '@radix-ui/themes';
import { Mail } from 'lucide-react';

// --- PASO 3: Confirmar y Pagar (Datos Adicionales) ---
export const ResumenPromocion = ({ data, updateData }) => {
  return (
    <Flex direction="column" gap="4">
      <Heading size="6" className="text-text">
        Paso 3: Confirmación y Pago
      </Heading>
      <Text size="3" className="text-subtle">
        Revisa tu orden antes de finalizar.
      </Text>

      {/* Resumen */}
      <div className="space-y-2 rounded-lg border border-slate-700 bg-slate-900/50 p-4">
        <Heading size="3">Resumen de tu selección:</Heading>
        <ul className="list-disc list-inside text-subtle space-y-1">
          <li>
            <strong>Horario:</strong> {data.schedule || 'No seleccionado'}
          </li>
          <li>
            <strong>Asientos:</strong> {data.seats.join(', ') || 'Ninguno'}
          </li>
        </ul>
      </div>

      {/* Campo de Email (estilo Radix) */}
      <div className="space-y-1">
        <label
          htmlFor="email"
          className="text-sm font-medium text-subtle"
        >
          Ingresa tu email para recibir los tickets:
        </label>
        <TextField.Root
          id="email"
          size="3"
          type="email"
          placeholder="tu@correo.com"
          onChange={(e) => updateData('email', e.target.value)}
          value={data.email || ''}
        >
          <TextField.Slot>
            <Mail size={18} className="text-muted" />
          </TextField.Slot>
        </TextField.Root>
      </div>
    </Flex>
  );
}