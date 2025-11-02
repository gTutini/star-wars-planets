import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import RootLayout from "./layout";

vi.mock("next/font/google", () => ({
  Orbitron: () => ({
    variable: "--font-orbitron-mock",
  }),
}));

vi.mock("@/ui/icons", () => ({
  SvgOrderSymbol: ({ fill }: { fill: string }) => (
    <svg data-testid="order-symbol" data-fill={fill}>
      <title>Order Symbol</title>
    </svg>
  ),
}));

describe("RootLayout", () => {
  describe("renderização e estrutura", () => {
    it("deve renderizar layout com elementos principais e children", () => {
      const { container } = render(
        <RootLayout>
          <div data-testid="child-content">Test Content</div>
        </RootLayout>
      );

      const heading = screen.getByRole("heading", {
        name: "The Jedi Archives: Planets",
      });
      expect(heading).toBeInTheDocument();

      const orderSymbol = screen.getByTestId("order-symbol");
      expect(orderSymbol).toBeInTheDocument();
      expect(orderSymbol).toHaveAttribute("data-fill", "#ff949d");

      const childContent = screen.getByTestId("child-content");
      expect(childContent).toBeInTheDocument();
      expect(childContent).toHaveTextContent("Test Content");

      const main = container.querySelector("main");
      expect(main).toBeInTheDocument();
      expect(main).toContainElement(childContent);
    });
  });
});
