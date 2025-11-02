import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import NotFound from "./not-found";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

describe("PlanetNotFound", () => {
  describe("renderização e estrutura", () => {
    it("deve renderizar página 404 do planeta com todos os elementos acessíveis", () => {
      render(<NotFound />);

      const heading = screen.getByRole("heading", { name: "Planet Not Found" });
      expect(heading).toBeInTheDocument();

      expect(
        screen.getByText(
          "This planet doesn't exist in our database. It might have been destroyed by the Death Star."
        )
      ).toBeInTheDocument();

      const goBackLink = screen.getByRole("link", {
        name: /Return to home page|Go Back/i,
      });
      expect(goBackLink).toBeInTheDocument();
      expect(goBackLink).toHaveAttribute("href", "/");

      const exploreLink = screen.getByRole("link", {
        name: "Explore other planets",
      });
      expect(exploreLink).toBeInTheDocument();
      expect(exploreLink).toHaveAttribute("href", "/");
    });
  });
});
