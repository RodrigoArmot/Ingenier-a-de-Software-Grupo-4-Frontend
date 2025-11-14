import api from "./axiosConfig";

export const registrarProductor = async (payload) => {
  const { data } = await api.post("/productores/registro", payload);
  return data;
};

export const actualizarProductor = async (id, formData) => {
  const { data } = await api.put(`/productores/${id}`, payload);
  return data;
};

export const eliminarProductor = async (id) => {
  const response = await api.delete(`/productores/${id}`);
  return response.data;
};

export const listarProductores = async () => {
  const response = await api.get("/productores");
  return response.data;
};

export const buscarProductorPorId = async (id) => {
  const response = await api.get(`/productores/${id}`);
  return response.data;
};

export const listarProductoresPorGestor = async (idGestor) => {
  const response = await api.get(`/productores/gestor/${idGestor}`);
  return response.data;
};


export const listarProductoresPorEstado = async (estado) => {
  const response = await api.get(`/productores/estado/${estado}`);
  return response.data;
};