import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Home from "./page";

vi.mock("@/planets/components", () => ({
  SearchInput: ({ defaultValue }: { defaultValue?: string }) => (
    <input
      data-testid="search-input"
      defaultValue={defaultValue}
      placeholder="Search planets"
    />
  ),
  PlanetList: ({ search, page }: { search?: string; page?: string }) => (
    <div data-testid="planet-list" data-search={search} data-page={page}>
      Planet List - Search: {search || "none"} - Page: {page || "1"}
    </div>
  ),
  PlanetListSkeleton: () => (
    <div data-testid="skeleton">Loading planets...</div>
  ),
}));

describe("Home", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("renderização e estrutura", () => {
    it("deve renderizar página com SearchInput e PlanetList em containers corretos", async () => {
      const component = await Home({
        searchParams: Promise.resolve({}),
      });

      render(component);

      const searchInput = screen.getByTestId("search-input");
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).not.toHaveValue();

      const flexContainer = searchInput.closest(".rt-Flex");
      expect(flexContainer).toBeInTheDocument();

      const planetList = screen.getByTestId("planet-list");
      expect(planetList).toBeInTheDocument();
      expect(planetList).toHaveTextContent("Search: none");
      expect(planetList).toHaveTextContent("Page: 1");
    });
  });

  describe("searchParams", () => {
    it("deve passar search e page para SearchInput e PlanetList", async () => {
      const component = await Home({
        searchParams: Promise.resolve({ search: "hoth", page: "3" }),
      });

      render(component);

      const searchInput = screen.getByTestId("search-input");
      expect(searchInput).toHaveValue("hoth");

      const planetList = screen.getByTestId("planet-list");
      expect(planetList).toHaveAttribute("data-search", "hoth");
      expect(planetList).toHaveAttribute("data-page", "3");
    });

    it("deve aguardar resolução de searchParams Promise antes de renderizar", async () => {
      const searchParamsPromise = new Promise<{ search: string; page: string }>(
        (resolve) => {
          setTimeout(() => {
            resolve({ search: "dagobah", page: "5" });
          }, 10);
        }
      );

      const component = await Home({
        searchParams: searchParamsPromise,
      });

      render(component);

      const searchInput = screen.getByTestId("search-input");
      expect(searchInput).toHaveValue("dagobah");

      const planetList = screen.getByTestId("planet-list");
      expect(planetList).toHaveAttribute("data-search", "dagobah");
      expect(planetList).toHaveAttribute("data-page", "5");
    });
  });

  describe("cenários de borda", () => {
    it("deve lidar com valores edge case de search e page", async () => {
      const component = await Home({
        searchParams: Promise.resolve({
          search: "a very long search term with special characters !@#$%^&*()",
          page: "999",
        }),
      });

      render(component);

      const searchInput = screen.getByTestId("search-input");
      expect(searchInput).toHaveValue(
        "a very long search term with special characters !@#$%^&*()"
      );

      const planetList = screen.getByTestId("planet-list");
      expect(planetList).toHaveAttribute("data-page", "999");
    });
  });
});
