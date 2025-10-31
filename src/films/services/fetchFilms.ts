import { Film } from "../contracts";

export interface FilmsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Film[];
}

export async function fetchFilms(): Promise<FilmsResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/films/`);

  if (!res.ok) {
    throw new Error(`Erro ao buscar filmes: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
