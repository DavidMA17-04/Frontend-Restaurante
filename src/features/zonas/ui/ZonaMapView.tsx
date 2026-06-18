import { useState } from "react";
import { useZonaMapData } from "@/features/zonas/hooks/useZonaMapData";
import { AlertMessage, Loader } from "@/shared/components/feedback";
import { PageSectionCard } from "@/shared/components/layout/PageSectionCard";
import { Input } from "@/shared/components/ui/Input";
import { toDateOnly } from "@/shared/utils/dateTime";
import { ZonaFloorPlan } from "./ZonaFloorPlan";
import { ZonaMapLegend } from "./ZonaMapLegend";
import { ZonaMapSummary } from "./ZonaMapSummary";

const now = new Date();

/** Vista principal del mapa interactivo de zonas y mesas. */
export const ZonaMapView = () => {
  const [fecha, setFecha] = useState(toDateOnly(now));
  const [hora, setHora] = useState(
    `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`,
  );

  const { zonasMap, isLoading, isError } = useZonaMapData({ fecha, hora });

  return (
    <div className="space-y-6">
      <PageSectionCard
        title="Consulta de disponibilidad"
        description="Selecciona fecha y hora para ver el estado de cada mesa (ventana de 2 horas)."
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <Input
            id="mapa-fecha"
            label="Fecha"
            type="date"
            value={fecha}
            onChange={(event) => setFecha(event.target.value)}
            className="sm:max-w-[200px]"
          />
          <Input
            id="mapa-hora"
            label="Hora"
            type="time"
            value={hora}
            onChange={(event) => setHora(event.target.value)}
            className="sm:max-w-[160px]"
          />
          <ZonaMapLegend />
        </div>
      </PageSectionCard>

      {isLoading && <Loader label="Cargando mapa del salon..." />}
      {isError && (
        <AlertMessage
          variant="error"
          message="Error al cargar datos del mapa."
        />
      )}

      {!isLoading && !isError && (
        <>
          <PageSectionCard title="Resumen por zona">
            <ZonaMapSummary zonasMap={zonasMap} />
          </PageSectionCard>

          <PageSectionCard title="Plano del salon">
            <ZonaFloorPlan zonasMap={zonasMap} />
          </PageSectionCard>
        </>
      )}
    </div>
  );
};
