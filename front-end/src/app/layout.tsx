import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { StoreProvider } from "@/lib/redux/store-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PrimeReactProvider value={{ pt: Tailwind }}>
      <StoreProvider>
        <html className="min-h-screen bg-gray-50" lang="en">
          <body className={`${inter.className}`}>{children}</body>
        </html>
      </StoreProvider>
    </PrimeReactProvider>
  );
}
