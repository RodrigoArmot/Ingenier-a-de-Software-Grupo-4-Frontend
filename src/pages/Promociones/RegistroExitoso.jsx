import { Flex, Heading, Text, Button } from '@radix-ui/themes';
import { CheckCircle } from 'lucide-react';

// --- PASO 4: Pantalla Final de Éxito ---
export const RegistroExitoso = ({ data, onReset }) => {
  return (
    <Flex direction="column" align="center" gap="4" className="py-8">
      <CheckCircle size={64} className="text-green-500" />
      <Heading size="7" className="text-text">
        ¡Compra Exitosa!
      </Heading>
      <Text size="3" align="center" className="text-subtle max-w-sm">
        Hemos enviado tus tickets para la función de las
        <strong> {data.schedule}</strong> (Asientos: {data.seats.join(', ')}) al
        correo <strong>{data.email}</strong>.
      </Text>
      <Button
        size="3"
        onClick={onReset}
        className="mt-4 bg-primary hover:bg-primary-600 text-white cursor-pointer"
      >
        Hacer otra compra
      </Button>
    </Flex>
  );
}