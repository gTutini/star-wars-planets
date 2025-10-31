import { Vehicle } from "../contracts";

export async function fetchVehicleById(id: string): Promise<Vehicle> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/vehicles/${id}`);

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(
      `Erro ao buscar veículo pelo ID ${id}: ${res.status} ${res.statusText}`
    );
  }

  return res.json();
}
