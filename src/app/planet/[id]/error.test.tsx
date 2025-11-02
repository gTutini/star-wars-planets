import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import ErrorPage from "./error";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

describe("PlanetErrorPage", () => {
  const mockReset = vi.fn();
  const mockConsoleError = vi
    .spyOn(console, "error")
    .mockImplementation(() => {});

  describe("renderização e funcionalidade", () => {
    it("deve renderizar página de erro do planeta com todos os elementos", () => {
      const mockError = new Error("Failed to fetch planet");

      render(<ErrorPage error={mockError} reset={mockReset} />);

      const heading = screen.getByRole("heading", {
        name: "Failed to load planet details",
      });
      expect(heading).toBeInTheDocument();

      expect(
        screen.getByText(
          "We couldn't load the information for this planet. This might be because the planet doesn't exist or there was a problem connecting to the server."
        )
      ).toBeInTheDocument();

      const goBackLink = screen.getByRole("link", { name: /Go Back/i });
      expect(goBackLink).toBeInTheDocument();
      expect(goBackLink).toHaveAttribute("href", "/");

      const tryAgainButton = screen.getByRole("button", { name: "Try again" });
      expect(tryAgainButton).toBeInTheDocument();

      const returnLink = screen.getByRole("link", {
        name: "Return to planets list",
      });
      expect(returnLink).toBeInTheDocument();
      expect(returnLink).toHaveAttribute("href", "/");
    });

    it("deve registrar erro no console ao montar componente", () => {
      const mockError = new Error("Failed to fetch planet");

      render(<ErrorPage error={mockError} reset={mockReset} />);

      expect(mockConsoleError).toHaveBeenCalledWith(
        "Planet page error:",
        mockError
      );
    });

    it("deve renderizar error digest quando disponível e chamar reset ao clicar", async () => {
      const user = userEvent.setup();
      const errorWithDigest = Object.assign(new Error("Test error"), {
        digest: "xyz789",
      });

      render(<ErrorPage error={errorWithDigest} reset={mockReset} />);

      expect(screen.getByText("Error ID:")).toBeInTheDocument();
      expect(screen.getByText("xyz789")).toBeInTheDocument();

      const tryAgainButton = screen.getByRole("button", { name: "Try again" });
      await user.click(tryAgainButton);

      expect(mockReset).toHaveBeenCalledTimes(1);
    });
  });
});
