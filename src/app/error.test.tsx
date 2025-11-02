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

describe("ErrorPage", () => {
  const mockReset = vi.fn();
  const mockConsoleError = vi
    .spyOn(console, "error")
    .mockImplementation(() => {});

  describe("renderização e funcionalidade", () => {
    it("deve renderizar página de erro com todos os elementos", () => {
      const mockError = new Error("Test error message");

      render(<ErrorPage error={mockError} reset={mockReset} />);

      const heading = screen.getByRole("heading", {
        name: "Something went wrong!",
      });
      expect(heading).toBeInTheDocument();

      expect(
        screen.getByText(
          "An unexpected error occurred while loading the page. Please try again."
        )
      ).toBeInTheDocument();

      const tryAgainButton = screen.getByRole("button", { name: "Try again" });
      expect(tryAgainButton).toBeInTheDocument();

      const homeLink = screen.getByRole("link", { name: "Go to home" });
      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute("href", "/");
    });

    it("deve registrar erro no console ao montar componente", () => {
      const mockError = new Error("Test error message");

      render(<ErrorPage error={mockError} reset={mockReset} />);

      expect(mockConsoleError).toHaveBeenCalledWith(
        "Application error:",
        mockError
      );
    });

    it("deve renderizar error digest quando disponível e chamar reset ao clicar", async () => {
      const user = userEvent.setup();
      const errorWithDigest = Object.assign(new Error("Test error"), {
        digest: "abc123",
      });

      render(<ErrorPage error={errorWithDigest} reset={mockReset} />);

      expect(screen.getByText("Error ID:")).toBeInTheDocument();
      expect(screen.getByText("abc123")).toBeInTheDocument();

      const tryAgainButton = screen.getByRole("button", { name: "Try again" });
      await user.click(tryAgainButton);

      expect(mockReset).toHaveBeenCalledTimes(1);
    });
  });
});
