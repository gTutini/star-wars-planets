import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { PlanetDetailCard } from "./PlanetDetailCard";
import { Globe } from "lucide-react";

describe("PlanetDetailCard", () => {
  describe("renderização básica", () => {
    it("deve renderizar título e ícone com estrutura acessível", () => {
      render(<PlanetDetailCard icon={Globe} title="Clima" value="Temperado" />);

      const climaElements = screen.getAllByText("Clima");
      expect(climaElements.length).toBeGreaterThan(0);
      expect(screen.getByText("Temperado")).toBeInTheDocument();

      const article = screen.getByRole("article", {
        name: "Clima information",
      });
      expect(article).toBeInTheDocument();

      const iconLabel = screen.getByText("Globe");
      expect(iconLabel).toBeInTheDocument();
    });

    it("deve renderizar valor simples sem unidade", () => {
      render(
        <PlanetDetailCard icon={Globe} title="Terreno" value="Montanhas" />
      );

      expect(screen.getByText("Montanhas")).toBeInTheDocument();
    });

    it("deve renderizar valor com unidade e aria-label", () => {
      render(
        <PlanetDetailCard
          icon={Globe}
          title="População"
          value="1000000"
          unit="habitantes"
        />
      );

      expect(screen.getByText("1000000")).toBeInTheDocument();
      expect(screen.getByText("habitantes")).toBeInTheDocument();

      const valueWithUnit = screen.getByLabelText("1000000 habitantes");
      expect(valueWithUnit).toBeInTheDocument();
    });
  });

  describe("badges", () => {
    it("deve renderizar badges com estrutura de lista acessível", () => {
      render(
        <PlanetDetailCard
          icon={Globe}
          title="Climas"
          value=""
          badges={["Tropical", "Árido", "Temperado"]}
        />
      );

      expect(screen.getByText("Tropical")).toBeInTheDocument();
      expect(screen.getByText("Árido")).toBeInTheDocument();
      expect(screen.getByText("Temperado")).toBeInTheDocument();

      const badgesList = screen.getByRole("list", { name: "Climas badges" });
      expect(badgesList).toBeInTheDocument();

      const badges = screen.getAllByRole("listitem");
      expect(badges).toHaveLength(3);
    });

    it("deve priorizar badges sobre valor quando ambos fornecidos", () => {
      render(
        <PlanetDetailCard
          icon={Globe}
          title="Climas"
          value="Valor ignorado"
          badges={["Tropical", "Árido"]}
        />
      );

      expect(screen.getByText("Tropical")).toBeInTheDocument();
      expect(screen.getByText("Árido")).toBeInTheDocument();
      expect(screen.queryByText("Valor ignorado")).not.toBeInTheDocument();
    });
  });

  describe("valores de retorno", () => {
    it("deve renderizar um elemento como valor", () => {
      render(
        <PlanetDetailCard
          icon={Globe}
          title="Status"
          value={<span>Ativo</span>}
        />
      );

      expect(screen.getByText("Ativo")).toBeInTheDocument();
    });

    it("deve renderizar número como valor", () => {
      render(
        <PlanetDetailCard
          icon={Globe}
          title="População"
          value={1000000}
          unit="habitantes"
        />
      );

      expect(screen.getByText("1000000")).toBeInTheDocument();
    });

    it("deve renderizar string como valor", () => {
      render(<PlanetDetailCard icon={Globe} title="Nome" value="Tatooine" />);

      expect(screen.getByText("Tatooine")).toBeInTheDocument();
    });
  });

  describe("cenários de borda", () => {
    it("deve renderizar com valor vazio mantendo acessibilidade", () => {
      render(<PlanetDetailCard icon={Globe} title="Informação" value="" />);

      const informacaoElements = screen.getAllByText("Informação");
      expect(informacaoElements.length).toBeGreaterThan(0);

      const article = screen.getByRole("article", {
        name: "Informação information",
      });
      expect(article).toBeInTheDocument();
    });

    it("deve renderizar com múltiplos badges em lista acessível", () => {
      const badges = ["Badge 1", "Badge 2", "Badge 3", "Badge 4", "Badge 5"];

      render(
        <PlanetDetailCard
          icon={Globe}
          title="Categorias"
          value=""
          badges={badges}
        />
      );

      badges.forEach((badge) => {
        expect(screen.getByText(badge)).toBeInTheDocument();
      });

      const badgesList = screen.getByRole("list", {
        name: "Categorias badges",
      });
      expect(badgesList).toBeInTheDocument();

      const listItems = screen.getAllByRole("listitem");
      expect(listItems).toHaveLength(5);
    });

    it("deve renderizar badge único com estrutura de lista", () => {
      render(
        <PlanetDetailCard
          icon={Globe}
          title="Categoria"
          value=""
          badges={["Único"]}
        />
      );

      expect(screen.getByText("Único")).toBeInTheDocument();

      const badgesList = screen.getByRole("list");
      expect(badgesList).toBeInTheDocument();
    });
  });
});
