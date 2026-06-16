# Arquitectura Frontend - Sistema de Gestion de Restaurante

**Universidad Nacional de Costa Rica**
**Curso:** Programacion IV
**Proyecto:** Frontend del Sistema de Restaurante (consume backend ASP.NET Core)

---

## 1. Enfoque arquitectonico

El proyecto adopta una arquitectura **Layer-Based (Type-Based) con features de dominio**,
evolucion directa de la plantilla academica `Sistema-Ecommerce-2026`.

- Las **capas globales** se organizan por tipo de responsabilidad en la raiz de `src/`
  (`config/`, `layout/`, `router/`, `pages/`, `shared/`).
- La **logica especifica de cada modulo** se encapsula dentro de `features/{modulo}/`
  con sus propias subcarpetas `services/`, `hooks/`, `types/` y `ui/`.

Esta decision mantiene la filosofia Layer-Based del curso, pero evita que las carpetas
planas crezcan en exceso al manejar 8 modulos de negocio.

### Separacion de responsabilidades

| Responsabilidad | Ubicacion |
|---|---|
| Presentacion | `pages/`, `layout/`, `features/*/ui/`, `shared/components/` |
| Acceso a datos | `config/`, `features/*/services/`, `features/*/hooks/`, `features/*/types/` |
| Reutilizable transversal | `shared/` |

Regla central: la **UI nunca usa Axios directamente**, y los **servicios nunca usan React**.
El puente entre ambas capas son los **hooks** (TanStack Query).

---

## 2. Estructura de carpetas

```
src/
├── config/            # Infraestructura: axios, env, reactQuery
├── layout/            # Shell: MainLayout, Navbar, Sidebar, Footer
├── router/            # routes.tsx + AppRouter.tsx
├── pages/             # Una vista por ruta (Home + 8 modulos)
├── shared/            # Codigo generico reutilizable (sin dominio)
│   ├── components/    # ui, forms, tables
│   ├── hooks/
│   ├── utils/
│   ├── types/
│   └── constants/
├── features/          # Modulos de dominio
│   └── {modulo}/
│       ├── ui/        # Componentes de negocio del modulo
│       ├── hooks/     # useGetX (TanStack Query)
│       ├── services/  # xService (Axios)
│       ├── types/     # xType (DTOs)
│       └── index.ts   # Barrel exports
├── styles/            # CSS global
├── App.tsx            # Providers + Router
└── main.tsx           # Punto de entrada
```

Modulos en `features/`: `clientes`, `empleados`, `mesas`, `reservas`, `turnos`,
`zonas`, `bloqueos-mesa`, `lista-espera`.

---

## 3. Relacion entre capas

```
pages/  ->  features/*/hooks  ->  features/*/services  ->  config/axios  ->  Backend ASP.NET
   |              |
   |              +-> features/*/types
   +-> features/*/ui  ->  shared/components
```

- **Page**: compone la vista, invoca el hook y maneja estados de carga/error.
- **Hook**: encapsula TanStack Query (cache, loading, error).
- **Service**: una funcion = una operacion HTTP tipada.
- **Type**: contrato de datos alineado con el DTO del backend.
- **UI (feature)**: presenta datos del dominio usando componentes `shared`.

---

## 4. Flujo de datos (ejemplo: Clientes)

```
1. Usuario navega a /clientes
2. router monta ClientesPage dentro de MainLayout
3. ClientesPage invoca useGetClientes()
4. useGetClientes ejecuta useQuery({ queryKey, queryFn: getClientes })
5. getClientes() llama a axiosInstance.get('/clientes')
6. axiosInstance usa baseURL = VITE_API_URL
7. El backend responde Cliente[]
8. TanStack Query cachea y expone { data, isLoading, isError }
9. ClientesPage pasa data a <ClienteTablePlaceholder />
10. ClienteTablePlaceholder renderiza con <DataTable /> (shared)
```

---

## 5. Reglas de dependencia

```
pages/             -> features/*, shared/, layout/
features/ui/       -> shared/, features/*/types (solo tipos)
features/hooks/    -> features/*/services, features/*/types, shared/constants
features/services/ -> config/axios, features/*/types
shared/            -> NO importa features/
config/            -> NO importa features/
```

---

## 6. Stack tecnologico

| Libreria | Uso |
|---|---|
| React + TypeScript | UI y tipado fuerte |
| Vite | Bundler y servidor de desarrollo |
| React Router | Enrutamiento |
| Axios | Cliente HTTP |
| TanStack Query | Data fetching y cache |
| TanStack Table | Tablas (DataTable generico) |

Se reservan para fases posteriores: validacion de formularios (TanStack Forms / React
Hook Form + Zod) y estado global (Zustand), que se agregaran por modulo cuando sea
necesario.

---

## 7. Alcance de la etapa actual

Esta etapa entrega una **plantilla base compilable**, no funcionalidad completa.

Incluye:
- Estructura de carpetas y capas completas.
- Navegacion entre Home y los 8 modulos.
- Servicios, hooks y tipos listos por modulo.

No incluye (fases posteriores):
- CRUD funcional ni mutaciones.
- Validaciones de formularios.
- Llamadas HTTP reales (los hooks usan `enabled: false`).
- Autenticacion y guards de ruta.
