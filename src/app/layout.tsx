import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../styles/globals.scss";
import { Container, Theme } from "@radix-ui/themes";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

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
      <body className={`${montserrat.variable}`}>
        <Theme
          radius="full"
          accentColor="ruby"
          appearance="dark"
          panelBackground="translucent"
        >
          <Container mb="9" px="4" asChild>
            <main>{children}</main>
          </Container>
        </Theme>
      </body>
    </html>
  );
}
