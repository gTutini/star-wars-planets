import { describe, it, expect } from "vitest";
import { useResidentsList } from "./useResidentsList";

describe("useResidentsList", () => {
  describe("extração de IDs", () => {
    it("deve extrair IDs de URLs válidas com e sem barra final", () => {
      const residentUrls = [
        "https://swapi.dev/api/people/1/",
        "https://swapi.dev/api/people/2",
        "https://swapi.dev/api/people/5",
        "https://swapi.dev/api/people/10/",
      ];

      const { residentIds } = useResidentsList({ residentUrls });

      expect(residentIds).toEqual(["1", "2", "5", "10"]);
    });

    it("deve lidar com URLs de diferentes comprimentos de ID", () => {
      const residentUrls = [
        "https://swapi.dev/api/people/1/",
        "https://swapi.dev/api/people/10/",
        "https://swapi.dev/api/people/100/",
      ];

      const { residentIds } = useResidentsList({ residentUrls });

      expect(residentIds).toEqual(["1", "10", "100"]);
    });

    it("deve filtrar valores não numéricos de URLs malformadas", () => {
      const residentUrls = [
        "https://swapi.dev/api/people/1/",
        "https://swapi.dev/api/people/",
        "https://swapi.dev/api/people/luke/",
        "https://swapi.dev/api/people/5x/",
        "https://swapi.dev/api/people/10/",
      ];

      const { residentIds } = useResidentsList({ residentUrls });

      expect(residentIds).toEqual(["1", "10"]);
      expect(residentIds).not.toContain("people");
      expect(residentIds).not.toContain("luke");
      expect(residentIds).not.toContain("5x");
    });

    it("deve rejeitar IDs com caracteres especiais e alfanuméricos", () => {
      const residentUrls = [
        "https://swapi.dev/api/people/1-2/",
        "https://swapi.dev/api/people/3_4/",
        "https://swapi.dev/api/people/5a/",
        "https://swapi.dev/api/people/b6/",
        "https://swapi.dev/api/people/7/",
      ];

      const { residentIds } = useResidentsList({ residentUrls });

      expect(residentIds).toEqual(["7"]);
      expect(residentIds).toHaveLength(1);
    });
  });

  describe("flag hasResidents", () => {
    it("deve retornar true quando há residentes válidos", () => {
      const residentUrls = [
        "https://swapi.dev/api/people/1/",
        "https://swapi.dev/api/people/2/",
      ];

      const { hasResidents } = useResidentsList({ residentUrls });

      expect(hasResidents).toBe(true);
    });

    it("deve retornar false quando não há residentes ou URLs são inválidas", () => {
      const emptyUrls: string[] = [];
      const invalidUrls = [
        "https://swapi.dev/api/people/",
        "https://swapi.dev/api/people/luke/",
        "",
      ];

      const resultEmpty = useResidentsList({ residentUrls: emptyUrls });
      const resultInvalid = useResidentsList({ residentUrls: invalidUrls });

      expect(resultEmpty.hasResidents).toBe(false);
      expect(resultInvalid.hasResidents).toBe(false);
    });
  });

  describe("cenários de borda", () => {
    it("deve retornar arrays vazios quando recebe array vazio", () => {
      const residentUrls: string[] = [];

      const result = useResidentsList({ residentUrls });

      expect(result.residentIds).toEqual([]);
      expect(result.hasResidents).toBe(false);
    });

    it("deve preservar a ordem dos IDs", () => {
      const residentUrls = [
        "https://swapi.dev/api/people/8/",
        "https://swapi.dev/api/people/1/",
        "https://swapi.dev/api/people/16/",
        "https://swapi.dev/api/people/5/",
      ];

      const { residentIds } = useResidentsList({ residentUrls });

      expect(residentIds).toEqual(["8", "1", "16", "5"]);
    });

    it("deve lidar com URLs malformadas mantendo apenas IDs válidos", () => {
      const residentUrls = [
        "https://swapi.dev/api/people/1/",
        "",
        "invalid-url",
        "https://swapi.dev/api/people/test/",
        "https://swapi.dev/api/people/3/",
        "https://swapi.dev/api/people/",
      ];

      const { residentIds, hasResidents } = useResidentsList({ residentUrls });

      expect(residentIds).toEqual(["1", "3"]);
      expect(residentIds).toHaveLength(2);
      expect(hasResidents).toBe(true);
    });
  });
});
