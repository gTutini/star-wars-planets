import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePathname, useSearchParams } from "next/navigation";
import { usePagination } from "./usePagination";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}));

describe("usePagination", () => {
  const mockPathname = "/planets";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createPageURL", () => {
    it("deve criar URL com o número da página correto", () => {
      const mockSearchParams = new URLSearchParams();
      vi.mocked(usePathname).mockReturnValue(mockPathname);
      vi.mocked(useSearchParams).mockReturnValue(
        mockSearchParams as ReturnType<typeof useSearchParams>
      );

      const { result } = renderHook(() =>
        usePagination({
          hasNext: true,
          hasPrevious: false,
          currentPage: 1,
        })
      );

      expect(result.current.nextPageURL).toBe(`${mockPathname}?page=2`);
    });

    it("deve preservar outros parâmetros de busca ao criar URL", () => {
      const mockSearchParams = new URLSearchParams("search=tatooine");
      vi.mocked(usePathname).mockReturnValue(mockPathname);
      vi.mocked(useSearchParams).mockReturnValue(
        mockSearchParams as ReturnType<typeof useSearchParams>
      );

      const { result } = renderHook(() =>
        usePagination({
          hasNext: true,
          hasPrevious: false,
          currentPage: 1,
        })
      );

      expect(result.current.nextPageURL).toBe(
        `${mockPathname}?search=tatooine&page=2`
      );
    });

    it("deve sobrescrever o parâmetro page existente", () => {
      const mockSearchParams = new URLSearchParams("page=5&search=tatooine");
      vi.mocked(usePathname).mockReturnValue(mockPathname);
      vi.mocked(useSearchParams).mockReturnValue(
        mockSearchParams as ReturnType<typeof useSearchParams>
      );

      const { result } = renderHook(() =>
        usePagination({
          hasNext: true,
          hasPrevious: true,
          currentPage: 5,
        })
      );

      expect(result.current.nextPageURL).toBe(
        `${mockPathname}?page=6&search=tatooine`
      );
      expect(result.current.previousPageURL).toBe(
        `${mockPathname}?page=4&search=tatooine`
      );
    });
  });

  describe("previousPageURL", () => {
    it("deve retornar undefined quando hasPrevious é false", () => {
      const mockSearchParams = new URLSearchParams();
      vi.mocked(usePathname).mockReturnValue(mockPathname);
      vi.mocked(useSearchParams).mockReturnValue(
        mockSearchParams as ReturnType<typeof useSearchParams>
      );

      const { result } = renderHook(() =>
        usePagination({
          hasNext: true,
          hasPrevious: false,
          currentPage: 1,
        })
      );

      expect(result.current.previousPageURL).toBeUndefined();
    });

    it("deve retornar URL da página anterior quando hasPrevious é true", () => {
      const mockSearchParams = new URLSearchParams();
      vi.mocked(usePathname).mockReturnValue(mockPathname);
      vi.mocked(useSearchParams).mockReturnValue(
        mockSearchParams as ReturnType<typeof useSearchParams>
      );

      const { result } = renderHook(() =>
        usePagination({
          hasNext: true,
          hasPrevious: true,
          currentPage: 3,
        })
      );

      expect(result.current.previousPageURL).toBe(`${mockPathname}?page=2`);
    });

    it("deve calcular corretamente a página anterior para currentPage > 1", () => {
      const mockSearchParams = new URLSearchParams("search=test");
      vi.mocked(usePathname).mockReturnValue(mockPathname);
      vi.mocked(useSearchParams).mockReturnValue(
        mockSearchParams as ReturnType<typeof useSearchParams>
      );

      const { result } = renderHook(() =>
        usePagination({
          hasNext: false,
          hasPrevious: true,
          currentPage: 10,
        })
      );

      expect(result.current.previousPageURL).toBe(
        `${mockPathname}?search=test&page=9`
      );
    });
  });

  describe("nextPageURL", () => {
    it("deve retornar undefined quando hasNext é false", () => {
      const mockSearchParams = new URLSearchParams();
      vi.mocked(usePathname).mockReturnValue(mockPathname);
      vi.mocked(useSearchParams).mockReturnValue(
        mockSearchParams as ReturnType<typeof useSearchParams>
      );

      const { result } = renderHook(() =>
        usePagination({
          hasNext: false,
          hasPrevious: true,
          currentPage: 5,
        })
      );

      expect(result.current.nextPageURL).toBeUndefined();
    });

    it("deve retornar URL da próxima página quando hasNext é true", () => {
      const mockSearchParams = new URLSearchParams();
      vi.mocked(usePathname).mockReturnValue(mockPathname);
      vi.mocked(useSearchParams).mockReturnValue(
        mockSearchParams as ReturnType<typeof useSearchParams>
      );

      const { result } = renderHook(() =>
        usePagination({
          hasNext: true,
          hasPrevious: false,
          currentPage: 1,
        })
      );

      expect(result.current.nextPageURL).toBe(`${mockPathname}?page=2`);
    });

    it("deve calcular corretamente a próxima página", () => {
      const mockSearchParams = new URLSearchParams("filter=active");
      vi.mocked(usePathname).mockReturnValue(mockPathname);
      vi.mocked(useSearchParams).mockReturnValue(
        mockSearchParams as ReturnType<typeof useSearchParams>
      );

      const { result } = renderHook(() =>
        usePagination({
          hasNext: true,
          hasPrevious: true,
          currentPage: 7,
        })
      );

      expect(result.current.nextPageURL).toBe(
        `${mockPathname}?filter=active&page=8`
      );
    });
  });

  describe("valores retornados", () => {
    it("deve retornar todos os valores corretos", () => {
      const mockSearchParams = new URLSearchParams();
      vi.mocked(usePathname).mockReturnValue(mockPathname);
      vi.mocked(useSearchParams).mockReturnValue(
        mockSearchParams as ReturnType<typeof useSearchParams>
      );

      const props = {
        hasNext: true,
        hasPrevious: true,
        currentPage: 5,
      };

      const { result } = renderHook(() => usePagination(props));

      expect(result.current).toEqual({
        previousPageURL: `${mockPathname}?page=4`,
        nextPageURL: `${mockPathname}?page=6`,
      });
    });

    it("deve retornar valores corretos para primeira página", () => {
      const mockSearchParams = new URLSearchParams();
      vi.mocked(usePathname).mockReturnValue(mockPathname);
      vi.mocked(useSearchParams).mockReturnValue(
        mockSearchParams as ReturnType<typeof useSearchParams>
      );

      const { result } = renderHook(() =>
        usePagination({
          hasNext: true,
          hasPrevious: false,
          currentPage: 1,
        })
      );

      expect(result.current).toEqual({
        previousPageURL: undefined,
        nextPageURL: `${mockPathname}?page=2`,
      });
    });

    it("deve retornar valores corretos para última página", () => {
      const mockSearchParams = new URLSearchParams();
      vi.mocked(usePathname).mockReturnValue(mockPathname);
      vi.mocked(useSearchParams).mockReturnValue(
        mockSearchParams as ReturnType<typeof useSearchParams>
      );

      const { result } = renderHook(() =>
        usePagination({
          hasNext: false,
          hasPrevious: true,
          currentPage: 10,
        })
      );

      expect(result.current).toEqual({
        previousPageURL: `${mockPathname}?page=9`,
        nextPageURL: undefined,
      });
    });
  });

  describe("cenários de borda", () => {
    it("deve funcionar quando não há páginas anterior nem próxima", () => {
      const mockSearchParams = new URLSearchParams();
      vi.mocked(usePathname).mockReturnValue(mockPathname);
      vi.mocked(useSearchParams).mockReturnValue(
        mockSearchParams as ReturnType<typeof useSearchParams>
      );

      const { result } = renderHook(() =>
        usePagination({
          hasNext: false,
          hasPrevious: false,
          currentPage: 1,
        })
      );

      expect(result.current.previousPageURL).toBeUndefined();
      expect(result.current.nextPageURL).toBeUndefined();
    });

    it("deve lidar com pathnames complexos", () => {
      const complexPathname = "/planet/1/details";
      const mockSearchParams = new URLSearchParams();
      vi.mocked(usePathname).mockReturnValue(complexPathname);
      vi.mocked(useSearchParams).mockReturnValue(
        mockSearchParams as ReturnType<typeof useSearchParams>
      );

      const { result } = renderHook(() =>
        usePagination({
          hasNext: true,
          hasPrevious: false,
          currentPage: 1,
        })
      );

      expect(result.current.nextPageURL).toBe(`${complexPathname}?page=2`);
    });

    it("deve lidar com múltiplos parâmetros de busca", () => {
      const mockSearchParams = new URLSearchParams(
        "search=luke&filter=jedi&sort=asc"
      );
      vi.mocked(usePathname).mockReturnValue(mockPathname);
      vi.mocked(useSearchParams).mockReturnValue(
        mockSearchParams as ReturnType<typeof useSearchParams>
      );

      const { result } = renderHook(() =>
        usePagination({
          hasNext: true,
          hasPrevious: true,
          currentPage: 3,
        })
      );

      expect(result.current.nextPageURL).toContain("search=luke");
      expect(result.current.nextPageURL).toContain("filter=jedi");
      expect(result.current.nextPageURL).toContain("sort=asc");
      expect(result.current.nextPageURL).toContain("page=4");
      expect(result.current.previousPageURL).toContain("page=2");
    });
  });
});
