import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { Pagination } from "./Pagination";
import * as usePaginationModule from "./usePagination";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("Pagination", () => {
  const mockUsePagination = vi.spyOn(usePaginationModule, "usePagination");

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("renderização", () => {
    it("deve renderizar o componente com os botões e página atual", () => {
      mockUsePagination.mockReturnValue({
        previousPageURL: "/planets?page=1",
        nextPageURL: "/planets?page=3",
      });

      render(<Pagination hasNext={true} hasPrevious={true} currentPage={2} />);

      expect(screen.getByText("Prev")).toBeInTheDocument();
      expect(screen.getByText("Next")).toBeInTheDocument();
      expect(screen.getByText("Page 2")).toBeInTheDocument();
    });

    it("deve exibir o número correto da página atual", () => {
      mockUsePagination.mockReturnValue({
        previousPageURL: "/planets?page=4",
        nextPageURL: "/planets?page=6",
      });

      render(<Pagination hasNext={true} hasPrevious={true} currentPage={5} />);

      expect(screen.getByText("Page 5")).toBeInTheDocument();
    });
  });

  describe("botão Previous", () => {
    it("deve renderizar como link habilitado quando hasPrevious é true", () => {
      mockUsePagination.mockReturnValue({
        previousPageURL: "/planets?page=1",
        nextPageURL: "/planets?page=3",
      });

      render(<Pagination hasNext={true} hasPrevious={true} currentPage={2} />);

      const prevLink = screen.getByRole("link", { name: "Go to page 1" });
      expect(prevLink).toBeInTheDocument();
      expect(prevLink).toHaveAttribute("href", "/planets?page=1");
    });

    it("deve renderizar como botão desabilitado quando hasPrevious é false", () => {
      mockUsePagination.mockReturnValue({
        previousPageURL: undefined,
        nextPageURL: "/planets?page=2",
      });

      render(<Pagination hasNext={true} hasPrevious={false} currentPage={1} />);

      const prevButton = screen.getByRole("button", { name: /prev/i });
      expect(prevButton).toBeDisabled();
      expect(
        screen.queryByRole("link", { name: /prev/i })
      ).not.toBeInTheDocument();
    });
  });

  describe("botão Next", () => {
    it("deve renderizar como link habilitado quando hasNext é true", () => {
      mockUsePagination.mockReturnValue({
        previousPageURL: "/planets?page=1",
        nextPageURL: "/planets?page=3",
      });

      render(<Pagination hasNext={true} hasPrevious={true} currentPage={2} />);

      const nextLink = screen.getByRole("link", { name: "Go to page 3" });
      expect(nextLink).toBeInTheDocument();
      expect(nextLink).toHaveAttribute("href", "/planets?page=3");
    });

    it("deve renderizar como botão desabilitado quando hasNext é false", () => {
      mockUsePagination.mockReturnValue({
        previousPageURL: "/planets?page=4",
        nextPageURL: undefined,
      });

      render(<Pagination hasNext={false} hasPrevious={true} currentPage={5} />);

      const nextButton = screen.getByRole("button", { name: /next/i });
      expect(nextButton).toBeDisabled();
      expect(
        screen.queryByRole("link", { name: /next/i })
      ).not.toBeInTheDocument();
    });
  });

  describe("integração com usePagination", () => {
    it("deve chamar usePagination com as props corretas", () => {
      mockUsePagination.mockReturnValue({
        previousPageURL: "/planets?page=2",
        nextPageURL: "/planets?page=4",
      });

      render(<Pagination hasNext={true} hasPrevious={true} currentPage={3} />);

      expect(mockUsePagination).toHaveBeenCalledWith({
        hasNext: true,
        hasPrevious: true,
        currentPage: 3,
      });
    });

    it("deve usar as URLs retornadas pelo usePagination", () => {
      const customPrevURL = "/custom?page=10";
      const customNextURL = "/custom?page=12";

      mockUsePagination.mockReturnValue({
        previousPageURL: customPrevURL,
        nextPageURL: customNextURL,
      });

      render(<Pagination hasNext={true} hasPrevious={true} currentPage={11} />);

      const prevLink = screen.getByRole("link", { name: "Go to page 10" });
      const nextLink = screen.getByRole("link", { name: "Go to page 12" });

      expect(prevLink).toHaveAttribute("href", customPrevURL);
      expect(nextLink).toHaveAttribute("href", customNextURL);
    });
  });

  describe("cenários de borda", () => {
    it("deve renderizar corretamente na primeira página", () => {
      mockUsePagination.mockReturnValue({
        previousPageURL: undefined,
        nextPageURL: "/planets?page=2",
      });

      render(<Pagination hasNext={true} hasPrevious={false} currentPage={1} />);

      const prevButton = screen.getByRole("button", { name: /prev/i });
      const nextLink = screen.getByRole("link", { name: "Go to page 2" });

      expect(prevButton).toBeDisabled();
      expect(nextLink).toHaveAttribute("href", "/planets?page=2");
      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });

    it("deve renderizar corretamente na última página", () => {
      mockUsePagination.mockReturnValue({
        previousPageURL: "/planets?page=9",
        nextPageURL: undefined,
      });

      render(
        <Pagination hasNext={false} hasPrevious={true} currentPage={10} />
      );

      const prevLink = screen.getByRole("link", { name: "Go to page 9" });
      const nextButton = screen.getByRole("button", { name: /next/i });

      expect(prevLink).toHaveAttribute("href", "/planets?page=9");
      expect(nextButton).toBeDisabled();
      expect(screen.getByText("Page 10")).toBeInTheDocument();
    });

    it("deve renderizar corretamente quando há apenas uma página", () => {
      mockUsePagination.mockReturnValue({
        previousPageURL: undefined,
        nextPageURL: undefined,
      });

      render(
        <Pagination hasNext={false} hasPrevious={false} currentPage={1} />
      );

      const prevButton = screen.getByRole("button", { name: /prev/i });
      const nextButton = screen.getByRole("button", { name: /next/i });

      expect(prevButton).toBeDisabled();
      expect(nextButton).toBeDisabled();
      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });

    it("deve renderizar corretamente em uma página intermediária", () => {
      mockUsePagination.mockReturnValue({
        previousPageURL: "/planets?page=4",
        nextPageURL: "/planets?page=6",
      });

      render(<Pagination hasNext={true} hasPrevious={true} currentPage={5} />);

      const prevLink = screen.getByRole("link", { name: "Go to page 4" });
      const nextLink = screen.getByRole("link", { name: "Go to page 6" });

      expect(prevLink).toHaveAttribute("href", "/planets?page=4");
      expect(nextLink).toHaveAttribute("href", "/planets?page=6");
      expect(screen.getByText("Page 5")).toBeInTheDocument();
    });
  });

  describe("acessibilidade", () => {
    it("deve ter os links acessíveis por role quando habilitados", () => {
      mockUsePagination.mockReturnValue({
        previousPageURL: "/planets?page=1",
        nextPageURL: "/planets?page=3",
      });

      render(<Pagination hasNext={true} hasPrevious={true} currentPage={2} />);

      expect(
        screen.getByRole("link", { name: "Go to page 1" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Go to page 3" })
      ).toBeInTheDocument();
    });

    it("deve ter os botões acessíveis por role quando desabilitados", () => {
      mockUsePagination.mockReturnValue({
        previousPageURL: undefined,
        nextPageURL: undefined,
      });

      render(
        <Pagination hasNext={false} hasPrevious={false} currentPage={1} />
      );

      expect(screen.getByRole("button", { name: /prev/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
    });

    it("deve ter role navigation na estrutura de paginação", () => {
      mockUsePagination.mockReturnValue({
        previousPageURL: "/planets?page=1",
        nextPageURL: "/planets?page=3",
      });

      render(<Pagination hasNext={true} hasPrevious={true} currentPage={2} />);

      const navigation = screen.getByRole("navigation", { name: "Pagination" });
      expect(navigation).toBeInTheDocument();
    });

    it("deve ter aria-labels descritivos nos links de navegação", () => {
      mockUsePagination.mockReturnValue({
        previousPageURL: "/planets?page=1",
        nextPageURL: "/planets?page=3",
      });

      render(<Pagination hasNext={true} hasPrevious={true} currentPage={2} />);

      const prevLink = screen.getByRole("link", { name: "Go to page 1" });
      const nextLink = screen.getByRole("link", { name: "Go to page 3" });

      expect(prevLink).toBeInTheDocument();
      expect(nextLink).toBeInTheDocument();
    });

    it("deve marcar a página atual com aria-current", () => {
      mockUsePagination.mockReturnValue({
        previousPageURL: "/planets?page=4",
        nextPageURL: "/planets?page=6",
      });

      render(<Pagination hasNext={true} hasPrevious={true} currentPage={5} />);

      const currentPage = screen.getByText("Page 5");
      expect(currentPage).toHaveAttribute("aria-current", "page");
    });

    it("deve ter aria-label descritivo na indicação de página atual", () => {
      mockUsePagination.mockReturnValue({
        previousPageURL: "/planets?page=2",
        nextPageURL: "/planets?page=4",
      });

      render(<Pagination hasNext={true} hasPrevious={true} currentPage={3} />);

      const currentPageElement = screen.getByLabelText("Current page, page 3");
      expect(currentPageElement).toBeInTheDocument();
      expect(currentPageElement).toHaveTextContent("Page 3");
    });

    it("deve ser navegável por teclado quando botões estão habilitados", () => {
      mockUsePagination.mockReturnValue({
        previousPageURL: "/planets?page=1",
        nextPageURL: "/planets?page=3",
      });

      render(<Pagination hasNext={true} hasPrevious={true} currentPage={2} />);

      const prevLink = screen.getByRole("link", { name: "Go to page 1" });
      const nextLink = screen.getByRole("link", { name: "Go to page 3" });

      expect(prevLink).not.toHaveAttribute("tabindex", "-1");
      expect(nextLink).not.toHaveAttribute("tabindex", "-1");
    });

    it("deve indicar estado desabilitado para leitores de tela", () => {
      mockUsePagination.mockReturnValue({
        previousPageURL: undefined,
        nextPageURL: undefined,
      });

      render(
        <Pagination hasNext={false} hasPrevious={false} currentPage={1} />
      );

      const prevButton = screen.getByRole("button", { name: /prev/i });
      const nextButton = screen.getByRole("button", { name: /next/i });

      expect(prevButton).toBeDisabled();
      expect(nextButton).toBeDisabled();
    });
  });
});
