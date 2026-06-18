# Sistema Restaurante - Frontend

Frontend del Sistema de Gestion de Restaurante para el curso **Programacion IV**.
Consume una API REST desarrollada en ASP.NET Core (RestauranteAPI).

## Stack

React + TypeScript, Vite, React Router, Axios, TanStack Query, TanStack Table y **Tailwind CSS v4**.

## Requisitos

- Node.js 18+ y npm.
- .NET 9 SDK (para ejecutar RestauranteAPI).

## Configuracion

1. Instalar dependencias del frontend:

   ```bash
   npm install
   ```

2. Crear el archivo `.env` a partir del ejemplo:

   ```bash
   cp .env.example .env
   ```

3. Ajustar variables para conectar con el backend local:

   ```env
   VITE_API_URL=http://localhost:5052/api
   VITE_USE_MOCK=false
   ```

   - `VITE_USE_MOCK=true` usa datos inventados en memoria (util sin backend).
   - `VITE_USE_MOCK=false` consume la API real en `VITE_API_URL`.

## Conectar con RestauranteAPI

1. Levantar el backend (puerto **5052** por defecto):

   ```bash
   cd "../Proyecto Final/backend/RestauranteAPI"
   dotnet run
   ```

2. Verificar que responde, por ejemplo: `http://localhost:5052/api/Clientes`

3. Reiniciar el frontend (Vite lee `.env` solo al arrancar):

   ```bash
   npm run dev
   ```

4. Abrir `http://localhost:5173` y probar los modulos CRUD.

**Nota:** El modulo Empleados no tiene endpoint en RestauranteAPI; solo funciona con `VITE_USE_MOCK=true`.

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

Integracion HTTP activa con RestauranteAPI via Axios y TanStack Query. Los servicios alternan entre mocks y API real segun `VITE_USE_MOCK`.
