import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../styles/globals.scss";

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
      <body className={`${montserrat.variable}`}>{children}</body>
    </html>
  );
}
