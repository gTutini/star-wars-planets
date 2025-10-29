# 🌌 Star Wars Planets

Um projeto Next.js moderno desenvolvido com **Bun** como gerenciador de pacotes e **SCSS** para estilização avançada.

## ✨ Características

- ⚡ **Next.js 16** com App Router e Turbopack
- 🎨 **SCSS/Sass** com arquitetura modular
- 🚀 **Bun** - Runtime e package manager ultra-rápido
- 📘 **TypeScript** - Tipagem estática completa
- ⚛️ **React 19** com React Compiler habilitado
- 🎯 **ESLint** - Qualidade de código garantida
- 📦 **CSS Modules** - Estilos escopados por componente

## 🚀 Início Rápido

### Pré-requisitos

- [Bun](https://bun.sh/) instalado (v1.0+)

### Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

### Build

```bash
# Build para produção
bun build

# Inicie o servidor de produção
bun start
```

### Exemplo de Uso

```tsx
// Component.tsx
import styles from "./Component.module.scss";

export default function Component() {
  return <div className={styles.container}>Hello</div>;
}
```

```scss
// Component.module.scss
@import "../styles/variables";
@import "../styles/mixins";

.container {
  padding: $spacing-md;

  @include mobile {
    padding: $spacing-sm;
  }

  @include dark-mode {
    background: $color-background-dark;
  }
}
```

### Variáveis Disponíveis

#### Breakpoints

- `$breakpoint-mobile`: 600px
- `$breakpoint-tablet`: 768px
- `$breakpoint-desktop`: 1024px

### Mixins Disponíveis

```scss
@include mobile {
} // max-width: 600px
@include tablet {
} // max-width: 768px
@include desktop {
} // min-width: 1024px
@include dark-mode {
} // prefers-color-scheme: dark
@include hover-enabled {
} // hover com suporte a touch
@include flex-center {
} // display: flex + center
@include flex-column {
} // flex-direction: column
@include flex-row {
} // flex-direction: row
```

## 📚 Documentação Adicional

- [Next.js Documentation](https://nextjs.org/docs)
- [Sass Documentation](https://sass-lang.com/documentation)
- [Bun Documentation](https://bun.sh/docs)

## 🛠️ Tecnologias

- **[Next.js 16](https://nextjs.org/)** - React Framework
- **[React 19](https://react.dev/)** - UI Library
- **[TypeScript](https://www.typescriptlang.org/)** - Type Safety
- **[Sass](https://sass-lang.com/)** - CSS Preprocessor
- **[Bun](https://bun.sh/)** - JavaScript Runtime
- **[ESLint](https://eslint.org/)** - Code Quality
- **[Turbopack](https://turbo.build/pack)** - Fast Bundler

## ⚙️ Configurações

### next.config.ts

O projeto está configurado com:

- ✅ React Compiler habilitado
- ✅ Turbopack otimizado
- ✅ SCSS com auto-importação de variáveis e mixins
- ✅ Include paths configurados

### Comandos Disponíveis

```bash
bun dev          # Desenvolvimento (Turbopack)
bun build        # Build de produção
bun start        # Servidor de produção
bun lint         # Executar ESLint
```

## 📄 Licença

Este projeto está sob a licença MIT.

---

Desenvolvido com ❤️ usando Next.js, Bun e SCSS
