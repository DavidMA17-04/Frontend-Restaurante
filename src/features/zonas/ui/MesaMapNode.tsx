import { useMemo } from "react";
import { mesaChairStyles } from "@/features/zonas/constants/mesaEstadoStyles";
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

/** Desplaza la carta horizontalmente para que no se salga del area de la zona. */
const getPopoverOffsetClass = (x: number) => {
  if (x < 22) {
    return "left-0 translate-x-0";
  }
  if (x > 78) {
    return "right-0 left-auto translate-x-0";
  }
  if (x < 38) {
    return "left-1/2 -translate-x-[30%]";
  }
  if (x > 62) {
    return "left-1/2 -translate-x-[70%]";
  }
  return "left-1/2 -translate-x-1/2";
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
  const styles = mesaChairStyles[mesa.estado.tipo];
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
  const isActive = isPinned || isHovered;

  return (
    <div
      className={cn("absolute", showPopover && "z-50")}
      style={{
        left: `${mesa.posicion.x}%`,
        top: `${mesa.posicion.y}%`,
        transform: "translate(-50%, -50%)",
      }}
      onMouseLeave={() => onHover(null)}
    >
      <div className="relative">
        {showPopover && (
          <div
            className={cn(
              "absolute bottom-full z-50 mb-2 w-max",
              getPopoverOffsetClass(mesa.posicion.x),
              isPinned && "pointer-events-auto",
            )}
            onMouseEnter={() => onHover(mesa.id)}
          >
            <MesaInfoPopover
              numero={mesa.numero}
              capacidad={mesa.capacidad}
              estado={mesa.estado}
            />
          </div>
        )}

        <button
          type="button"
          className={cn(
            "relative flex items-center justify-center text-xs font-semibold transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
            tableBase,
            shape.className,
            !zonaDisponible && "opacity-50",
            isActive && "z-20 scale-110 ring-2 ring-brand-500/50",
          )}
          aria-label={`Mesa ${mesa.numero}, ${mesa.capacidad} personas, ${mesa.estado.tipo}`}
          aria-pressed={isPinned}
          onMouseEnter={() => onHover(mesa.id)}
          onClick={() => onClick(mesa.id)}
        >
          {chairs.map((chair, index) => (
            <span
              key={index}
            className={cn("absolute h-2.5 w-2.5 rounded-full", styles)}
              style={{
                left: `calc(50% + ${chair.x}px)`,
                top: `calc(50% + ${chair.y}px)`,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
          <span className="relative z-10">{mesa.numero}</span>
        </button>
      </div>
    </div>
  );
};
