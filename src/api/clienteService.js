import api from "./axiosConfig";

// Registrar cliente
export const registrarCliente = async (formData) => {
  const payload = {
    nombre: formData.name,
    apellidos: formData.lastname,
    correo: formData.email,
    password: formData.password,
    telefono: formData.phonenumber,
    dni: formData.dni,
    direccion: formData.address,
    nombreUser: formData.email,  // aca creo que es un campo mas en el form en realidad, por mientras lo dejare asi
    puntosPromociones: 0,
    tipoCliente: "REGISTRADO",
  };

  const { data } = await api.post("/clientes/registro", payload);
  return data;
};

// Login cliente
export const loginCliente = async ({ email, password }) => {
  const payload = {
    correo: email,
    password,
  };

  const { data } = await api.post("/clientes/login", payload);
  return data;
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
