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
    .map((url) => url.split("/").filter(Boolean).pop())
    .filter((id): id is string => id !== undefined);

  const hasVehicles = vehicleIds.length > 0;

  return {
    vehicleIds,
    hasVehicles,
  };
}
