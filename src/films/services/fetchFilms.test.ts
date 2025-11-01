import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchFilms } from "./fetchFilms";

global.fetch = vi.fn();

describe("fetchFilms", () => {
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
      count: 0,
      next: null,
      previous: null,
      results: [],
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    await fetchFilms();

    expect(fetch).toHaveBeenCalledWith(`${mockApiUrl}/films/`);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  describe("erros", () => {
    it("deve lançar erro quando a resposta não é ok (404)", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found",
      } as Response);

      await expect(fetchFilms()).rejects.toThrow(
        "Failed to fetch films: 404 Not Found"
      );
    });

    it("deve lançar erro quando a resposta não é ok (500)", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      } as Response);

      await expect(fetchFilms()).rejects.toThrow(
        "Failed to fetch films: 500 Internal Server Error"
      );
    });

    it("deve propagar erro de rede", async () => {
      const networkError = new Error("Network error");
      vi.mocked(fetch).mockRejectedValueOnce(networkError);

      await expect(fetchFilms()).rejects.toThrow("Network error");
    });
  });
});
