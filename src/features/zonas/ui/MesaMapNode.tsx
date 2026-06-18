import { useMemo } from "react";
import type { MesaMapItem } from "@/features/zonas/utils/mesaEstado";
import { cn } from "@/shared/utils/cn";
import { MesaInfoPopover } from "./MesaInfoPopover";

interface MesaMapNodeProps {
  mesa: MesaMapItem;
  isPinned: boolean;
  isHovered: boolean;
  zonaDisponible: boolean;
  onHover: (mesaId: number | null) => void;
  onClick: (mesaId: number) => void;
}

const tableBase =
  "border border-border bg-surface-elevated text-foreground shadow-sm ring-1 ring-border/80 dark:bg-surface-muted dark:ring-brand-500/15";

const estadoStyles = {
  libre: {
    chair:
      "bg-emerald-500 ring-2 ring-emerald-600/40 dark:bg-emerald-400 dark:ring-emerald-300/50",
  },
  reservada: {
    chair:
      "bg-amber-500 ring-2 ring-amber-600/40 dark:bg-amber-400 dark:ring-amber-300/50",
  },
  bloqueada: {
    chair:
      "bg-red-500 ring-2 ring-red-600/40 dark:bg-red-400 dark:ring-red-300/50",
  },
};

const buildCircularChairPositions = (capacidad: number, radius: number) => {
  const count = Math.min(capacidad, 8);
  return Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  });
};

const buildRectChairPositions = (
  capacidad: number,
  halfW: number,
  halfH: number,
) => {
  const count = Math.min(capacidad, 10);
  const margin = 6;
  const positions: { x: number; y: number }[] = [];

  const topCount = Math.ceil(count / 4);
  const rightCount = Math.ceil((count - topCount) / 3);
  const bottomCount = Math.ceil((count - topCount - rightCount) / 2);
  const leftCount = count - topCount - rightCount - bottomCount;

  const placeOnEdge = (
    edgeCount: number,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
  ) => {
    for (let i = 0; i < edgeCount && positions.length < count; i += 1) {
      const t = (i + 1) / (edgeCount + 1);
      positions.push({
        x: startX + (endX - startX) * t,
        y: startY + (endY - startY) * t,
      });
    }
  };

  placeOnEdge(topCount, -halfW, -halfH - margin, halfW, -halfH - margin);
  placeOnEdge(rightCount, halfW + margin, -halfH, halfW + margin, halfH);
  placeOnEdge(bottomCount, halfW, halfH + margin, -halfW, halfH + margin);
  placeOnEdge(leftCount, -halfW - margin, halfH, -halfW - margin, -halfH);

  return positions.slice(0, count);
};

const getTableShape = (capacidad: number) => {
  if (capacidad > 4) {
    if (capacidad >= 8) {
      return {
        isRectangular: true,
        className: "h-14 w-20 rounded-xl",
        halfW: 40,
        halfH: 28,
      };
    }
    return {
      isRectangular: true,
      className: "h-12 w-16 rounded-xl",
      halfW: 32,
      halfH: 24,
    };
  }

  return {
    isRectangular: false,
    className: "h-12 w-12 rounded-full",
    halfW: 24,
    halfH: 24,
  };
};

/** Nodo interactivo de mesa en el plano. */
export const MesaMapNode = ({
  mesa,
  isPinned,
  isHovered,
  zonaDisponible,
  onHover,
  onClick,
}: MesaMapNodeProps) => {
  const styles = estadoStyles[mesa.estado.tipo];
  const shape = getTableShape(mesa.capacidad);
  const chairs = useMemo(() => {
    if (shape.isRectangular) {
      return buildRectChairPositions(
        mesa.capacidad,
        shape.halfW,
        shape.halfH,
      );
    }
    return buildCircularChairPositions(mesa.capacidad, 22);
  }, [mesa.capacidad, shape.halfH, shape.halfW, shape.isRectangular]);
  const showPopover = isPinned || isHovered;

  return (
    <div
      className="absolute"
      style={{
        left: `${mesa.posicion.x}%`,
        top: `${mesa.posicion.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <button
        type="button"
        className={cn(
          "relative flex items-center justify-center text-xs font-semibold transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
          tableBase,
          shape.className,
          !zonaDisponible && "opacity-50",
          (isPinned || isHovered) && "scale-110 ring-brand-500/40",
        )}
        aria-label={`Mesa ${mesa.numero}, ${mesa.capacidad} personas, ${mesa.estado.tipo}`}
        title={`Mesa ${mesa.numero} · ${mesa.capacidad} pers.`}
        onMouseEnter={() => onHover(mesa.id)}
        onMouseLeave={() => onHover(null)}
        onClick={() => onClick(mesa.id)}
      >
        {chairs.map((chair, index) => (
          <span
            key={index}
            className={cn(
              "absolute h-2.5 w-2.5 rounded-full",
              styles.chair,
            )}
            style={{
              left: `calc(50% + ${chair.x}px)`,
              top: `calc(50% + ${chair.y}px)`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
        <span className="relative z-10">{mesa.numero}</span>

        {showPopover && (
          <div
            className={cn(
              "absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2",
              isPinned && "pointer-events-auto",
            )}
          >
            <MesaInfoPopover
              numero={mesa.numero}
              capacidad={mesa.capacidad}
              estado={mesa.estado}
            />
          </div>
        )}
      </button>
    </div>
  );
};
