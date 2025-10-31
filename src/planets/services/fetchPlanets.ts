import { Planet } from "../contracts";

export interface PlanetsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
}

export async function fetchPlanets(
  search?: string,
  page?: string
): Promise<PlanetsResponse> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/planets`);

  if (search) {
    url.searchParams.set("search", search);
  }

  if (page) {
    url.searchParams.set("page", page);
  }

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(`Failed to fetch planets: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
