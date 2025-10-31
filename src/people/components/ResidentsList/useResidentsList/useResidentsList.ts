interface UseResidentsListParams {
  residentUrls: string[];
}

interface UseResidentsListReturn {
  residentIds: string[];
  hasResidents: boolean;
}

export function useResidentsList({
  residentUrls,
}: UseResidentsListParams): UseResidentsListReturn {
  const residentIds = residentUrls
    .map((url) => url.split("/").filter(Boolean).pop())
    .filter((id): id is string => id !== undefined);

  const hasResidents = residentIds.length > 0;

  return {
    residentIds,
    hasResidents,
  };
}
