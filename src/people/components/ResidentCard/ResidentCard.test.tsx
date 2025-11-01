import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { ResidentCard } from "./ResidentCard";
import type { Resident } from "@/people/contracts";
import * as fetchPeopleByIdModule from "@/people/services/fetchPeopleById";

vi.mock("@radix-ui/themes", async () => {
  const actual = await vi.importActual("@radix-ui/themes");
  return {
    ...actual,
    Avatar: ({
      fallback,
      size,
      radius,
      color,
    }: {
      fallback: string;
      size: string;
      radius: string;
      color: string;
    }) => (
      <div
        data-testid="avatar"
        data-fallback={fallback}
        data-size={size}
        data-radius={radius}
        data-accent-color={color}
      >
        {fallback}
      </div>
    ),
  };
});

vi.mock("@/vehicles/components/VehiclesList", () => ({
  VehiclesList: ({ vehicleUrls }: { vehicleUrls: string[] }) => (
    <div data-testid="vehicles-list">{vehicleUrls.length} vehicles</div>
  ),
}));

describe("ResidentCard", () => {
  const mockFetchPeopleById = vi.spyOn(
    fetchPeopleByIdModule,
    "fetchPeopleById"
  );

  const mockResident: Resident = {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "19BBY",
    gender: "male",
    homeworld: "https://swapi.dev/api/planets/1/",
    films: ["https://swapi.dev/api/films/1/", "https://swapi.dev/api/films/2/"],
    species: [],
    vehicles: [
      "https://swapi.dev/api/vehicles/14/",
      "https://swapi.dev/api/vehicles/30/",
    ],
    created: "2014-12-09T13:50:51.644000Z",
    edited: "2014-12-20T21:17:56.891000Z",
    url: "https://swapi.dev/api/people/1/",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("renderização básica", () => {
    it("deve renderizar nome e informações básicas do residente", async () => {
      mockFetchPeopleById.mockResolvedValue(mockResident);

      const component = await ResidentCard({ residentId: "1" });
      render(component);

      expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
      expect(screen.getByText("blond")).toBeInTheDocument();
      expect(screen.getByText("blue")).toBeInTheDocument();
      expect(screen.getByText("male")).toBeInTheDocument();
    });

    it("deve chamar fetchPeopleById com o ID correto", async () => {
      mockFetchPeopleById.mockResolvedValue(mockResident);

      await ResidentCard({ residentId: "1" });

      expect(mockFetchPeopleById).toHaveBeenCalledWith("1");
      expect(mockFetchPeopleById).toHaveBeenCalledTimes(1);
    });

    it("deve renderizar avatar com inicial do nome", async () => {
      mockFetchPeopleById.mockResolvedValue(mockResident);

      const component = await ResidentCard({ residentId: "1" });
      render(component);

      const avatar = screen.getByTestId("avatar");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveTextContent("L");
    });
  });

  describe("badges de características", () => {
    it("deve renderizar todas as características do residente", async () => {
      const resident: Resident = {
        ...mockResident,
        hair_color: "brown",
        eye_color: "green",
        gender: "female",
      };

      mockFetchPeopleById.mockResolvedValue(resident);

      const component = await ResidentCard({ residentId: "5" });
      render(component);

      expect(screen.getByText("brown")).toBeInTheDocument();
      expect(screen.getByText("green")).toBeInTheDocument();
      expect(screen.getByText("female")).toBeInTheDocument();
    });
  });

  describe("integração com VehiclesList", () => {
    it("deve renderizar VehiclesList com URLs de veículos", async () => {
      mockFetchPeopleById.mockResolvedValue(mockResident);

      const component = await ResidentCard({ residentId: "1" });
      render(component);

      const vehiclesList = screen.getByTestId("vehicles-list");
      expect(vehiclesList).toBeInTheDocument();
      expect(vehiclesList).toHaveTextContent("2 vehicles");
    });

    it("deve passar array vazio quando residente não tem veículos", async () => {
      const resident: Resident = {
        ...mockResident,
        vehicles: [],
      };

      mockFetchPeopleById.mockResolvedValue(resident);

      const component = await ResidentCard({ residentId: "1" });
      render(component);

      const vehiclesList = screen.getByTestId("vehicles-list");
      expect(vehiclesList).toHaveTextContent("0 vehicles");
    });
  });

  describe("cenários de borda", () => {
    it("deve renderizar com nome longo", async () => {
      const resident: Resident = {
        ...mockResident,
        name: "A Very Long Resident Name That Should Still Display Correctly In The Card",
      };

      mockFetchPeopleById.mockResolvedValue(resident);

      const component = await ResidentCard({ residentId: "999" });
      render(component);

      expect(
        screen.getByText(
          "A Very Long Resident Name That Should Still Display Correctly In The Card"
        )
      ).toBeInTheDocument();
    });

    it("deve renderizar com características incomuns", async () => {
      const resident: Resident = {
        ...mockResident,
        hair_color: "none",
        eye_color: "black",
        gender: "n/a",
      };

      mockFetchPeopleById.mockResolvedValue(resident);

      const component = await ResidentCard({ residentId: "4" });
      render(component);

      expect(screen.getByText("none")).toBeInTheDocument();
      expect(screen.getByText("black")).toBeInTheDocument();
      expect(screen.getByText("n/a")).toBeInTheDocument();
    });

    it("deve renderizar com muitos veículos", async () => {
      const resident: Resident = {
        ...mockResident,
        vehicles: Array.from({ length: 10 }, (_, i) => `vehicle-${i}`),
      };

      mockFetchPeopleById.mockResolvedValue(resident);

      const component = await ResidentCard({ residentId: "1" });
      render(component);

      const vehiclesList = screen.getByTestId("vehicles-list");
      expect(vehiclesList).toHaveTextContent("10 vehicles");
    });
  });

  describe("integração com serviço", () => {
    it("deve renderizar dados retornados pelo fetchPeopleById", async () => {
      const customResident: Resident = {
        ...mockResident,
        name: "Leia Organa",
        hair_color: "brown",
        eye_color: "green",
        gender: "female",
      };

      mockFetchPeopleById.mockResolvedValue(customResident);

      const component = await ResidentCard({ residentId: "5" });
      render(component);

      expect(screen.getByText("Leia Organa")).toBeInTheDocument();
      expect(screen.getByText("brown")).toBeInTheDocument();
      expect(screen.getByText("green")).toBeInTheDocument();
      expect(screen.getByText("female")).toBeInTheDocument();
    });
  });
});
