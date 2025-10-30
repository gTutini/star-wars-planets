// Tipos para a resposta da API SWAPI - Films
export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

export interface FilmsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Film[];
}

export async function fetchFilms(): Promise<FilmsResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/films/`);

  if (!res.ok) {
    throw new Error(`Failed to fetch films: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
