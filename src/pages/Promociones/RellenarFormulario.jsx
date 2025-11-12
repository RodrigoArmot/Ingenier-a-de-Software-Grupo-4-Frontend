import { Flex, Heading, Text } from "@radix-ui/themes";
import { LoginLabel } from "../../components/usuarios/LoginLabel";

export const RellenarFormulario = ({ data, updateData }) => {
  const handleInput = (e) => {
    const { name, value } = e.target;
    updateData(name, value);
  };

  const inputStyle = `
    mt-1 block w-full rounded-md border-slate-700 
    bg-slate-900/50 p-3 text-text shadow-sm 
    focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50
  `;
  const getValorLabel = () => {
    const tipo = data.tipoPromocion;
    if (tipo === "Descuento Fijo" || tipo === "Puntos Promocionales") {
      return "Valor (S/)";
    }
    if (tipo === "Descuento Porcentaje") {
      return "Valor (%)";
    }
  };

  const valorLabel = getValorLabel();

  return (
    <Flex direction="column" gap="4">
      <Heading size="6" className="text-text">
        Paso 2: Completa los detalles
      </Heading>
      <Text size="3" className="text-subtle">
        Define las condiciones, valores y vigencia de tu promoción.
      </Text>

      <div className="text-text mt-8 space-y-6">
        {/* Nombre Promoción */}
        <div>
          <LoginLabel
            type="text"
            name="nombrePromocion"
            label="Nombre de la Promoción"
            placeholder="Ej. Preventa Verano 2025"
            value={data.nombrePromocion}
            onChange={handleInput}
          />
        </div>

        {/* Descripción */}
        <div>
          <label
            htmlFor="descripcion"
            className="block text-sm font-medium text-text"
          >
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows="3"
            placeholder="Describe las condiciones de la promoción..."
            value={data.descripcion}
            onChange={handleInput}
            className={inputStyle}
          />
        </div>

        {/* Valor y Stock (en rejilla) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <LoginLabel
              type="number"
              name="valorDescuento"
              label={valorLabel}
              placeholder="10.00"
              value={data.valorDescuento}
              onChange={handleInput}
            />
          </div>
          <div>
            <LoginLabel
              type="number"
              name="stockDisponible"
              label="Stock Disponible"
              placeholder="100"
              value={data.stockDisponible}
              onChange={handleInput}
            />
          </div>
        </div>

        {/* Fechas (en rejilla) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <LoginLabel
              type="date"
              name="fechaInicio"
              label="Fecha de Inicio"
              value={data.fechaInicio}
              onChange={handleInput}
              placeholder=" "
            />
          </div>
          <div>
            <LoginLabel
              type="date"
              name="fechaFin"
              label="Fecha de Fin"
              value={data.fechaFin}
              onChange={handleInput}
              placeholder=" "
            />
          </div>
        </div>

        {/* Condiciones (en rejilla) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="condicionesCanal"
              className="block text-sm font-medium text-text"
            >
              Canal (Restricción)
            </label>
            <select
              id="condicionesCanal"
              name="condicionesCanal"
              value={data.condicionesCanal}
              onChange={handleInput}
              className={inputStyle} // Aplicamos el estilo de input
            >
              <option value="">Selecciona un canal...</option>
              <option value="Taquilla">Taquilla</option>
              <option value="Web">Web</option>
              <option value="Todos">Todos</option>
            </select>
          </div>
          <div>
            <LoginLabel
              type="text"
              name="condicionesSector"
              label="Sector (Opcional)"
              placeholder="Ej. VIP, Platea"
              value={data.condicionesSector}
              onChange={handleInput}
            />
          </div>
        </div>
      </div>
    </Flex>
  );
};
