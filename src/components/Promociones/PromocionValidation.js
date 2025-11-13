function PromocionValidation(formData) {
  let error = {};

  // Patrón para números positivos (decimales permitidos)
  const positive_number_pattern = /^[0-9]*\.?[0-9]+$/;
  // Patrón para enteros positivos
  const positive_integer_pattern = /^[0-9]+$/;

  if (!formData.nombrePromocion.trim()) {
    error.nombrePromocion = "El nombre no debe estar vacío";
  }

  if (!formData.descripcion.trim()) {
    error.descripcion = "La descripción no debe estar vacía";
  }

  // Valor Descuento
  if (!formData.valorDescuento.trim()) {
    error.valorDescuento = "El valor no debe estar vacío";
  } else if (!positive_number_pattern.test(formData.valorDescuento) || parseFloat(formData.valorDescuento) <= 0) {
    error.valorDescuento = "El valor debe ser un número positivo";
  }

  // Stock Disponible
  if (!formData.stockDisponible.trim()) {
    error.stockDisponible = "El stock no debe estar vacío";
  } else if (!positive_integer_pattern.test(formData.stockDisponible) || parseInt(formData.stockDisponible, 10) < 0) {
    // Permitimos stock 0
    error.stockDisponible = "El stock debe ser un número entero positivo o cero";
  }

  // Fechas
  if (!formData.fechaInicio) {
    error.fechaInicio = "La fecha de inicio es requerida";
  }
  if (!formData.fechaFin) {
    error.fechaFin = "La fecha de fin es requerida";
  }

  // Validación de rango de fechas
  if (formData.fechaInicio && formData.fechaFin) {
    const inicio = new Date(formData.fechaInicio);
    const fin = new Date(formData.fechaFin);
    
    // Añadimos un día a 'fin' para que la comparación sea inclusiva al final del día
    fin.setDate(fin.getDate() + 1); 

    if (fin <= inicio) {
      error.fechaFin = "La fecha de fin debe ser posterior a la fecha de inicio";
    }
  }

  // Condiciones
  if (!formData.condicionesCanal) {
    error.condicionesCanal = "Debes seleccionar un canal";
  }
  
  // condicionesSector es opcional según el label que puse,
  // si es obligatorio, descomenta esto:
  /*
  if (!formData.condicionesSector.trim()) {
    error.condicionesSector = "El sector no debe estar vacío";
  }
  */

  return error;
}

export default PromocionValidation;