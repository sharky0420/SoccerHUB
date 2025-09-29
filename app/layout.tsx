import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "SoccerHUB | Indoor Soccer & Padel Arenen",
    template: "%s | SoccerHUB",
  },
  description:
    "SoccerHUB ist dein digitales Clubhaus für Premium Soccer- und Padelhallen. Vergleiche Arenen, Filtere nach Preisen und Ausstattung und buche direkt beim Betreiber.",
  keywords: [
    "SoccerHUB",
    "Fußballhalle",
    "Soccer",
    "Padel",
    "Indoor Fußball",
    "Buchung",
  ],
  metadataBase: new URL("https://soccerhub.app"),
  openGraph: {
    title: "SoccerHUB",
    description:
      "SoccerHUB bündelt Soccer- und Padelhallen in einer modernen Übersicht – Preise, Ausstattung & Kontakt auf einen Blick.",
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
      <body>
        <ThemeProvider>
          <SiteHeader />
          <main className="relative pb-24 pt-24 sm:pb-28">{children}</main>
          <footer
            id="kontakt"
            className="relative mt-24 border-t border-[color:var(--border-subtle)] bg-[color:var(--background-elevated)]/80 py-12 backdrop-blur"
          >
            <div className="container-narrow grid gap-6 text-sm text-[color:var(--text-secondary)] sm:grid-cols-[minmax(0,1fr),auto] sm:items-center">
              <div className="space-y-2">
                <p className="text-base font-semibold text-[color:var(--text-primary)]">Bleib mit SoccerHUB verbunden</p>
                <p>
                  &copy; {new Date().getFullYear()} SoccerHUB. Crafted für ambitionierte Teams und Betreiber:innen von Henrik und Elias.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a className="chip px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em]" href="mailto:team@soccerhub.app">
                  team@soccerhub.app
                </a>
                <a className="chip px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em]" href="https://www.linkedin.com">
                  LinkedIn
                </a>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
