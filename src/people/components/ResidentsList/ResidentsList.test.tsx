import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { ResidentsList } from "./ResidentsList";

vi.mock("./useResidentsList", () => ({
  useResidentsList: vi.fn(),
}));

vi.mock("@/people/components/ResidentCard", () => ({
  ResidentCard: ({ residentId }: { residentId: string }) => (
    <div data-testid={`resident-card-${residentId}`}>Resident {residentId}</div>
  ),
}));

import { useResidentsList } from "./useResidentsList";

describe("ResidentsList", () => {
  const mockUseResidentsList = useResidentsList as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("renderização com residentes", () => {
    it("deve renderizar lista de residentes com estrutura completa", () => {
      mockUseResidentsList.mockReturnValue({
        residentIds: ["1", "2", "5"],
        hasResidents: true,
      });

      render(<ResidentsList residentUrls={["url1", "url2", "url3"]} />);

      expect(screen.getByText("Residents")).toBeInTheDocument();

      expect(screen.getByTestId("resident-card-1")).toBeInTheDocument();
      expect(screen.getByTestId("resident-card-2")).toBeInTheDocument();
      expect(screen.getByTestId("resident-card-5")).toBeInTheDocument();
    });

    it("deve passar residentUrls para useResidentsList", () => {
      const residentUrls = [
        "https://swapi.dev/api/people/1/",
        "https://swapi.dev/api/people/2/",
      ];

      mockUseResidentsList.mockReturnValue({
        residentIds: ["1", "2"],
        hasResidents: true,
      });

      render(<ResidentsList residentUrls={residentUrls} />);

      expect(mockUseResidentsList).toHaveBeenCalledWith({ residentUrls });
    });
  });

  describe("estado vazio", () => {
    it("não deve renderizar nada quando hasResidents é false", () => {
      mockUseResidentsList.mockReturnValue({
        residentIds: [],
        hasResidents: false,
      });

      const { container } = render(<ResidentsList residentUrls={[]} />);

      expect(container.firstChild).toBeNull();
      expect(screen.queryByText("Residents")).not.toBeInTheDocument();
      expect(screen.queryByTestId(/resident-card-/)).not.toBeInTheDocument();
    });

    it("não deve renderizar nada quando array está vazio", () => {
      mockUseResidentsList.mockReturnValue({
        residentIds: [],
        hasResidents: false,
      });

      const { container } = render(<ResidentsList residentUrls={[]} />);

      expect(container.firstChild).toBeNull();
    });
  });

  describe("cenários de borda", () => {
    it("deve renderizar com um único residente", () => {
      mockUseResidentsList.mockReturnValue({
        residentIds: ["1"],
        hasResidents: true,
      });

      render(<ResidentsList residentUrls={["url1"]} />);

      expect(screen.getByText("Residents")).toBeInTheDocument();
      expect(screen.getByTestId("resident-card-1")).toBeInTheDocument();
      expect(screen.queryByTestId("resident-card-2")).not.toBeInTheDocument();
    });

    it("deve renderizar com muitos residentes", () => {
      const residentIds = Array.from({ length: 10 }, (_, i) => `${i + 1}`);
      mockUseResidentsList.mockReturnValue({
        residentIds,
        hasResidents: true,
      });

      const residentUrls = Array.from({ length: 10 }, (_, i) => `url${i + 1}`);

      render(<ResidentsList residentUrls={residentUrls} />);

      expect(screen.getByText("Residents")).toBeInTheDocument();

      residentIds.forEach((id) => {
        expect(screen.getByTestId(`resident-card-${id}`)).toBeInTheDocument();
      });
    });
  });

  describe("integração com hook", () => {
    it("deve renderizar baseado em residentIds retornados pelo hook", () => {
      mockUseResidentsList.mockReturnValue({
        residentIds: ["1", "5", "10"],
        hasResidents: true,
      });

      render(<ResidentsList residentUrls={["url1", "url2", "url3"]} />);

      expect(screen.getByTestId("resident-card-1")).toBeInTheDocument();
      expect(screen.getByTestId("resident-card-5")).toBeInTheDocument();
      expect(screen.getByTestId("resident-card-10")).toBeInTheDocument();
    });

    it("não deve renderizar nada quando hook retorna hasResidents false", () => {
      mockUseResidentsList.mockReturnValue({
        residentIds: [],
        hasResidents: false,
      });

      const { container } = render(
        <ResidentsList residentUrls={["invalid-url"]} />
      );

      expect(container.firstChild).toBeNull();
      expect(screen.queryByText("Residents")).not.toBeInTheDocument();
    });
  });
});
