import { describe, it, expect } from "vitest";
import { usePlanetCard } from "./usePlanetCard";
import type { Planet } from "@/planets/contracts";
import type { Film } from "@/films/contracts";

describe("usePlanetCard", () => {
  const mockPlanet: Planet = {
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

  const mockFilms: Film[] = [
    {
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
    },
    {
      title: "The Empire Strikes Back",
      episode_id: 5,
      planets: ["https://swapi.dev/api/planets/4/"],
      url: "https://swapi.dev/api/films/2/",
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
    },
    {
      title: "Return of the Jedi",
      episode_id: 6,
      planets: ["https://swapi.dev/api/planets/1/"],
      url: "https://swapi.dev/api/films/3/",
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
    },
  ];

  describe("extração de ID do planeta", () => {
    it("deve extrair ID da URL do planeta com barra final", () => {
      const planet = {
        ...mockPlanet,
        url: "https://swapi.dev/api/planets/5/",
      };

      const { planetId } = usePlanetCard({ planet, films: [] });

      expect(planetId).toBe("5");
    });

    it("deve extrair ID da URL do planeta sem barra final", () => {
      const planet = {
        ...mockPlanet,
        url: "https://swapi.dev/api/planets/10",
      };

      const { planetId } = usePlanetCard({ planet, films: [] });

      expect(planetId).toBe("10");
    });

    it("deve extrair IDs de diferentes comprimentos", () => {
      const testCases = [
        { url: "https://swapi.dev/api/planets/1/", expected: "1" },
        { url: "https://swapi.dev/api/planets/42/", expected: "42" },
        { url: "https://swapi.dev/api/planets/100/", expected: "100" },
      ];

      testCases.forEach(({ url, expected }) => {
        const planet = { ...mockPlanet, url };
        const { planetId } = usePlanetCard({ planet, films: [] });
        expect(planetId).toBe(expected);
      });
    });
  });

  describe("filtragem de filmes", () => {
    it("deve retornar títulos de filmes onde o planeta aparece", () => {
      const { filmTitles } = usePlanetCard({
        planet: mockPlanet,
        films: mockFilms,
      });

      expect(filmTitles).toEqual(["A New Hope", "Return of the Jedi"]);
      expect(filmTitles).toHaveLength(2);
    });

    it("deve retornar array vazio quando planeta não aparece em nenhum filme", () => {
      const planet = {
        ...mockPlanet,
        url: "https://swapi.dev/api/planets/999/",
      };

      const { filmTitles } = usePlanetCard({ planet, films: mockFilms });

      expect(filmTitles).toEqual([]);
      expect(filmTitles).toHaveLength(0);
    });

    it("deve retornar array vazio quando não há filmes", () => {
      const { filmTitles } = usePlanetCard({ planet: mockPlanet, films: [] });

      expect(filmTitles).toEqual([]);
    });

    it("deve preservar a ordem dos filmes", () => {
      const planet = {
        ...mockPlanet,
        url: "https://swapi.dev/api/planets/1/",
      };

      const filmsInOrder = [
        { ...mockFilms[0], title: "First Film", planets: [planet.url] },
        { ...mockFilms[1], title: "Second Film", planets: [planet.url] },
        { ...mockFilms[2], title: "Third Film", planets: [planet.url] },
      ];

      const { filmTitles } = usePlanetCard({ planet, films: filmsInOrder });

      expect(filmTitles).toEqual(["First Film", "Second Film", "Third Film"]);
    });
  });

  describe("dados do planeta", () => {
    it("deve retornar dados formatados do planeta", () => {
      const { planetData } = usePlanetCard({
        planet: mockPlanet,
        films: mockFilms,
      });

      expect(planetData).toHaveLength(4);
      expect(planetData[0].label).toBe("Climate");
      expect(planetData[0].value).toBe("arid");
      expect(planetData[0].icon).toBeDefined();

      expect(planetData[1].label).toBe("Terrain");
      expect(planetData[1].value).toBe("desert");
      expect(planetData[1].icon).toBeDefined();

      expect(planetData[2].label).toBe("Population");
      expect(planetData[2].value).toBe("200000");
      expect(planetData[2].icon).toBeDefined();

      expect(planetData[3].label).toBe("Diameter");
      expect(planetData[3].value).toBe("10465km");
      expect(planetData[3].icon).toBeDefined();
    });

    it("deve adicionar sufixo km ao diâmetro", () => {
      const planet = {
        ...mockPlanet,
        diameter: "12500",
      };

      const { planetData } = usePlanetCard({ planet, films: [] });

      const diameterData = planetData.find((data) => data.label === "Diameter");
      expect(diameterData?.value).toBe("12500km");
    });

    it("deve manter valores originais para clima, terreno e população", () => {
      const planet = {
        ...mockPlanet,
        climate: "tropical",
        terrain: "mountains",
        population: "1000000",
      };

      const { planetData } = usePlanetCard({ planet, films: [] });

      expect(planetData[0].value).toBe("tropical");
      expect(planetData[1].value).toBe("mountains");
      expect(planetData[2].value).toBe("1000000");
    });
  });

  describe("cenários de borda", () => {
    it("deve lidar com múltiplos filmes contendo o mesmo planeta", () => {
      const planet = {
        ...mockPlanet,
        url: "https://swapi.dev/api/planets/1/",
      };

      const allFilmsWithPlanet = mockFilms.map((film) => ({
        ...film,
        planets: [planet.url],
      }));

      const { filmTitles } = usePlanetCard({
        planet,
        films: allFilmsWithPlanet,
      });

      expect(filmTitles).toHaveLength(3);
      expect(filmTitles).toContain("A New Hope");
      expect(filmTitles).toContain("The Empire Strikes Back");
      expect(filmTitles).toContain("Return of the Jedi");
    });
  });
});
