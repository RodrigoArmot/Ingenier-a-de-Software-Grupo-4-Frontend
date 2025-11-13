import { Flex, Heading, Text } from "@radix-ui/themes";

export const ResumenPromocion = ({ data, updateData }) => {
  const getValorLabel = () => {
    const tipo = data.tipoPromocion;
    if (tipo === "DESCUENTO_FIJO" || tipo === "CUPON") {
      return "Valor (S/)";
    }
    if (tipo === "DESCUENTO_PORCENTAJE") {
      return "Valor (%)";
    }
  };

  const valorLabel = getValorLabel();

  return (
    <Flex direction="column" gap="4">
      <Heading size="6" className="text-text">
        Paso 3: Confirmación y Detalles
      </Heading>
      <Text size="3" className="text-subtle">
        Revisa los detalles de tu promoción antes de finalizar.
      </Text>

      {/* Resumen de la Promoción */}
      <div className="space-y-2 rounded-lg border border-slate-700 bg-slate-900/50 p-4">
        <Heading size="3" className="text-text">
          Resumen de la Promoción:
        </Heading>

        <ul className="list-none space-y-1 text-subtle">
          <li>
            <strong>Tipo:</strong> {data.tipoPromocion || "No definido"}
          </li>
          <li>
            <strong>Nombre:</strong> {data.nombrePromocion || "Sin nombre"}
          </li>
          <li>
            <strong>{valorLabel}:</strong> {data.valorDescuento || "N/A"}
          </li>
          <li>
            <strong>Stock:</strong> {data.stockDisponible || "Ilimitado"}
          </li>
          <li>
            <strong>Vigencia:</strong> {data.fechaInicio || "N/A"} hasta{" "}
            {data.fechaFin || "N/A"}
          </li>
          <li>
            <strong>Canal:</strong> {data.condicionesCanal || "Todos"}
          </li>
          <li>
            <strong>Sector:</strong> {data.condicionesSector || "Todos"}
          </li>
          <li>
            <strong>Descripción:</strong>{" "}
            {data.descripcion || "Sin descripción"}
          </li>
        </ul>
      </div>
    </Flex>
  );
};
