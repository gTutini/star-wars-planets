interface UseVehiclesListParams {
  vehicleUrls: string[];
}

interface UseVehiclesListReturn {
  vehicleIds: string[];
  hasVehicles: boolean;
}

export function useVehiclesList({
  vehicleUrls,
}: UseVehiclesListParams): UseVehiclesListReturn {
  const vehicleIds = vehicleUrls
    // Extrai o último segmento da URL (ID do veículo)
    .map((url) => url.split("/").filter(Boolean).pop())
    // Filtra valores undefined e garante que apenas IDs numéricos sejam mantidos
    .filter((id): id is string => id !== undefined && /^\d+$/.test(id));

  const hasVehicles = vehicleIds.length > 0;

  return {
    vehicleIds,
    hasVehicles,
  };
}
