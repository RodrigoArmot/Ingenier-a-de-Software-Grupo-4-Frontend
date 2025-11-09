# TIKEA - Plataforma de Venta de Entradas

Una moderna plataforma de venta de entradas para eventos construida con React, Vite y Tailwind CSS.

## 🚀 Características

- **Búsqueda y filtrado** de eventos
- **Selección interactiva de asientos** con mapa visual
- **Carrito de compras** con cupones de descuento
- **Confirmación de compra** con generación de QR
- **Interfaz responsive** optimizada para dispositivos móviles
- **Navbar inteligente** con notificaciones y perfil

## 📋 Requisitos

- Node.js 16+
- npm o yarn

## 💾 Instalación

1. Clona el repositorio
2. Instala las dependencias:

```bash
npm install
```

## 🏃 Ejecución

Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

## 🛠️ Tecnologías

- **React 19.1** - Librería UI
- **Vite 7** - Herramienta para construcción de proyectos react
- **Tailwind CSS 4** - Framework de estilos
- **React Router 7** - Routing
- **Radix UI** - Componentes accesibles
- **Lucide-react** Iconos

## 📁 Estructura del Proyecto

```
src/

├── App.jsx # Componente raíz y routing

├── main.jsx # Entrada principal

├── index.css # Estilos globales

├── components/ # Componentes reutilizables

│ ├── ui

│ ├── ├── Button.jsx

│ ├── ├── Badge.jsx

│ ├── EventCard.jsx

│ ├── SearchBar.jsx

│ ├── Navbar.jsx

│ └── ...

└── pages/ # Páginas de la aplicación

├── Landing.jsx # Página de inicio

├── EventDetail.jsx # Detalles del evento

├── SeatSelection.jsx # Selección de asientos

├── Checkout.jsx # Carrito de compras

└── Confirmation.jsx # Confirmación de compra
```