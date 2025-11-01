import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { notFound } from "next/navigation";
import { fetchPlanetById } from "./fetchPlanetById";

global.fetch = vi.fn();

vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
}));

describe("fetchPlanetById", () => {
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
      name: "Tatooine",
      rotation_period: "23",
      orbital_period: "304",
      diameter: "10465",
      climate: "arid",
      gravity: "1 standard",
      terrain: "desert",
      surface_water: "1",
      population: "200000",
      residents: [],
      films: [],
      created: "2014-12-09T13:50:49.641000Z",
      edited: "2014-12-20T20:58:18.411000Z",
      url: "https://swapi.dev/api/planets/1/",
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    await fetchPlanetById("1");

    expect(fetch).toHaveBeenCalledWith(`${mockApiUrl}/planets/1`);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  describe("erros", () => {
    it("deve chamar notFound quando a resposta é 404", async () => {
      const notFoundError = new Error("NEXT_NOT_FOUND");
      vi.mocked(notFound).mockImplementationOnce(() => {
        throw notFoundError;
      });

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found",
      } as Response);

      await expect(fetchPlanetById("999")).rejects.toThrow("NEXT_NOT_FOUND");
      expect(notFound).toHaveBeenCalled();
    });

    it("deve lançar erro quando a resposta não é ok (500)", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      } as Response);

      await expect(fetchPlanetById("1")).rejects.toThrow(
        "Failed to fetch planet 1: 500 Internal Server Error"
      );
    });

    it("deve propagar erro de rede", async () => {
      const networkError = new Error("Network error");
      vi.mocked(fetch).mockRejectedValueOnce(networkError);

      await expect(fetchPlanetById("1")).rejects.toThrow("Network error");
    });
  });
});
