import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import { Container, Flex, Heading, Theme } from "@radix-ui/themes";
import { SvgOrderSymbol } from "@/ui/icons";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

import "../styles/globals.scss";

export const metadata: Metadata = {
  title: "The Jedi Archieves: Planets",
  description:
    "Explore the Star Wars universe's planets with detailed information and resident lists.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${orbitron.variable}`}>
        <Theme
          radius="full"
          accentColor="ruby"
          appearance="dark"
          panelBackground="translucent"
        >
          <Container mb="9" px="4" asChild>
            <main>
              <Flex direction="column" align="center" asChild>
                <header>
                  <SvgOrderSymbol fill="#ff949d" />
                  <Heading align="center" size="8">
                    The Jedi Archives: Planets
                  </Heading>
                </header>
              </Flex>
              {children}
            </main>
          </Container>
        </Theme>
      </body>
    </html>
  );
}
