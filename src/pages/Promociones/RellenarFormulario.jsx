import { Flex, Heading, Text } from "@radix-ui/themes";
import { LoginLabel } from "../../components/usuarios/LoginLabel";

// 1. Aceptamos 'errors' como prop
export const RellenarFormulario = ({ data, updateData, errors }) => {
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
    if (tipo === "DESCUENTO_FIJO" || tipo === "CUPON") {
      return "Valor (S/)";
    }
    if (tipo === "DESCUENTO_PORCENTAJE") {
      return "Valor (%)";
    }
  };

  const valorLabel = getValorLabel();

  // 2. Definimos el estilo del texto de error (copiado de tu ejemplo)
  const errorTextStyle = "mt-1 text-red-400 text-sm";

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
          {/* 3. Mostramos el error si existe */}
          {errors.nombrePromocion && (
            <p className={errorTextStyle}>{errors.nombrePromocion}</p>
          )}
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
          {/* 3. Mostramos el error si existe */}
          {errors.descripcion && (
            <p className={errorTextStyle}>{errors.descripcion}</p>
          )}
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
            {/* 3. Mostramos el error si existe */}
            {errors.valorDescuento && (
              <p className={errorTextStyle}>{errors.valorDescuento}</p>
            )}
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
            {/* 3. Mostramos el error si existe */}
            {errors.stockDisponible && (
              <p className={errorTextStyle}>{errors.stockDisponible}</p>
            )}
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
            {/* 3. Mostramos el error si existe */}
            {errors.fechaInicio && (
              <p className={errorTextStyle}>{errors.fechaInicio}</p>
            )}
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
            {/* 3. Mostramos el error si existe */}
            {errors.fechaFin && (
              <p className={errorTextStyle}>{errors.fechaFin}</p>
            )}
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
            {/* 3. Mostramos el error si existe */}
            {errors.condicionesCanal && (
              <p className={errorTextStyle}>{errors.condicionesCanal}</p>
            )}
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
            {/* 3. Mostramos el error si existe (aunque sea opcional, el patrón se mantiene) */}
            {errors.condicionesSector && (
              <p className={errorTextStyle}>{errors.condicionesSector}</p>
            )}
          </div>
        </div>
      </div>
    </Flex>
  );
};
