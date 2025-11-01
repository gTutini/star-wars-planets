import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { PlanetList } from "./PlanetList";
import type { Planet } from "@/planets/contracts";
import type { Film } from "@/films/contracts";
import type { PlanetsResponse } from "@/planets/services/fetchPlanets";
import type { FilmsResponse } from "@/films/services/fetchFilms";
import * as fetchPlanetsModule from "@/planets/services/fetchPlanets";
import * as fetchFilmsModule from "@/films/services/fetchFilms";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

vi.mock("@/planets/components/PlanetCard", () => ({
  PlanetCard: ({ planet }: { planet: Planet; films: Film[] }) => (
    <div role="listitem" data-testid={`planet-card-${planet.name}`}>
      {planet.name}
    </div>
  ),
}));

vi.mock("@/ui/components/Pagination", () => ({
  Pagination: ({
    currentPage,
    hasNext,
    hasPrevious,
  }: {
    currentPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
  }) => (
    <div data-testid="pagination">
      Page {currentPage} - Next: {hasNext.toString()} - Previous:{" "}
      {hasPrevious.toString()}
    </div>
  ),
}));

describe("PlanetList", () => {
  const mockFetchPlanets = vi.spyOn(fetchPlanetsModule, "fetchPlanets");
  const mockFetchFilms = vi.spyOn(fetchFilmsModule, "fetchFilms");

  const mockPlanet1: Planet = {
    name: "Tatooine",
    url: "https://swapi.dev/api/planets/1/",
    climate: "arid",
    terrain: "desert",
    population: "200000",
    diameter: "10465",
    rotation_period: "23",
    orbital_period: "304",
    gravity: "1 standard",
    surface_water: "1",
    residents: [],
    films: [],
    created: "2014-12-09T13:50:49.641000Z",
    edited: "2014-12-20T20:58:18.411000Z",
  };

  const mockPlanet2: Planet = {
    name: "Alderaan",
    url: "https://swapi.dev/api/planets/2/",
    climate: "temperate",
    terrain: "grasslands, mountains",
    population: "2000000000",
    diameter: "12500",
    rotation_period: "24",
    orbital_period: "364",
    gravity: "1 standard",
    surface_water: "40",
    residents: [],
    films: [],
    created: "2014-12-10T11:35:48.479000Z",
    edited: "2014-12-20T20:58:18.420000Z",
  };

  const mockPlanet3: Planet = {
    name: "Hoth",
    url: "https://swapi.dev/api/planets/4/",
    climate: "frozen",
    terrain: "tundra, ice caves, mountain ranges",
    population: "unknown",
    diameter: "7200",
    rotation_period: "23",
    orbital_period: "549",
    gravity: "1.1 standard",
    surface_water: "100",
    residents: [],
    films: [],
    created: "2014-12-10T11:39:13.934000Z",
    edited: "2014-12-20T20:58:18.423000Z",
  };

  const mockFilm: Film = {
    title: "A New Hope",
    episode_id: 4,
    planets: ["https://swapi.dev/api/planets/1/"],
    url: "https://swapi.dev/api/films/1/",
    opening_crawl: "",
    director: "",
    producer: "",
    release_date: "",
    characters: [],
    starships: [],
    vehicles: [],
    species: [],
    created: "2014-12-10T14:23:31.880000Z",
    edited: "2014-12-20T19:49:45.256000Z",
  };

  const mockPlanetsResponse: PlanetsResponse = {
    count: 3,
    next: "https://swapi.dev/api/planets/?page=2",
    previous: null,
    results: [mockPlanet1, mockPlanet2, mockPlanet3],
  };

  const mockFilmsResponse: FilmsResponse = {
    count: 1,
    next: null,
    previous: null,
    results: [mockFilm],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("renderização básica", () => {
    it("deve renderizar lista de planetas com todos os elementos e estrutura acessível", async () => {
      mockFetchPlanets.mockResolvedValue(mockPlanetsResponse);
      mockFetchFilms.mockResolvedValue(mockFilmsResponse);

      const component = await PlanetList({});

      render(component);

      const region = screen.getByRole("region", { name: "Planets list" });
      expect(region).toBeInTheDocument();

      const list = screen.getByRole("list", {
        name: "3 planets found, showing page 1",
      });
      expect(list).toBeInTheDocument();

      expect(screen.getByTestId("planet-card-Tatooine")).toBeInTheDocument();
      expect(screen.getByTestId("planet-card-Alderaan")).toBeInTheDocument();
      expect(screen.getByTestId("planet-card-Hoth")).toBeInTheDocument();

      const pagination = screen.getByTestId("pagination");
      expect(pagination).toBeInTheDocument();
      expect(pagination).toHaveTextContent("Page 1");
      expect(pagination).toHaveTextContent("Next: true");
      expect(pagination).toHaveTextContent("Previous: false");
    });
  });

  describe("busca", () => {
    it("deve chamar fetchPlanets e incluir termo de busca no aria-label", async () => {
      mockFetchPlanets.mockResolvedValue(mockPlanetsResponse);
      mockFetchFilms.mockResolvedValue(mockFilmsResponse);

      const component = await PlanetList({ search: "desert" });

      expect(mockFetchPlanets).toHaveBeenCalledWith("desert", undefined);

      render(component);

      const list = screen.getByRole("list", {
        name: '3 planets found for "desert", showing page 1',
      });
      expect(list).toBeInTheDocument();
    });

    it("deve exibir mensagem acessível quando não encontrar resultados", async () => {
      const emptyResponse: PlanetsResponse = {
        count: 0,
        next: null,
        previous: null,
        results: [],
      };

      mockFetchPlanets.mockResolvedValue(emptyResponse);
      mockFetchFilms.mockResolvedValue(mockFilmsResponse);

      const component = await PlanetList({ search: "nonexistent" });

      render(component);

      const status = screen.getByRole("status");
      expect(status).toBeInTheDocument();
      expect(status).toHaveAttribute("aria-live", "polite");
      expect(
        screen.getByText(
          /No planets found for "nonexistent"\. Try a different search term\./
        )
      ).toBeInTheDocument();
    });
  });

  describe("paginação", () => {
    it("deve chamar fetchPlanets e incluir número da página no aria-label", async () => {
      mockFetchPlanets.mockResolvedValue(mockPlanetsResponse);
      mockFetchFilms.mockResolvedValue(mockFilmsResponse);

      const component = await PlanetList({ page: "5" });

      expect(mockFetchPlanets).toHaveBeenCalledWith(undefined, "5");

      render(component);

      const list = screen.getByRole("list", {
        name: "3 planets found, showing page 5",
      });
      expect(list).toBeInTheDocument();
    });

    it("deve passar hasNext e hasPrevious corretamente para Pagination", async () => {
      const middlePageResponse: PlanetsResponse = {
        ...mockPlanetsResponse,
        previous: "https://swapi.dev/api/planets/?page=1",
      };

      mockFetchPlanets.mockResolvedValue(middlePageResponse);
      mockFetchFilms.mockResolvedValue(mockFilmsResponse);

      const component = await PlanetList({ page: "2" });

      render(component);

      const pagination = screen.getByTestId("pagination");
      expect(pagination).toHaveTextContent("Next: true");
      expect(pagination).toHaveTextContent("Previous: true");
    });

    it("deve passar hasNext e hasPrevious como false quando são null", async () => {
      const lastPageResponse: PlanetsResponse = {
        ...mockPlanetsResponse,
        next: null,
      };

      mockFetchPlanets.mockResolvedValue(lastPageResponse);
      mockFetchFilms.mockResolvedValue(mockFilmsResponse);

      const component = await PlanetList({ page: "10" });

      render(component);

      const pagination = screen.getByTestId("pagination");
      expect(pagination).toHaveTextContent("Next: false");
      expect(pagination).toHaveTextContent("Previous: false");
    });
  });

  describe("busca e paginação combinadas", () => {
    it("deve chamar fetchPlanets com search e page e incluir ambos no aria-label", async () => {
      mockFetchPlanets.mockResolvedValue(mockPlanetsResponse);
      mockFetchFilms.mockResolvedValue(mockFilmsResponse);

      const component = await PlanetList({ search: "ice", page: "3" });

      expect(mockFetchPlanets).toHaveBeenCalledWith("ice", "3");

      render(component);

      const list = screen.getByRole("list", {
        name: '3 planets found for "ice", showing page 3',
      });
      expect(list).toBeInTheDocument();
    });
  });

  describe("integração com serviços", () => {
    it("deve chamar fetchPlanets e fetchFilms", async () => {
      mockFetchPlanets.mockResolvedValue(mockPlanetsResponse);
      mockFetchFilms.mockResolvedValue(mockFilmsResponse);

      await PlanetList({});

      expect(mockFetchPlanets).toHaveBeenCalledTimes(1);
      expect(mockFetchFilms).toHaveBeenCalledTimes(1);
    });
  });

  describe("cenários de borda", () => {
    it("deve renderizar com array vazio de planetas (sem search)", async () => {
      const emptyResponse: PlanetsResponse = {
        count: 0,
        next: null,
        previous: null,
        results: [],
      };

      mockFetchPlanets.mockResolvedValue(emptyResponse);
      mockFetchFilms.mockResolvedValue(mockFilmsResponse);

      const component = await PlanetList({});

      render(component);

      const list = screen.getByRole("list", {
        name: "0 planets found, showing page 1",
      });
      expect(list).toBeInTheDocument();
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });

    it("deve renderizar com um único planeta", async () => {
      const singlePlanetResponse: PlanetsResponse = {
        count: 1,
        next: null,
        previous: null,
        results: [mockPlanet1],
      };

      mockFetchPlanets.mockResolvedValue(singlePlanetResponse);
      mockFetchFilms.mockResolvedValue(mockFilmsResponse);

      const component = await PlanetList({});

      render(component);

      const list = screen.getByRole("list", {
        name: "1 planets found, showing page 1",
      });
      expect(list).toBeInTheDocument();
      expect(screen.getByTestId("planet-card-Tatooine")).toBeInTheDocument();
    });

    it("deve renderizar com número de página muito alto", async () => {
      mockFetchPlanets.mockResolvedValue(mockPlanetsResponse);
      mockFetchFilms.mockResolvedValue(mockFilmsResponse);

      const component = await PlanetList({ page: "999" });

      render(component);

      const pagination = screen.getByTestId("pagination");
      expect(pagination).toHaveTextContent("Page 999");
    });
  });
});
