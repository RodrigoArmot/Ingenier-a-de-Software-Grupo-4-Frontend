import api from "./axiosConfig";

// Texto plano
export const enviarMailTexto = async ({ to, subject, body }) => {
  await api.post("/mail/text", null, {
    params: { to, subject, body },
  });
};

// HTML
export const enviarMailHtml = async ({ to, subject, html }) => {
  await api.post("/mail/html", null, {
    params: { to, subject, html },
  });
};
