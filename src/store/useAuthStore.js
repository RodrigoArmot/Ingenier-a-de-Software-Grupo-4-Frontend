import { create } from "zustand";

const STORAGE_KEY = "cliente";

export const useAuthStore = create((set) => ({
  user: (() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  })(),
  isAuthenticated: (() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return !!stored;
    } catch {
      return false;
    }
  })(),

  // Guardar usuario al iniciar sesión
  login: (cliente) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cliente));
    set({ user: cliente, isAuthenticated: true });
  },

  // Cerrar sesión
  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ user: null, isAuthenticated: false });
  },

  // Actualizar datos del usuario (por ejemplo, al editar perfil)
  updateUser: (partial) =>
    set((state) => {
      if (!state.user) return state;
      const updated = { ...state.user, ...partial };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { user: updated };
    }),
}));
