export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface PlanetsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
}

export async function fetchPlanets(): Promise<PlanetsResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/planets`);

  if (!res.ok) {
    throw new Error(`Erro ao buscar planetas: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
