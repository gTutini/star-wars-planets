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

describe("NotFound", () => {
  describe("renderização e estrutura", () => {
    it("deve renderizar página 404 com todos os elementos acessíveis", () => {
      const { container } = render(<NotFound />);

      const heading = screen.getByRole("heading", {
        level: 1,
        name: "404 - Page Not Found",
      });
      expect(heading).toBeInTheDocument();

      const description = screen.getByText(
        "The page you're looking for doesn't exist in this galaxy."
      );
      expect(description).toBeInTheDocument();

      const link = screen.getByRole("link", { name: "Return to home" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/");

      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("lucide-search");
    });
  });
});
