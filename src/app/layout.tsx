import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import { Container, Flex, Heading, Theme } from "@radix-ui/themes";
import { SvgOrderSymbol } from "@/icons";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

import "../styles/globals.scss";

export const metadata: Metadata = {
  title: "Planetas Star Wars",
  description: "Explore os planetas do universo Star Wars",
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
              <Flex direction="column" align="center">
                <SvgOrderSymbol fill="#ff949d" />
                <Heading align="center" size="8">
                  The Jedi Archives: Planets
                </Heading>
              </Flex>
              {children}
            </main>
          </Container>
        </Theme>
      </body>
    </html>
  );
}
