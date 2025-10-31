import { Vehicle } from "../contracts";

export async function fetchVehicleById(id: string): Promise<Vehicle> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/vehicles/${id}`);

  const res = await fetch(url.toString());

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(`Vehicle with ID ${id} not found (404)`);
    }
    throw new Error(
      `Failed to fetch vehicle ${id}: ${res.status} ${res.statusText}`
    );
  }

  return res.json();
}
