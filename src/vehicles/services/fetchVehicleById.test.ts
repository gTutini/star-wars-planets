import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchVehicleById } from "./fetchVehicleById";

global.fetch = vi.fn();

describe("fetchVehicleById", () => {
  const mockApiUrl = "https://swapi.dev/api";

  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", mockApiUrl);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("deve fazer fetch com a URL correta", async () => {
    const mockResponse = {
      name: "Sand Crawler",
      model: "Digger Crawler",
      manufacturer: "Corellia Mining Corporation",
      cost_in_credits: "150000",
      length: "36.8",
      max_atmosphering_speed: "30",
      crew: "46",
      passengers: "30",
      cargo_capacity: "50000",
      consumables: "2 months",
      vehicle_class: "wheeled",
      pilots: [],
      films: [],
      created: "2014-12-10T15:36:25.724000Z",
      edited: "2014-12-20T21:30:21.661000Z",
      url: "https://swapi.dev/api/vehicles/4/",
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    await fetchVehicleById("4");

    expect(fetch).toHaveBeenCalledWith(`${mockApiUrl}/vehicles/4`);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  describe("erros", () => {
    it("deve lançar erro específico quando a resposta é 404", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found",
      } as Response);

      await expect(fetchVehicleById("999")).rejects.toThrow(
        "Vehicle with ID 999 not found (404)"
      );
    });

    it("deve lançar erro quando a resposta não é ok (500)", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      } as Response);

      await expect(fetchVehicleById("4")).rejects.toThrow(
        "Failed to fetch vehicle 4: 500 Internal Server Error"
      );
    });

    it("deve propagar erro de rede", async () => {
      const networkError = new Error("Network error");
      vi.mocked(fetch).mockRejectedValueOnce(networkError);

      await expect(fetchVehicleById("4")).rejects.toThrow("Network error");
    });
  });
});
