import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchPeopleById } from "./fetchPeopleById";

global.fetch = vi.fn();

describe("fetchPeopleById", () => {
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
      birth_year: "19BBY",
      eye_color: "blue",
      films: [],
      gender: "male",
      hair_color: "blond",
      height: "172",
      homeworld: "https://swapi.dev/api/planets/1/",
      mass: "77",
      name: "Luke Skywalker",
      skin_color: "fair",
      created: "2014-12-09T13:50:51.644000Z",
      edited: "2014-12-20T21:17:56.891000Z",
      species: [],
      vehicles: [],
      url: "https://swapi.dev/api/people/1/",
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    await fetchPeopleById("1");

    expect(fetch).toHaveBeenCalledWith(`${mockApiUrl}/people/1`);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  describe("erros", () => {
    it("deve lançar erro específico quando a resposta é 404", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found",
      } as Response);

      await expect(fetchPeopleById("999")).rejects.toThrow(
        "Resident with ID 999 not found (404)"
      );
    });

    it("deve lançar erro quando a resposta não é ok (500)", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      } as Response);

      await expect(fetchPeopleById("1")).rejects.toThrow(
        "Failed to fetch resident 1: 500 Internal Server Error"
      );
    });

    it("deve propagar erro de rede", async () => {
      const networkError = new Error("Network error");
      vi.mocked(fetch).mockRejectedValueOnce(networkError);

      await expect(fetchPeopleById("1")).rejects.toThrow("Network error");
    });
  });
});
