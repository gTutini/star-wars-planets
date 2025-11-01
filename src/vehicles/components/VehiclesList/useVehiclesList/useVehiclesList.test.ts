import { describe, it, expect } from "vitest";
import { useVehiclesList } from "./useVehiclesList";

describe("useVehiclesList", () => {
  describe("extração de IDs", () => {
    it("deve extrair IDs de URLs válidas com e sem barra final", () => {
      const vehicleUrls = [
        "https://swapi.dev/api/vehicles/4/",
        "https://swapi.dev/api/vehicles/6",
        "https://swapi.dev/api/vehicles/14",
        "https://swapi.dev/api/vehicles/7/",
      ];

      const { vehicleIds } = useVehiclesList({ vehicleUrls });

      expect(vehicleIds).toEqual(["4", "6", "14", "7"]);
    });

    it("deve lidar com URLs de diferentes comprimentos de ID", () => {
      const vehicleUrls = [
        "https://swapi.dev/api/vehicles/4/",
        "https://swapi.dev/api/vehicles/14/",
        "https://swapi.dev/api/vehicles/144/",
      ];

      const { vehicleIds } = useVehiclesList({ vehicleUrls });

      expect(vehicleIds).toEqual(["4", "14", "144"]);
    });

    it("deve filtrar valores não numéricos de URLs malformadas", () => {
      const vehicleUrls = [
        "https://swapi.dev/api/vehicles/4/",
        "https://swapi.dev/api/vehicles/",
        "https://swapi.dev/api/vehicles/abc/",
        "https://swapi.dev/api/vehicles/7x/",
        "https://swapi.dev/api/vehicles/14/",
      ];

      const { vehicleIds } = useVehiclesList({ vehicleUrls });

      expect(vehicleIds).toEqual(["4", "14"]);
      expect(vehicleIds).not.toContain("vehicles");
      expect(vehicleIds).not.toContain("abc");
      expect(vehicleIds).not.toContain("7x");
    });

    it("deve rejeitar IDs com caracteres especiais e alfanuméricos", () => {
      const vehicleUrls = [
        "https://swapi.dev/api/vehicles/4-5/",
        "https://swapi.dev/api/vehicles/6_7/",
        "https://swapi.dev/api/vehicles/4a/",
        "https://swapi.dev/api/vehicles/b6/",
        "https://swapi.dev/api/vehicles/8/",
      ];

      const { vehicleIds } = useVehiclesList({ vehicleUrls });

      expect(vehicleIds).toEqual(["8"]);
      expect(vehicleIds).toHaveLength(1);
    });
  });

  describe("flag hasVehicles", () => {
    it("deve retornar true quando há veículos válidos", () => {
      const vehicleUrls = [
        "https://swapi.dev/api/vehicles/4/",
        "https://swapi.dev/api/vehicles/6/",
      ];

      const { hasVehicles } = useVehiclesList({ vehicleUrls });

      expect(hasVehicles).toBe(true);
    });

    it("deve retornar false quando não há veículos ou URLs são inválidas", () => {
      const emptyUrls: string[] = [];
      const invalidUrls = [
        "https://swapi.dev/api/vehicles/",
        "https://swapi.dev/api/vehicles/abc/",
        "",
      ];

      const resultEmpty = useVehiclesList({ vehicleUrls: emptyUrls });
      const resultInvalid = useVehiclesList({ vehicleUrls: invalidUrls });

      expect(resultEmpty.hasVehicles).toBe(false);
      expect(resultInvalid.hasVehicles).toBe(false);
    });
  });

  describe("cenários de borda", () => {
    it("deve retornar arrays vazios quando recebe array vazio", () => {
      const vehicleUrls: string[] = [];

      const result = useVehiclesList({ vehicleUrls });

      expect(result.vehicleIds).toEqual([]);
      expect(result.hasVehicles).toBe(false);
    });

    it("deve preservar a ordem dos IDs", () => {
      const vehicleUrls = [
        "https://swapi.dev/api/vehicles/8/",
        "https://swapi.dev/api/vehicles/4/",
        "https://swapi.dev/api/vehicles/16/",
        "https://swapi.dev/api/vehicles/14/",
      ];

      const { vehicleIds } = useVehiclesList({ vehicleUrls });

      expect(vehicleIds).toEqual(["8", "4", "16", "14"]);
    });

    it("deve lidar com URLs malformadas mantendo apenas IDs válidos", () => {
      const vehicleUrls = [
        "https://swapi.dev/api/vehicles/4/",
        "",
        "invalid-url",
        "https://swapi.dev/api/vehicles/test/",
        "https://swapi.dev/api/vehicles/7/",
        "https://swapi.dev/api/vehicles/",
      ];

      const { vehicleIds, hasVehicles } = useVehiclesList({ vehicleUrls });

      expect(vehicleIds).toEqual(["4", "7"]);
      expect(vehicleIds).toHaveLength(2);
      expect(hasVehicles).toBe(true);
    });
  });
});
