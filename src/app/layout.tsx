import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import { ReactNode } from "react";
import classNames from "classnames";

const roboto = Roboto({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  description: "A weather app built with Next.js",
  title: "CLIQ Weather App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={classNames(roboto.variable)}>
      <Header />

      <main>
        {children}
      </main>
    </body>
    </html>
  );
}
