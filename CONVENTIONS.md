# Estandares de Nomenclatura - Sistema Restaurante

Basado en las convenciones de la plantilla academica `Sistema-Ecommerce-2026`,
adaptadas a la arquitectura Layer-Based + features de este proyecto.

---

## Archivos y carpetas

- **Carpetas**: `kebab-case` (ej. `bloqueos-mesa`, `lista-espera`).
- **Componentes React**: `PascalCase.tsx` (ej. `ClienteTablePlaceholder.tsx`).
- **Hooks, servicios, tipos, utils**: `camelCase.ts`.
- **Barrel exports**: `index.ts` (y `Index.tsx` solo para componentes shared).

---

## Componentes React

- Formato `PascalCase`, extension `.tsx`.
- Exportacion nombrada (no `export default`, salvo `App.tsx`).
- Los componentes de negocio viven en `features/{modulo}/ui/`.
- Los componentes genericos viven en `shared/components/`.

```tsx
export const ClienteTablePlaceholder = ({ data }: Props) => { ... };
```

---

## Hooks personalizados

- Prefijo obligatorio `use`, formato `camelCase`, extension `.ts`.
- Un hook por archivo. Los hooks de datos siguen el patron `useGet{Modulo}`.

```ts
export const useGetClientes = () => useQuery({ ... });
```

---

## Servicios / API

- Archivo `{modulo}Service.ts` dentro de `features/{modulo}/services/`.
- Funciones nombradas por accion: `get*`, `create*`, `update*`, `delete*`.
- Solo comunicacion HTTP; sin logica de React.

```ts
export const getClientes = async (): Promise<Cliente[]> => { ... };
```

---

## Tipos e interfaces

- Archivo `{modulo}Type.ts` dentro de `features/{modulo}/types/`.
- Formato `PascalCase` para el tipo, sin prefijo `I`.
- Tipos transversales en `shared/types/`.

```ts
export interface Cliente { id: number; nombre: string; ... }
```

---

## Constantes

- Formato `UPPER_SNAKE_CASE` para valores; objetos `as const` agrupados por tema.
- Ubicacion: `shared/constants/` (`apiConstants.ts`, `routeConstants.ts`,
  `queryKeyConstants.ts`).

```ts
export const API_TIMEOUT = 5000;
export const ROUTES = { home: "/", clientes: "/clientes" } as const;
```

---

## Imports

- Usar el alias `@/` para imports absolutos desde `src/`.
- Preferir el barrel `index.ts` de cada feature al importar desde fuera del modulo.

```ts
import { useGetClientes, ClienteTablePlaceholder } from "@/features/clientes";
import { DataTable } from "@/shared/components/tables";
```

---

## Reglas generales

**Siempre**:
- TypeScript con tipos explicitos.
- Respetar las reglas de dependencia entre capas (ver `ARQUITECTURA.md`).
- Nombrar archivos segun su contenido principal.

**Nunca**:
- Importar Axios desde la capa de presentacion.
- Usar React dentro de un servicio.
- Crear archivos genericos como `utils.ts` o `helpers.ts`.
- Que `shared/` o `config/` dependan de `features/`.
