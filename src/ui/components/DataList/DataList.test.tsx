import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { DataList } from "./DataList";
import { Globe, Users } from "lucide-react";

describe("DataList", () => {
  describe("renderização", () => {
    it("deve renderizar todos os itens fornecidos", () => {
      const items = [
        { label: "Nome", value: "Tatooine" },
        { label: "População", value: "200000" },
        { label: "Clima", value: "Árido" },
      ];

      render(<DataList items={items} />);

      expect(screen.getByText("Nome")).toBeInTheDocument();
      expect(screen.getByText("Tatooine")).toBeInTheDocument();
      expect(screen.getByText("População")).toBeInTheDocument();
      expect(screen.getByText("200000")).toBeInTheDocument();
      expect(screen.getByText("Clima")).toBeInTheDocument();
      expect(screen.getByText("Árido")).toBeInTheDocument();
    });

    it("deve renderizar com elementos", () => {
      const items = [
        { label: "Nome", value: <strong>Tatooine</strong> },
        { label: "Status", value: <span>Ativo</span> },
      ];

      render(<DataList items={items} />);

      const strongElement = screen.getByText("Tatooine");
      expect(strongElement.tagName).toBe("STRONG");

      const spanElement = screen.getByText("Ativo");
      expect(spanElement.tagName).toBe("SPAN");
    });
  });

  describe("ícones", () => {
    it("deve renderizar ícones quando fornecidos", () => {
      const items = [
        { label: "Planeta", value: "Tatooine", icon: Globe },
        { label: "Habitantes", value: "200000", icon: Users },
      ];

      const { container } = render(<DataList items={items} />);

      const svgs = container.querySelectorAll("svg");
      expect(svgs.length).toBe(2);
      expect(screen.getByText("Globe")).toBeInTheDocument();
      expect(screen.getByText("Users")).toBeInTheDocument();
    });

    it("não deve renderizar ícones quando não fornecidos", () => {
      const items = [
        { label: "Nome", value: "Tatooine" },
        { label: "Clima", value: "Árido" },
      ];

      const { container } = render(<DataList items={items} />);

      const svgs = container.querySelectorAll("svg");
      expect(svgs.length).toBe(0);
    });

    it("deve renderizar alguns itens com ícone e outros sem", () => {
      const items = [
        { label: "Planeta", value: "Tatooine", icon: Globe },
        { label: "Clima", value: "Árido" },
        { label: "População", value: "200000", icon: Users },
      ];

      const { container } = render(<DataList items={items} />);

      const svgs = container.querySelectorAll("svg");
      expect(svgs.length).toBe(2);
    });
  });

  describe("estrutura de dados", () => {
    it("deve renderizar múltiplos itens com diferentes configurações", () => {
      const items = [
        { label: "Planeta", value: "Tatooine", icon: Globe, minWidth: "100px" },
        { label: "Clima", value: "Árido", minWidth: "80px" },
        { label: "População", value: "200000", icon: Users },
      ];

      render(<DataList items={items} />);

      expect(screen.getByText("Planeta")).toBeInTheDocument();
      expect(screen.getByText("Tatooine")).toBeInTheDocument();
      expect(screen.getByText("Clima")).toBeInTheDocument();
      expect(screen.getByText("Árido")).toBeInTheDocument();
      expect(screen.getByText("População")).toBeInTheDocument();
      expect(screen.getByText("200000")).toBeInTheDocument();
    });
  });

  describe("cenários de borda", () => {
    it("deve renderizar valores numéricos", () => {
      const items = [
        { label: "População", value: 200000 },
        { label: "Diâmetro", value: 10465 },
      ];

      render(<DataList items={items} />);

      expect(screen.getByText("200000")).toBeInTheDocument();
      expect(screen.getByText("10465")).toBeInTheDocument();
    });

    it("deve renderizar valores vazios", () => {
      const items = [
        { label: "Nome", value: "" },
        { label: "Descrição", value: "unknown" },
      ];

      render(<DataList items={items} />);

      expect(screen.getByText("Nome")).toBeInTheDocument();
      expect(screen.getByText("Descrição")).toBeInTheDocument();
      expect(screen.getByText("unknown")).toBeInTheDocument();
    });

    it("deve renderizar com labels duplicadas", () => {
      const items = [
        { label: "Teste", value: "Primeiro" },
        { label: "Valor", value: "Segundo" },
      ];

      render(<DataList items={items} />);

      expect(screen.getByText("Primeiro")).toBeInTheDocument();
      expect(screen.getByText("Segundo")).toBeInTheDocument();
    });

    it("deve renderizar valores complexos", () => {
      const items = [
        {
          label: "Detalhes",
          value: (
            <div>
              <span>Linha 1</span>
              <span>Linha 2</span>
            </div>
          ),
        },
      ];

      render(<DataList items={items} />);

      expect(screen.getByText("Linha 1")).toBeInTheDocument();
      expect(screen.getByText("Linha 2")).toBeInTheDocument();
    });
  });
});
