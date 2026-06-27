import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import NavBar from "@/components/shared/Header/NavBar/NavBar";
import Footer from "@/components/shared/Footer/Footer";
import ClientProviders from "./ClientProviders"; // ✅

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Borsalle",
  description: "Cakes of the Borsalle",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ClientProviders>
          <NavBar />
          {children}
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
