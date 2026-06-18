import { useEffect, useRef, useState } from "react";
import { ZONA_AREAS } from "@/features/zonas/map/zonaMapLayout";
import type { ZonaMapModel } from "@/features/zonas/utils/mesaEstado";
import { Badge } from "@/shared/components/ui/Badge";
import { cn } from "@/shared/utils/cn";
import { MesaMapNode } from "./MesaMapNode";

interface ZonaFloorPlanProps {
  zonasMap: ZonaMapModel[];
}

/** Plano del salon con areas de zona y mesas interactivas. */
export const ZonaFloorPlan = ({ zonasMap }: ZonaFloorPlanProps) => {
  const [hoveredMesaId, setHoveredMesaId] = useState<number | null>(null);
  const [pinnedMesaId, setPinnedMesaId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setPinnedMesaId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMesaClick = (mesaId: number) => {
    setPinnedMesaId((current) => (current === mesaId ? null : mesaId));
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[520px] overflow-x-auto rounded-sm border border-border bg-surface-muted p-4"
    >
      <div className="relative mx-auto aspect-[16/10] min-w-[640px]">
        {zonasMap.map(({ zona, mesas, totalMesas, totalSillas }) => {
          const area = ZONA_AREAS[zona.id] ?? { x: 5, y: 5, width: 40, height: 40 };

          return (
            <div
              key={zona.id}
              className={cn(
                "absolute rounded-sm border-2 border-brand-500/40 bg-surface/80 p-2 backdrop-blur-sm dark:bg-surface/60",
                !zona.disponibilidad && "opacity-60 saturate-50",
              )}
              style={{
                left: `${area.x}%`,
                top: `${area.y}%`,
                width: `${area.width}%`,
                height: `${area.height}%`,
              }}
            >
              <div className="flex items-start justify-between gap-2 px-1">
                <h3 className="font-serif text-sm text-foreground">{zona.nombre}</h3>
                <Badge variant={zona.disponibilidad ? "neutral" : "danger"}>
                  {totalMesas} mesas · {totalSillas} sillas
                </Badge>
              </div>

              <div className="relative h-[calc(100%-2.5rem)] w-full px-2 pt-3">
                {mesas.map((mesa) => {
                  const relativePos = {
                    x: ((mesa.posicion.x - area.x) / area.width) * 100,
                    y: ((mesa.posicion.y - area.y) / area.height) * 100,
                  };

                  return (
                    <MesaMapNode
                      key={mesa.id}
                      mesa={{ ...mesa, posicion: relativePos }}
                      isPinned={pinnedMesaId === mesa.id}
                      isHovered={
                        hoveredMesaId === mesa.id && pinnedMesaId !== mesa.id
                      }
                      zonaDisponible={zona.disponibilidad}
                      onHover={setHoveredMesaId}
                      onClick={handleMesaClick}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
