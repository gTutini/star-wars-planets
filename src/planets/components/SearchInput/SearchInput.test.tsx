import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { SearchInput } from "./SearchInput";
import * as useSearchInputModule from "./useSearchInput";

describe("SearchInput", () => {
  const mockUseSearchInput = vi.spyOn(useSearchInputModule, "useSearchInput");

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("renderização", () => {
    it("deve renderizar o componente com placeholder", () => {
      mockUseSearchInput.mockReturnValue({
        searchValue: "",
        handleChange: vi.fn(),
      });

      render(<SearchInput />);

      const input = screen.getByPlaceholderText("Search planets...");
      expect(input).toBeInTheDocument();
    });

    it("deve renderizar com valor inicial quando defaultValue é fornecido", () => {
      mockUseSearchInput.mockReturnValue({
        searchValue: "Tatooine",
        handleChange: vi.fn(),
      });

      render(<SearchInput defaultValue="Tatooine" />);

      const input = screen.getByDisplayValue("Tatooine");
      expect(input).toBeInTheDocument();
    });
  });

  describe("integração com useSearchInput", () => {
    it("deve chamar useSearchInput com defaultValue correto", () => {
      mockUseSearchInput.mockReturnValue({
        searchValue: "Hoth",
        handleChange: vi.fn(),
      });

      render(<SearchInput defaultValue="Hoth" />);

      expect(mockUseSearchInput).toHaveBeenCalledWith({
        defaultValue: "Hoth",
      });
    });

    it("deve chamar useSearchInput sem defaultValue", () => {
      mockUseSearchInput.mockReturnValue({
        searchValue: "",
        handleChange: vi.fn(),
      });

      render(<SearchInput />);

      expect(mockUseSearchInput).toHaveBeenCalledWith({
        defaultValue: undefined,
      });
    });

    it("deve usar o searchValue retornado pelo hook", () => {
      mockUseSearchInput.mockReturnValue({
        searchValue: "Dagobah",
        handleChange: vi.fn(),
      });

      render(<SearchInput />);

      const input = screen.getByDisplayValue("Dagobah");
      expect(input).toBeInTheDocument();
    });
  });

  describe("interação do usuário", () => {
    it("deve chamar handleChange quando o usuário digita", async () => {
      const mockHandleChange = vi.fn();
      mockUseSearchInput.mockReturnValue({
        searchValue: "",
        handleChange: mockHandleChange,
      });

      const user = userEvent.setup();
      render(<SearchInput />);

      const input = screen.getByPlaceholderText("Search planets...");
      await user.type(input, "Endor");

      expect(mockHandleChange).toHaveBeenCalled();
    });

    it("deve atualizar o valor exibido quando searchValue muda", () => {
      mockUseSearchInput.mockReturnValue({
        searchValue: "",
        handleChange: vi.fn(),
      });

      const { rerender } = render(<SearchInput />);

      expect(
        screen.getByPlaceholderText("Search planets...")
      ).toBeInTheDocument();

      mockUseSearchInput.mockReturnValue({
        searchValue: "Coruscant",
        handleChange: vi.fn(),
      });

      rerender(<SearchInput />);

      const input = screen.getByDisplayValue("Coruscant");
      expect(input).toBeInTheDocument();
    });
  });

  describe("cenários de borda", () => {
    it("deve renderizar corretamente com valor vazio", () => {
      mockUseSearchInput.mockReturnValue({
        searchValue: "",
        handleChange: vi.fn(),
      });

      render(<SearchInput />);

      const input = screen.getByPlaceholderText("Search planets...");
      expect(input).toHaveValue("");
    });

    it("deve renderizar corretamente com valor longo", () => {
      const longValue = "a".repeat(100);
      mockUseSearchInput.mockReturnValue({
        searchValue: longValue,
        handleChange: vi.fn(),
      });

      render(<SearchInput />);

      const input = screen.getByDisplayValue(longValue);
      expect(input).toBeInTheDocument();
    });

    it("deve renderizar corretamente com caracteres especiais", () => {
      mockUseSearchInput.mockReturnValue({
        searchValue: "D'Qar",
        handleChange: vi.fn(),
      });

      render(<SearchInput />);

      const input = screen.getByDisplayValue("D'Qar");
      expect(input).toBeInTheDocument();
    });
  });
});
