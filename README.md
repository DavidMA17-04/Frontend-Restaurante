# Sistema Restaurante - Frontend

Frontend del Sistema de Gestion de Restaurante para el curso **Programacion IV**.
Consume una API REST desarrollada en ASP.NET Core.

## Stack

React + TypeScript, Vite, React Router, Axios, TanStack Query y TanStack Table.

## Requisitos

- Node.js 18+ y npm.

## Configuracion

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Crear el archivo `.env` a partir del ejemplo y ajustar la URL del backend:

   ```bash
   cp .env.example .env
   ```

   ```
   VITE_API_URL=http://localhost:5000/api
   ```

## Scripts

| Comando | Descripcion |
|---|---|
| `npm run dev` | Servidor de desarrollo. |
| `npm run build` | Compilacion de produccion (typecheck + build). |
| `npm run preview` | Previsualiza el build. |
| `npm run lint` | Ejecuta ESLint. |

## Documentacion

- [ARQUITECTURA.md](ARQUITECTURA.md): enfoque arquitectonico, capas y flujo de datos.
- [CONVENTIONS.md](CONVENTIONS.md): estandares de nomenclatura y reglas de dependencia.

## Estado actual

Plantilla base compilable. La integracion real con el backend (CRUD, validaciones,
peticiones HTTP activas) se realizara en etapas posteriores; los hooks de datos usan
`enabled: false` para no disparar peticiones mientras el backend no este conectado.
