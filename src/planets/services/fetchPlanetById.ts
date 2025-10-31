import { notFound } from "next/navigation";
import { Planet } from "../contracts";

export async function fetchPlanetById(id: string): Promise<Planet> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/planets/${id}`);

  const res = await fetch(url.toString());

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error(
      `Failed to fetch planet ${id}: ${res.status} ${res.statusText}`
    );
  }

  return res.json();
}
