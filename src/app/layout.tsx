import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from '../components/Header';
import { ReactNode } from 'react';
import classNames from 'classnames';
import UserLocationContextProvider from '@/components/UserLocationContextProvider';

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
  weight: ['400', '700', '900'],
});

export const metadata: Metadata = {
  title: "CLIQ Weather App",
  description: "A weather app built with Next.js",
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
