import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useSearchInput } from "./useSearchInput";

const mockPush = vi.fn();
let mockSearchParams = new URLSearchParams();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => mockSearchParams,
}));

vi.mock("use-debounce", () => ({
  useDebouncedCallback: (fn: (value: string) => void) => fn,
}));

describe("useSearchInput", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchParams = new URLSearchParams();
  });

  describe("inicialização", () => {
    it("deve inicializar com valor padrão vazio quando não fornecido", () => {
      const { result } = renderHook(() => useSearchInput({}));

      expect(result.current.searchValue).toBe("");
    });

    it("deve inicializar com valor padrão fornecido", () => {
      const { result } = renderHook(() =>
        useSearchInput({ defaultValue: "Tatooine" })
      );

      expect(result.current.searchValue).toBe("Tatooine");
    });
  });

  describe("navegação", () => {
    it("deve navegar com parâmetro search quando valor é fornecido", async () => {
      const { result } = renderHook(() => useSearchInput({}));

      const event = {
        target: { value: "Hoth" },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        result.current.handleChange(event);
      });

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith("/?search=Hoth");
      });
    });

    it("deve ignorar valores vazios ou com apenas espaços", async () => {
      const { result } = renderHook(() => useSearchInput({}));

      const emptyEvent = {
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        result.current.handleChange(emptyEvent);
      });

      await waitFor(() => {
        expect(result.current.searchValue).toBe("");
        expect(mockPush).not.toHaveBeenCalled();
      });
    });

    it("deve remover parâmetro page ao buscar", async () => {
      mockSearchParams.set("page", "3");

      const { result } = renderHook(() => useSearchInput({}));

      const event = {
        target: { value: "Dagobah" },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        result.current.handleChange(event);
      });

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith("/?search=Dagobah");
        expect(mockPush).not.toHaveBeenCalledWith(
          expect.stringContaining("page=3")
        );
      });
    });

    it("deve preservar outros parâmetros de busca existentes", async () => {
      mockSearchParams.set("other", "value");

      const { result } = renderHook(() => useSearchInput({}));

      const event = {
        target: { value: "Endor" },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        result.current.handleChange(event);
      });

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith("/?other=value&search=Endor");
      });
    });
  });

  describe("atualização de valor", () => {
    it("deve atualizar searchValue quando handleChange é chamado", async () => {
      const { result } = renderHook(() => useSearchInput({}));

      const event = {
        target: { value: "Coruscant" },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        result.current.handleChange(event);
      });

      await waitFor(() => {
        expect(result.current.searchValue).toBe("Coruscant");
      });
    });

    it("deve manter o valor anterior quando recebe valor vazio", async () => {
      const { result } = renderHook(() =>
        useSearchInput({ defaultValue: "Naboo" })
      );

      const event = {
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        result.current.handleChange(event);
      });

      await waitFor(() => {
        expect(result.current.searchValue).toBe("Naboo");
      });
    });

    it("deve manter o valor anterior quando recebe apenas espaços", async () => {
      const { result } = renderHook(() =>
        useSearchInput({ defaultValue: "Alderaan" })
      );

      const event = {
        target: { value: "   " },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        result.current.handleChange(event);
      });

      await waitFor(() => {
        expect(result.current.searchValue).toBe("Alderaan");
      });
    });
  });

  describe("casos especiais", () => {
    it("deve navegar corretamente quando searchValue contém caracteres especiais", async () => {
      const { result } = renderHook(() => useSearchInput({}));

      const event = {
        target: { value: "D'Qar" },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        result.current.handleChange(event);
      });

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith("/?search=D%27Qar");
      });
    });
  });
});
