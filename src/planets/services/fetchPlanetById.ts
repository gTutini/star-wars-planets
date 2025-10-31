import { Planet } from "../contracts";

export async function fetchPlanetById(id: string): Promise<Planet> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/planets/${id}`);

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(
      `Erro ao buscar planeta pelo ID ${id}: ${res.status} ${res.statusText}`
    );
  }

  return res.json();
}
