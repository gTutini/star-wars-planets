# 🌌 Star Wars Planets

Uma aplicação Next.js moderna que explora planetas do universo Star Wars, desenvolvida com padrões de arquitetura limpa e boas práticas de desenvolvimento.

## 📋 Índice

- [Tecnologias](#-tecnologias)
- [Arquitetura do Projeto](#-arquitetura-do-projeto)
- [Padrões de Código](#-padrões-de-código)
- [Início Rápido](#-início-rápido)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Testes](#-testes)

## 🛠️ Tecnologias

### Core

- **[Next.js 16](https://nextjs.org/)** - React Framework com App Router
- **[React 19](https://react.dev/)** - UI Library com React Compiler
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Bun](https://bun.sh/)** - Runtime e package manager ultra-rápido

### UI/Styling

- **[Radix UI Themes](https://www.radix-ui.com/)** - Sistema de componentes acessíveis
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones
- **SCSS** - Preprocessador CSS com mixins e variáveis

### Desenvolvimento

- **[Vitest](https://vitest.dev/)** - Framework de testes rápido
- **[Testing Library](https://testing-library.com/)** - Utilitários para testes de componentes
- **[ESLint](https://eslint.org/)** - Linter com configuração Next.js
- **[Turbopack](https://turbo.build/pack)** - Bundler de alta performance

### Utilitários

- **[use-debounce](https://github.com/xnimorz/use-debounce)** - Hook para debounce
- **[react-error-boundary](https://github.com/bvaughn/react-error-boundary)** - Tratamento de erros

## 🏗️ Arquitetura do Projeto

### Princípios Fundamentais

#### 1. **Feature-Based Organization**

O projeto organiza o código por domínio/funcionalidade (planets, people, films, vehicles) em vez de por tipo de arquivo:

```
src/
├── planets/          # Domínio: Planetas
│   ├── components/   # Componentes específicos
│   ├── services/     # Lógica de API
│   └── contracts.ts  # Tipos TypeScript
├── people/           # Domínio: Personagens
├── films/            # Domínio: Filmes
└── ui/               # Componentes compartilhados
```

#### 2. **Server Components First**

Uso extensivo de React Server Components para:

- Busca de dados no servidor
- Redução do bundle JavaScript
- Melhor performance e SEO

```tsx
// src/app/page.tsx - Server Component
export default async function Home({ searchParams }: HomeProps) {
  const { search, page } = await searchParams;

  return (
    <Section size="1">
      <SearchInput defaultValue={search} />
      <Suspense fallback={<PlanetListSkeleton />}>
        <PlanetList search={search} page={page} />
      </Suspense>
    </Section>
  );
}
```

#### 3. **Custom Hooks para Lógica de Negócio**

Separação clara entre lógica e apresentação usando hooks customizados:

```tsx
// Lógica isolada em hook
export function usePlanetCard({ planet, films }: UsePlanetCardProps) {
  const planetId = planet.url.split("/").filter(Boolean).pop();
  const filmTitles = films
    .filter((film) => film.planets.includes(planet.url))
    .map((film) => film.title);

  return { filmTitles, planetData, planetId };
}

// Componente focado em apresentação
export function PlanetCard({ planet, films }: PlanetCardProps) {
  const { filmTitles, planetData, planetId } = usePlanetCard({ planet, films });
  return <Card>...</Card>;
}
```

#### 4. **Type Safety com TypeScript**

Contratos bem definidos para cada domínio:

```typescript
// src/planets/contracts.ts
export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  // ... mais campos
  url: string;
}
```

## 📐 Padrões de Código

### Serviços de API

Padrão consistente para chamadas à API:

```typescript
// Sempre retornar interface tipada
export interface PlanetsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
}

// Função async com tratamento de erro
export async function fetchPlanets(
  search?: string,
  page?: string
): Promise<PlanetsResponse> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/planets`);

  if (search) url.searchParams.set("search", search);
  if (page) url.searchParams.set("page", page);

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
```

### Componentes

**Convenções:**

- Props tipadas com interface dedicada
- Export nomeado para componente e props
- Uso de Radix UI para acessibilidade
- Ícones do Lucide com `AccessibleIcon`

```tsx
export interface PlanetCardProps {
  planet: Planet;
  films: Film[];
}

export function PlanetCard({ planet, films }: PlanetCardProps) {
  return (
    <Card role="listitem" asChild>
      <article aria-label={`${planet.name} planet information`}>
        <AccessibleIcon label={`${planet.name} planet icon`}>
          <EarthIcon size={32} />
        </AccessibleIcon>
        {/* ... */}
      </article>
    </Card>
  );
}
```

### Padrão de Loading com Suspense

```tsx
<Suspense key={`${search}-${page}`} fallback={<PlanetListSkeleton />}>
  <PlanetList search={search} page={page} />
</Suspense>
```

### Tratamento de Erros

Arquivos `error.tsx` em cada rota com Error Boundaries:

```tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Box>
      <Heading>Something went wrong!</Heading>
      <Button onClick={() => reset()}>Try again</Button>
    </Box>
  );
}
```

## 🚀 Início Rápido

### Pré-requisitos

- [Bun](https://bun.sh/) v1.0+

### Instalação

```bash
# Clone o repositório
git clone <repo-url>

# Instale as dependências
bun install

# Configure variáveis de ambiente
cp .env.example .env.local
# Adicione: NEXT_PUBLIC_API_URL=https://swapi.dev/api
```

### Desenvolvimento

```bash
# Servidor de desenvolvimento (Turbopack)
bun dev

# Abra http://localhost:3000
```

### Build e Produção

```bash
# Build otimizado
bun run build

# Servidor de produção
bun run start
```

### Testes

```bash
# Executar todos os testes
bun run test

# Modo watch
bun run test --watch

# Com interface UI
bun run test --ui

# Cobertura de código
bun run test --coverage
```

### Lint

```bash
# Verificar código
bun run lint
```

## 📁 Estrutura de Pastas

```
star-wars-planets/
├── src/
│   ├── app/                      # App Router do Next.js
│   │   ├── page.tsx              # Página inicial (Server Component)
│   │   ├── layout.tsx            # Layout raiz
│   │   ├── error.tsx             # Error boundary
│   │   └── planet/[id]/          # Rota dinâmica de planetas
│   │       ├── page.tsx
│   │       ├── error.tsx
│   │       └── not-found.tsx
│   │
│   ├── planets/                  # Domínio: Planetas
│   │   ├── components/
│   │   │   ├── PlanetCard/
│   │   │   │   ├── PlanetCard.tsx
│   │   │   │   ├── PlanetCard.test.tsx
│   │   │   │   ├── usePlanetCard/
│   │   │   │   │   └── usePlanetCard.ts
│   │   │   │   └── index.ts
│   │   │   ├── PlanetList/
│   │   │   ├── SearchInput/
│   │   │   └── index.ts          # Barrel export
│   │   ├── services/
│   │   │   ├── fetchPlanets.ts
│   │   │   ├── fetchPlanets.test.ts
│   │   │   └── index.ts
│   │   └── contracts.ts          # Tipos TypeScript
│   │
│   ├── people/                   # Domínio: Personagens
│   ├── films/                    # Domínio: Filmes
│   ├── vehicles/                 # Domínio: Veículos
│   │
│   ├── ui/                       # Componentes compartilhados
│   │   ├── components/
│   │   │   ├── DataList/
│   │   │   ├── Pagination/
│   │   │   └── index.ts
│   │   └── icons/
│   │
│   └── styles/                   # SCSS global
│       ├── _variables.scss       # Variáveis de design
│       ├── _mixins.scss          # Mixins utilitários
│       └── globals.scss
│
├── vitest.config.ts              # Configuração do Vitest
├── next.config.ts                # Configuração do Next.js
├── tsconfig.json                 # TypeScript config
└── eslint.config.mjs             # ESLint config
```

### Padrão de Organização de Features

Cada domínio segue a estrutura:

```
feature/
├── components/           # UI Components
│   ├── Component/
│   │   ├── Component.tsx
│   │   ├── Component.test.tsx
│   │   ├── useComponent/      # Custom hook (se necessário)
│   │   └── index.ts
│   └── index.ts         # Barrel export
├── services/            # Lógica de API/dados
│   ├── service.ts
│   ├── service.test.ts
│   └── index.ts
└── contracts.ts         # TypeScript interfaces
```

## 🧪 Testes

### Estratégia de Testes

O projeto utiliza **Vitest** com **Testing Library** para testes unitários e de componentes.

#### Padrão para Testes de Componentes

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// Mock de dependências do Next.js
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

describe("PlanetCard", () => {
  const mockPlanet: Planet = {
    name: "Tatooine",
    // ... dados mock
  };

  describe("renderização básica", () => {
    it("deve renderizar o nome do planeta", () => {
      render(<PlanetCard planet={mockPlanet} films={[]} />);

      const heading = screen.getByRole("heading", { name: "Tatooine" });
      expect(heading).toBeInTheDocument();
    });
  });

  describe("acessibilidade", () => {
    it("deve ter estrutura ARIA correta", () => {
      render(<PlanetCard planet={mockPlanet} films={[]} />);

      const article = screen.getByRole("listitem", {
        name: "Tatooine planet information",
      });
      expect(article).toBeInTheDocument();
    });
  });
});
```

#### Padrão para Testes de Serviços

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";

global.fetch = vi.fn();

describe("fetchPlanets", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "https://swapi.dev/api");
    vi.clearAllMocks();
  });

  it("deve fazer fetch com parâmetros corretos", async () => {
    const mockResponse = { count: 0, results: [] };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    await fetchPlanets("Tatooine", "2");

    expect(fetch).toHaveBeenCalledWith(
      "https://swapi.dev/api/planets?search=Tatooine&page=2"
    );
  });

  it("deve lançar erro em falha", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
    } as Response);

    await expect(fetchPlanets()).rejects.toThrow(
      "Failed to fetch planets: 404 Not Found"
    );
  });
});
```

## 🔧 Configuração

### TypeScript Config

- **Modo Strict** habilitado
- **Path aliases**: `@/*` aponta para `./src/*`
- **JSX**: `react-jsx` (sem necessidade de import React)

## 📚 Recursos Adicionais

- [Next.js Documentation](https://nextjs.org/docs)
- [React Server Components](https://react.dev/reference/rsc/server-components)
- [Vitest Documentation](https://vitest.dev/)
- [Radix UI Documentation](https://www.radix-ui.com/themes/docs)
- [SWAPI - Star Wars API](https://swapi.dev/)

## 📄 Licença

Este projeto está sob a licença MIT.

---

**Desenvolvido com o uso da força usando Next.js 16, React 19, TypeScript e Bun**
