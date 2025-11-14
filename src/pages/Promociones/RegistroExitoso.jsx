import { Link } from "react-router-dom";
import { Flex, Heading, Text } from "@radix-ui/themes";
import Button from "../../components/ui/Button";
import { CheckCircle } from "lucide-react";

// --- PASO 4: Pantalla Final de Éxito ---
export const RegistroExitoso = ({ data, onReset }) => {
  return (
    <Flex direction="column" align="center" gap="4" className="py-8">
      <CheckCircle size={64} className="text-green-500" />
      <Heading size="7" className="text-text">
        ¡Registro Exitoso!
      </Heading>
      <Text size="3" align="center" className="text-subtle max-w-sm">
        ¡La promoción <strong>{data.nombrePromocion}</strong> ha sido creada!
      </Text>
      <Link to="/">
        <Button size="3" variant="danger">
          Salir
        </Button>
      </Link>
    </Flex>
  );
};
