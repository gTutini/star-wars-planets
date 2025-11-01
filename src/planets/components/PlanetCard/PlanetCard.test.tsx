import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { PlanetCard } from "./PlanetCard";
import type { Planet } from "@/planets/contracts";
import type { Film } from "@/films/contracts";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

describe("PlanetCard", () => {
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

  describe("renderização básica", () => {
    it("deve renderizar o nome do planeta como heading com estrutura acessível", () => {
      render(<PlanetCard planet={mockPlanet} films={[]} />);

      const heading = screen.getByRole("heading", { name: "Tatooine" });
      expect(heading).toBeInTheDocument();

      const article = screen.getByRole("article", {
        name: "Tatooine planet information",
      });
      expect(article).toBeInTheDocument();
    });

    it("deve renderizar link para página de detalhes do planeta", () => {
      render(<PlanetCard planet={mockPlanet} films={[]} />);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/planet/1");
    });

    it("deve renderizar dados do planeta em lista", () => {
      render(<PlanetCard planet={mockPlanet} films={[]} />);

      expect(screen.getByText("Climate")).toBeInTheDocument();
      expect(screen.getByText("arid")).toBeInTheDocument();
      expect(screen.getByText("Terrain")).toBeInTheDocument();
      expect(screen.getByText("desert")).toBeInTheDocument();
      expect(screen.getByText("Population")).toBeInTheDocument();
      expect(screen.getByText("200000")).toBeInTheDocument();
      expect(screen.getByText("Diameter")).toBeInTheDocument();
      expect(screen.getByText("10465km")).toBeInTheDocument();
    });
  });

  describe("filmes", () => {
    it("deve renderizar badges de filmes em lista acessível", () => {
      render(<PlanetCard planet={mockPlanet} films={mockFilms} />);

      expect(screen.getByText("Featured In:")).toBeInTheDocument();
      expect(screen.getByText("A New Hope")).toBeInTheDocument();
      expect(screen.getByText("Return of the Jedi")).toBeInTheDocument();

      const filmsList = screen.getByRole("list", {
        name: "Films featuring Tatooine",
      });
      expect(filmsList).toBeInTheDocument();

      const filmBadges = within(filmsList).getAllByRole("listitem");
      expect(filmBadges).toHaveLength(2);
    });

    it("não deve renderizar seção de filmes quando planeta não aparece em nenhum filme", () => {
      const films: Film[] = [
        {
          ...mockFilms[0],
          planets: ["https://swapi.dev/api/planets/999/"],
        },
      ];

      render(<PlanetCard planet={mockPlanet} films={films} />);

      expect(screen.queryByText("Featured In:")).not.toBeInTheDocument();
    });

    it("não deve renderizar seção de filmes quando array está vazio", () => {
      render(<PlanetCard planet={mockPlanet} films={[]} />);

      expect(screen.queryByText("Featured In:")).not.toBeInTheDocument();
    });
  });

  describe("ícones", () => {
    it("deve renderizar ícone do planeta com label acessível", () => {
      render(<PlanetCard planet={mockPlanet} films={[]} />);

      const iconLabel = screen.getByText("Tatooine planet icon");
      expect(iconLabel).toBeInTheDocument();
    });

    it("deve renderizar ícone de filme com label acessível quando há filmes", () => {
      render(<PlanetCard planet={mockPlanet} films={mockFilms} />);

      const filmIconLabel = screen.getByText("Films");
      expect(filmIconLabel).toBeInTheDocument();
    });
  });

  describe("cenários de borda", () => {
    it("deve extrair ID corretamente de URL sem barra final", () => {
      const planet = {
        ...mockPlanet,
        url: "https://swapi.dev/api/planets/42",
      };

      render(<PlanetCard planet={planet} films={[]} />);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/planet/42");
    });

    it("deve renderizar com nome longo do planeta", () => {
      const planet = {
        ...mockPlanet,
        name: "A Very Long Planet Name That Should Still Display Correctly",
      };

      render(<PlanetCard planet={planet} films={[]} />);

      expect(
        screen.getByRole("heading", {
          name: "A Very Long Planet Name That Should Still Display Correctly",
        })
      ).toBeInTheDocument();
    });
  });
});
