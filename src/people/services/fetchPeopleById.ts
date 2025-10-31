import type { Resident } from "../contracts";

export async function fetchPeopleById(id: string): Promise<Resident> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/people/${id}`);

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Failed to fetch person with id ${id}`);
  }

  return response.json();
}
