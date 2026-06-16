import { env } from "@/config/env";
import { AlertMessage } from "@/shared/components/feedback";

interface MockDataBannerProps {
  entityName: string;
}

/**
 * Aviso visible cuando la app usa datos mock en lugar del backend real.
 */
export const MockDataBanner = ({ entityName }: MockDataBannerProps) => {
  if (!env.useMock) {
    return null;
  }

  return (
    <AlertMessage
      variant="info"
      title="Datos mock activos"
      message={`Estas viendo datos inventados de ${entityName}. Para usar el backend ASP.NET Core, cambia VITE_USE_MOCK=false en tu archivo .env.`}
      className="mb-6"
    />
  );
};
