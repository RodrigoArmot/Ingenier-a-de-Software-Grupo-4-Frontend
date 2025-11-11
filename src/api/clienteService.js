import api from "./axiosConfig";

// Registrar cliente
export const registrarCliente = async (clienteData) => {
  const response = await api.post("/clientes/registro", clienteData);
  return response.data;
};

// Login cliente
export const loginCliente = async (loginData) => {
  const response = await api.post("/clientes/login", loginData);
  return response.data;
};

// Actualizar cliente
export const actualizarCliente = async (id, clienteData) => {
  const response = await api.put(`/clientes/${id}`, clienteData);
  return response.data;
};

// Eliminar (inactivar) cliente
export const eliminarCliente = async (id) => {
  const response = await api.delete(`/clientes/${id}`);
  return response.data;
};

// Listar todos los clientes
export const listarClientes = async () => {
  const response = await api.get("/clientes");
  return response.data;
};
