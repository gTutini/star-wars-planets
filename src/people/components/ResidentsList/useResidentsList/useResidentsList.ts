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
    // Extrai o último segmento da URL (ID do residente)
    .map((url) => url.split("/").filter(Boolean).pop())
    // Filtra valores undefined e garante que apenas IDs numéricos sejam mantidos
    .filter((id): id is string => id !== undefined && /^\d+$/.test(id));

  const hasResidents = residentIds.length > 0;

  return {
    residentIds,
    hasResidents,
  };
}
