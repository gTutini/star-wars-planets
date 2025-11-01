import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchPlanets } from "./fetchPlanets";

global.fetch = vi.fn();

describe("fetchPlanets", () => {
  const mockApiUrl = "https://swapi.dev/api";

  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", mockApiUrl);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("deve fazer fetch com a URL correta sem parâmetros", async () => {
    const mockResponse = {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    await fetchPlanets();

    expect(fetch).toHaveBeenCalledWith(`${mockApiUrl}/planets`);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("deve fazer fetch com parâmetro de busca", async () => {
    const mockResponse = {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    await fetchPlanets("Tatooine");

    expect(fetch).toHaveBeenCalledWith(`${mockApiUrl}/planets?search=Tatooine`);
  });

  it("deve fazer fetch com parâmetro de página", async () => {
    const mockResponse = {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    await fetchPlanets(undefined, "2");

    expect(fetch).toHaveBeenCalledWith(`${mockApiUrl}/planets?page=2`);
  });

  it("deve fazer fetch com ambos os parâmetros", async () => {
    const mockResponse = {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    await fetchPlanets("Hoth", "3");

    expect(fetch).toHaveBeenCalledWith(
      `${mockApiUrl}/planets?search=Hoth&page=3`
    );
  });

  describe("erros", () => {
    it("deve lançar erro quando a resposta não é ok (404)", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found",
      } as Response);

      await expect(fetchPlanets()).rejects.toThrow(
        "Failed to fetch planets: 404 Not Found"
      );
    });

    it("deve lançar erro quando a resposta não é ok (500)", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      } as Response);

      await expect(fetchPlanets()).rejects.toThrow(
        "Failed to fetch planets: 500 Internal Server Error"
      );
    });

    it("deve propagar erro de rede", async () => {
      const networkError = new Error("Network error");
      vi.mocked(fetch).mockRejectedValueOnce(networkError);

      await expect(fetchPlanets()).rejects.toThrow("Network error");
    });
  });
});
