import api from "./axiosConfig";

export const registrarEstablecimiento = async (payload) => {
  const { data } = await api.post("/establecimientos/registro", payload);
  return data;
};
