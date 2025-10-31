import type { Resident } from "../contracts";

export async function fetchPeopleById(id: string): Promise<Resident> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/people/${id}`);

  const response = await fetch(url.toString());

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Resident with ID ${id} not found (404)`);
    }
    throw new Error(
      `Failed to fetch resident ${id}: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}
