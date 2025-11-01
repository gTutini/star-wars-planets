import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { VehiclesList } from "./VehiclesList";

vi.mock("./useVehiclesList", () => ({
  useVehiclesList: vi.fn(),
}));

vi.mock("@/vehicles/components/VehicleCard", () => ({
  VehicleCard: ({ vehicleId }: { vehicleId: string }) => (
    <div data-testid={`vehicle-card-${vehicleId}`}>Vehicle {vehicleId}</div>
  ),
}));

vi.mock("@/vehicles/components/VehicleCard/VehicleCardError", () => ({
  VehicleCardError: ({ vehicleId }: { vehicleId: string }) => (
    <div data-testid={`vehicle-card-error-${vehicleId}`}>
      Error loading vehicle {vehicleId}
    </div>
  ),
}));

import { useVehiclesList } from "./useVehiclesList";

describe("VehiclesList", () => {
  const mockUseVehiclesList = useVehiclesList as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("renderização com veículos", () => {
    it("deve renderizar lista de veículos com estrutura completa e acessível", () => {
      mockUseVehiclesList.mockReturnValue({
        vehicleIds: ["4", "14", "30"],
        hasVehicles: true,
      });

      render(<VehiclesList vehicleUrls={["url1", "url2", "url3"]} />);

      const region = screen.getByRole("region", { name: "Vehicles list" });
      expect(region).toBeInTheDocument();

      const list = screen.getByRole("list", { name: "3 vehicles found" });
      expect(list).toBeInTheDocument();

      expect(screen.getByText("Vehicles:")).toBeInTheDocument();

      const icon = region.querySelector("svg");
      expect(icon).toHaveAttribute("aria-hidden", "true");

      expect(screen.getByTestId("vehicle-card-4")).toBeInTheDocument();
      expect(screen.getByTestId("vehicle-card-14")).toBeInTheDocument();
      expect(screen.getByTestId("vehicle-card-30")).toBeInTheDocument();

      const listItems = screen.getAllByRole("listitem");
      expect(listItems).toHaveLength(3);
    });

    it("deve usar aria-label no singular quando há apenas um veículo", () => {
      mockUseVehiclesList.mockReturnValue({
        vehicleIds: ["7"],
        hasVehicles: true,
      });

      render(<VehiclesList vehicleUrls={["url1"]} />);

      const list = screen.getByRole("list", { name: "1 vehicle found" });
      expect(list).toBeInTheDocument();

      expect(screen.getByText("Vehicles:")).toBeInTheDocument();
      expect(screen.getByTestId("vehicle-card-7")).toBeInTheDocument();
    });

    it("deve passar vehicleUrls para useVehiclesList", () => {
      const vehicleUrls = [
        "https://swapi.dev/api/vehicles/4/",
        "https://swapi.dev/api/vehicles/14/",
      ];

      mockUseVehiclesList.mockReturnValue({
        vehicleIds: ["4", "14"],
        hasVehicles: true,
      });

      render(<VehiclesList vehicleUrls={vehicleUrls} />);

      expect(mockUseVehiclesList).toHaveBeenCalledWith({ vehicleUrls });
    });
  });

  describe("estado vazio", () => {
    it("deve renderizar mensagem acessível 'No vehicles' com role status", () => {
      mockUseVehiclesList.mockReturnValue({
        vehicleIds: [],
        hasVehicles: false,
      });

      render(<VehiclesList vehicleUrls={[]} />);

      const status = screen.getByRole("status");
      expect(status).toBeInTheDocument();
      expect(status).toHaveAttribute("aria-live", "polite");
      expect(screen.getByText("No vehicles")).toBeInTheDocument();

      const icon = status.querySelector("svg");
      expect(icon).toHaveAttribute("aria-hidden", "true");

      expect(screen.queryByRole("region")).not.toBeInTheDocument();
      expect(screen.queryByRole("list")).not.toBeInTheDocument();
      expect(screen.queryByText("Vehicles:")).not.toBeInTheDocument();
      expect(screen.queryByTestId(/vehicle-card-/)).not.toBeInTheDocument();
    });
  });

  describe("cenários de borda", () => {
    it("deve renderizar com muitos veículos e manter acessibilidade", () => {
      const vehicleIds = Array.from({ length: 10 }, (_, i) => `${i + 1}`);
      mockUseVehiclesList.mockReturnValue({
        vehicleIds,
        hasVehicles: true,
      });

      const vehicleUrls = Array.from({ length: 10 }, (_, i) => `url${i + 1}`);

      render(<VehiclesList vehicleUrls={vehicleUrls} />);

      const list = screen.getByRole("list", { name: "10 vehicles found" });
      expect(list).toBeInTheDocument();

      const listItems = screen.getAllByRole("listitem");
      expect(listItems).toHaveLength(10);

      vehicleIds.forEach((id) => {
        expect(screen.getByTestId(`vehicle-card-${id}`)).toBeInTheDocument();
      });
    });
  });

  describe("integração com hook", () => {
    it("deve renderizar baseado em vehicleIds retornados pelo hook", () => {
      mockUseVehiclesList.mockReturnValue({
        vehicleIds: ["1", "2", "3"],
        hasVehicles: true,
      });

      render(<VehiclesList vehicleUrls={["url1", "url2", "url3"]} />);

      const list = screen.getByRole("list", { name: "3 vehicles found" });
      expect(list).toBeInTheDocument();

      expect(screen.getByTestId("vehicle-card-1")).toBeInTheDocument();
      expect(screen.getByTestId("vehicle-card-2")).toBeInTheDocument();
      expect(screen.getByTestId("vehicle-card-3")).toBeInTheDocument();
    });

    it("deve renderizar estado vazio acessível quando hook retorna hasVehicles false", () => {
      mockUseVehiclesList.mockReturnValue({
        vehicleIds: [],
        hasVehicles: false,
      });

      render(<VehiclesList vehicleUrls={["invalid-url"]} />);

      const status = screen.getByRole("status");
      expect(status).toHaveAttribute("aria-live", "polite");
      expect(screen.getByText("No vehicles")).toBeInTheDocument();
      expect(screen.queryByRole("region")).not.toBeInTheDocument();
    });
  });
});
