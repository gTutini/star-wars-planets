import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { VehicleCard } from "./VehicleCard";
import type { Vehicle } from "@/vehicles/contracts";
import * as fetchVehicleByIdModule from "@/vehicles/services/fetchVehicleById";

describe("VehicleCard", () => {
  const mockFetchVehicleById = vi.spyOn(
    fetchVehicleByIdModule,
    "fetchVehicleById"
  );

  const mockVehicle: Vehicle = {
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
    films: ["https://swapi.dev/api/films/1/"],
    created: "2014-12-10T15:36:25.724000Z",
    edited: "2014-12-20T21:30:21.661000Z",
    url: "https://swapi.dev/api/vehicles/4/",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("renderização básica", () => {
    it("deve renderizar nome e modelo do veículo", async () => {
      mockFetchVehicleById.mockResolvedValue(mockVehicle);

      const component = await VehicleCard({ vehicleId: "4" });
      render(component);

      expect(screen.getByText("Sand Crawler")).toBeInTheDocument();
      expect(screen.getByText("Digger Crawler")).toBeInTheDocument();
    });

    it("deve chamar fetchVehicleById com o ID correto", async () => {
      mockFetchVehicleById.mockResolvedValue(mockVehicle);

      await VehicleCard({ vehicleId: "4" });

      expect(mockFetchVehicleById).toHaveBeenCalledWith("4");
      expect(mockFetchVehicleById).toHaveBeenCalledTimes(1);
    });
  });

  describe("cenários de borda", () => {
    it("deve renderizar com nome longo do veículo", async () => {
      const vehicle: Vehicle = {
        ...mockVehicle,
        name: "A Very Long Vehicle Name That Should Still Display Correctly",
        model: "An Extremely Long Model Description With Many Details",
      };

      mockFetchVehicleById.mockResolvedValue(vehicle);

      const component = await VehicleCard({ vehicleId: "999" });
      render(component);

      expect(
        screen.getByText(
          "A Very Long Vehicle Name That Should Still Display Correctly"
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "An Extremely Long Model Description With Many Details"
        )
      ).toBeInTheDocument();
    });

    it("deve renderizar com IDs de veículos altos", async () => {
      mockFetchVehicleById.mockResolvedValue(mockVehicle);

      await VehicleCard({ vehicleId: "9999" });

      expect(mockFetchVehicleById).toHaveBeenCalledWith("9999");
    });

    it("deve renderizar com modelo vazio", async () => {
      const vehicle: Vehicle = {
        ...mockVehicle,
        model: "",
      };

      mockFetchVehicleById.mockResolvedValue(vehicle);

      const component = await VehicleCard({ vehicleId: "4" });
      render(component);

      expect(screen.getByText("Sand Crawler")).toBeInTheDocument();
      expect(screen.queryByText("Digger Crawler")).not.toBeInTheDocument();
    });
  });

  describe("integração com serviço", () => {
    it("deve renderizar dados retornados pelo fetchVehicleById", async () => {
      const customVehicle: Vehicle = {
        ...mockVehicle,
        name: "Speeder Bike",
        model: "74-Z speeder bike",
      };

      mockFetchVehicleById.mockResolvedValue(customVehicle);

      const component = await VehicleCard({ vehicleId: "30" });
      render(component);

      expect(screen.getByText("Speeder Bike")).toBeInTheDocument();
      expect(screen.getByText("74-Z speeder bike")).toBeInTheDocument();
    });
  });
});
