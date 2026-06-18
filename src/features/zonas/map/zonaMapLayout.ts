export interface ZonaAreaLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface MesaPosition {
  x: number;
  y: number;
}

/** Posiciones relativas (%) del plano completo por zona. */
export const ZONA_AREAS: Record<number, ZonaAreaLayout> = {
  1: { x: 4, y: 6, width: 44, height: 42 },
  2: { x: 52, y: 6, width: 44, height: 42 },
  3: { x: 4, y: 52, width: 44, height: 42 },
  4: { x: 52, y: 52, width: 44, height: 42 },
};

/** Posiciones relativas (%) dentro del area de cada zona. */
export const MESA_POSITIONS_BY_ZONA: Record<
  number,
  Record<number, MesaPosition>
> = {
  1: {
    1: { x: 28, y: 38 },
    2: { x: 72, y: 38 },
    5: { x: 28, y: 72 },
    6: { x: 72, y: 72 },
  },
  2: {
    3: { x: 32, y: 55 },
    7: { x: 68, y: 55 },
  },
  3: {
    4: { x: 22, y: 50 },
    8: { x: 50, y: 50 },
    9: { x: 78, y: 50 },
  },
  4: {
    10: { x: 32, y: 50 },
    11: { x: 68, y: 50 },
  },
};

/** Calcula posiciones simetricas en grilla dentro de una zona. */
export const autoLayoutMesas = (
  mesaIds: number[],
): Record<number, MesaPosition> => {
  const count = mesaIds.length;
  if (count === 0) {
    return {};
  }

  const columns =
    count === 1 ? 1 : count === 2 ? 2 : count === 3 ? 3 : 2;
  const rows = Math.ceil(count / columns);
  const positions: Record<number, MesaPosition> = {};

  mesaIds.forEach((mesaId, index) => {
    const row = Math.floor(index / columns);
    const col = index % columns;
    const itemsInRow = Math.min(columns, count - row * columns);

    positions[mesaId] = {
      x: ((col + 1) / (itemsInRow + 1)) * 100,
      y: ((row + 1) / (rows + 1)) * 100,
    };
  });

  return positions;
};

export const resolveMesaPosition = (
  mesaId: number,
  zonaId: number,
  mesaIdsInZona: number[],
): MesaPosition => {
  const configured = MESA_POSITIONS_BY_ZONA[zonaId]?.[mesaId];
  if (configured) {
    return configured;
  }

  const autoPositions = autoLayoutMesas(mesaIdsInZona);
  return autoPositions[mesaId] ?? { x: 50, y: 50 };
};

export const toAbsolutePosition = (
  zonaArea: ZonaAreaLayout,
  mesaPos: MesaPosition,
) => ({
  x: zonaArea.x + (mesaPos.x / 100) * zonaArea.width,
  y: zonaArea.y + (mesaPos.y / 100) * zonaArea.height,
});
