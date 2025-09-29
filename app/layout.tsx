import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { SiteHeader } from "@/components/site-header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Turftime Venues | Sporthallen für Soccer & Padel finden",
    template: "%s | Turftime Venues",
  },
  description:
    "Finde und vergleiche Sporthallen für Soccer und Padel im Rhein-Neckar-Kreis. Öffnungszeiten, Preise und Ausstattung auf einen Blick.",
  keywords: [
    "Sporthalle",
    "Soccer",
    "Padel",
    "Mannheim",
    "Heidelberg",
    "Buchen",
  ],
  metadataBase: new URL("https://turftime-manager.local"),
  openGraph: {
    title: "Turftime Venues",
    description:
      "Vergleiche Soccer- und Padelhallen in Mannheim, Heidelberg und Umgebung und buche direkt beim Anbieter.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="de" className={clsx(inter.variable)}>
      <body className="min-h-screen bg-slate-50">
        <SiteHeader />
        <main className="pb-16 pt-10">{children}</main>
        <footer id="kontakt" className="border-t border-slate-200 bg-white py-10">
          <div className="container-narrow flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {new Date().getFullYear()} Turftime Venues. Alle Rechte vorbehalten.</p>
            <p>
              Bereit für den MVP-Ausbau? <a className="font-medium text-primary" href="mailto:info@turftime.app">info@turftime.app</a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
