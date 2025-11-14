import api from "./axiosConfig";

// Registrar promoción
export const registrarPromocion = async (formData) => {
  const payload = {
    nombre: formData.nombre,
    descripcion: formData.descripcion,
    tipo: formData.tipo,
    valorDescuento: formData.valorDescuento,
    fechaInicio: formData.fechaInicio,
    fechaFin: formData.fechaFin,
    stockDisponible: formData.stockDisponible,
    condicionesCanal: formData.condicionesCanal,
    condicionesSector: formData.condicionesSector,
    idEvento: formData.idEvento,
  };

  const { data } = await api.post("/promociones/registro", payload);
  return data;
};

// Actualizar promoción
export const actualizarPromocion = async (id, formData) => {
  const payload = {
    nombre: formData.nombre,
    descripcion: formData.descripcion,
    tipo: formData.tipo,
    valorDescuento: formData.valorDescuento,
    fechaInicio: formData.fechaInicio,
    fechaFin: formData.fechaFin,
    stockDisponible: formData.stockDisponible,
    condicionesCanal: formData.condicionesCanal,
    condicionesSector: formData.condicionesSector,
  };

  const { data } = await api.put(`/promociones/${id}`, payload);
  return data;
};

// Eliminar (inactivar) promoción
export const eliminarPromocion = async (id) => {
  const response = await api.delete(`/promociones/${id}`);
  return response.data;
};

// Listar todas las promociones
export const listarPromociones = async () => {
  const response = await api.get("/promociones");
  return response.data;
};

// Buscar promoción por ID
export const buscarPromocionPorId = async (id) => {
  const response = await api.get(`/promociones/${id}`);
  return response.data;
};

// Listar promociones por Evento
export const listarPromocionesPorEvento = async (idEvento) => {
  const response = await api.get(`/promociones/evento/${idEvento}`);
  return response.data;
};

// Listar promociones ACTIVAS por Evento
export const listarPromocionesActivasPorEvento = async (idEvento) => {
  const response = await api.get(`/promociones/evento/${idEvento}/activas`);
  return response.data;
};
