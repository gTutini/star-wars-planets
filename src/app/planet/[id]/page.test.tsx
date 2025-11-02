import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import PlanetPage from "./page";
import type { Planet } from "@/planets/contracts";
import * as fetchPlanetByIdModule from "@/planets/services/fetchPlanetById";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

vi.mock("@/people/components", () => ({
  ResidentsList: ({ residentUrls }: { residentUrls: string[] }) => (
    <div data-testid="residents-list" data-count={residentUrls.length}>
      ResidentsList - {residentUrls.length} residents
    </div>
  ),
}));

vi.mock("@/planets/components", () => ({
  PlanetDetailCard: ({
    title,
    value,
    badges,
    badgeColor,
  }: {
    title: string;
    value?: string;
    badges?: string[];
    badgeColor?: string;
  }) => (
    <div
      data-testid={`detail-card-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div data-testid={`card-title`}>{title}</div>
      {value && <div data-testid="card-value">{value}</div>}
      {badges && (
        <div data-testid="card-badges" data-color={badgeColor}>
          {badges.join(", ")}
        </div>
      )}
    </div>
  ),
}));

describe("PlanetPage", () => {
  const mockFetchPlanetById = vi.spyOn(
    fetchPlanetByIdModule,
    "fetchPlanetById"
  );

  const mockPlanet: Planet = {
    name: "Tatooine",
    url: "https://swapi.dev/api/planets/1/",
    climate: "arid, hot",
    terrain: "desert, mountains",
    population: "200000",
    diameter: "10465",
    rotation_period: "23",
    orbital_period: "304",
    gravity: "1 standard",
    surface_water: "1",
    residents: [
      "https://swapi.dev/api/people/1/",
      "https://swapi.dev/api/people/2/",
    ],
    films: [],
    created: "2014-12-09T13:50:49.641000Z",
    edited: "2014-12-20T20:58:18.411000Z",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("renderização e integração", () => {
    it("deve chamar fetchPlanetById com o ID correto", async () => {
      mockFetchPlanetById.mockResolvedValue(mockPlanet);

      await PlanetPage({
        params: Promise.resolve({ id: "5" }),
      });

      expect(mockFetchPlanetById).toHaveBeenCalledWith("5");
      expect(mockFetchPlanetById).toHaveBeenCalledTimes(1);
    });

    it("deve renderizar heading e descrição do planeta", async () => {
      mockFetchPlanetById.mockResolvedValue(mockPlanet);

      const component = await PlanetPage({
        params: Promise.resolve({ id: "5" }),
      });

      render(component);

      const heading = screen.getByRole("heading", { name: "Tatooine" });
      expect(heading).toBeInTheDocument();

      expect(
        screen.getByText("Basic details about the planet")
      ).toBeInTheDocument();
    });

    it("deve renderizar link de navegação Go Back", async () => {
      mockFetchPlanetById.mockResolvedValue(mockPlanet);

      const component = await PlanetPage({
        params: Promise.resolve({ id: "5" }),
      });

      render(component);

      const backLink = screen.getByRole("link", { name: /Go Back/i });
      expect(backLink).toBeInTheDocument();
      expect(backLink).toHaveAttribute("href", "/");
    });

    it("deve renderizar todos os cards de detalhes do planeta", async () => {
      mockFetchPlanetById.mockResolvedValue(mockPlanet);

      const component = await PlanetPage({
        params: Promise.resolve({ id: "5" }),
      });

      render(component);

      expect(
        screen.getByTestId("detail-card-rotation-period")
      ).toBeInTheDocument();
      expect(screen.getByTestId("detail-card-diameter")).toBeInTheDocument();
      expect(screen.getByTestId("detail-card-climate")).toBeInTheDocument();
      expect(screen.getByTestId("detail-card-gravity")).toBeInTheDocument();
      expect(screen.getByTestId("detail-card-population")).toBeInTheDocument();
      expect(screen.getByTestId("detail-card-terrain")).toBeInTheDocument();
    });

    it("deve renderizar ResidentsList com quantidade correta de residentes", async () => {
      mockFetchPlanetById.mockResolvedValue(mockPlanet);

      const component = await PlanetPage({
        params: Promise.resolve({ id: "5" }),
      });

      render(component);

      const residentsList = screen.getByTestId("residents-list");
      expect(residentsList).toBeInTheDocument();
      expect(residentsList).toHaveAttribute("data-count", "2");
      expect(residentsList).toHaveTextContent("2 residents");
    });
  });

  describe("cenários de borda", () => {
    it("deve renderizar planeta sem residentes", async () => {
      const planetWithoutResidents: Planet = {
        ...mockPlanet,
        residents: [],
      };

      mockFetchPlanetById.mockResolvedValue(planetWithoutResidents);

      const component = await PlanetPage({
        params: Promise.resolve({ id: "2" }),
      });

      render(component);

      const residentsList = screen.getByTestId("residents-list");
      expect(residentsList).toHaveAttribute("data-count", "0");
    });

    it("deve lidar com valores unknow e múltiplos climas/terrenos", async () => {
      const complexPlanet: Planet = {
        ...mockPlanet,
        name: "Complex Planet",
        climate: "frozen, temperate, tropical",
        terrain: "mountains, forests, oceans, deserts",
        population: "unknown",
        gravity: "unknown",
      };

      mockFetchPlanetById.mockResolvedValue(complexPlanet);

      const component = await PlanetPage({
        params: Promise.resolve({ id: "99" }),
      });

      render(component);

      expect(
        screen.getByRole("heading", { name: "Complex Planet" })
      ).toBeInTheDocument();

      const climateBadges = screen.getAllByTestId("card-badges")[0];
      expect(climateBadges).toHaveTextContent("frozen, temperate, tropical");

      const terrainBadges = screen.getAllByTestId("card-badges")[1];
      expect(terrainBadges).toHaveTextContent(
        "mountains, forests, oceans, deserts"
      );
    });
  });
});
